import { MissionTarget } from '../models/index';

export interface RadarTrace {
    inUse: boolean;
    color: number;
    type: number;
    handle: number;
    position: Vector3;
    display: number;
    sprite: number;
}

// CRadar::ms_RadarTrace of a DE build; each game reads its own trace layout
export interface RadarLayout {
    traceRva: number;
    traceCount: number;
    traceSize: number;
    readTrace: (trace: number) => RadarTrace;
    // sprite of the waypoint the player sets on the map
    waypointSprite: number;
    // SA stores a placeholder height for the waypoint: then the player is put on the ground instead
    isWaypointHeightKnown: boolean;
}

// GTA III / Vice City: color, type and handle first, then plain fields at per-game offsets
export const readPlainTrace = (offsets: { position: number, inUse: number, display: number, sprite: number }) => (trace: number): RadarTrace => ({
    inUse: Memory.ReadU8(trace + offsets.inUse, false) === 1,
    color: Memory.ReadU32(trace + 0x00, false),
    type: Memory.ReadU32(trace + 0x04, false),
    handle: Memory.ReadU32(trace + 0x08, false),
    position: {
        x: Memory.ReadFloat(trace + offsets.position, false),
        y: Memory.ReadFloat(trace + offsets.position + 4, false),
        z: Memory.ReadFloat(trace + offsets.position + 8, false),
    },
    display: Memory.ReadU16(trace + offsets.display, false),
    sprite: Memory.ReadU16(trace + offsets.sprite, false),
});

export enum BlipType {
    Car = 1,
    Char = 2,
    Object = 3,
    Coord = 4,
    ContactPoint = 5,
}

type RadarBlip = Omit<RadarTrace, 'inUse'>;

const MAX_COORDINATE = 5000;
const COLOR_NAMES = ['Red', 'Green', 'Light blue', 'Gray', 'Yellow', 'Magenta', 'Cyan'];
const DISPLAY_NEITHER = 0;
// land next to an entity rather than inside it
const ENTITY_OFFSET = { x: 3, y: 0, z: 1 };

const getRadarBlips = (layout: RadarLayout): RadarBlip[] => {
    const traces = Memory.GetImageBase() + layout.traceRva;
    const blips: RadarBlip[] = [];

    for (let i = 0; i < layout.traceCount; i++) {
        const { inUse, ...blip } = layout.readTrace(traces + i * layout.traceSize);
        const { x, y, z } = blip.position;

        if (inUse && [x, y, z].every((value) => Math.abs(value) < MAX_COORDINATE)) {
            blips.push(blip);
        }
    }

    return blips;
}

export const getWaypoint = (layout: RadarLayout): Vector3 | undefined => {
    const waypoint = getRadarBlips(layout).find(({ type, sprite }) => type === BlipType.Coord && sprite === layout.waypointSprite)?.position;

    // z = 0 makes the teleport land on the ground once collision is loaded
    return waypoint && (layout.isWaypointHeightKnown ? waypoint : { ...waypoint, z: 0 });
}

// not every game has getOffsetInWorldCoords / DOES_CHAR_EXIST (GTA III DE doesn't)
const besideEntity = (entity: any): Vector3 => {
    const { x, y, z } = ENTITY_OFFSET;

    if (typeof entity.getOffsetInWorldCoords === 'function') {
        return entity.getOffsetInWorldCoords(x, y, z);
    }
    const position = entity.getCoordinates();

    return { x: position.x + x, y: position.y + y, z: position.z + z };
}

const getEntityPosition = ({ type, handle }: RadarBlip): Vector3 | undefined => {
    switch (type) {
        case BlipType.Car:
            return Car.IsDead(handle) ? undefined : besideEntity(new Car(handle));
        case BlipType.Char: {
            const charClass = Char as unknown as { DoesExist?: (handle: number) => boolean };
            const exists = typeof charClass.DoesExist !== 'function' || charClass.DoesExist(handle);

            return exists && !Char.IsDead(handle) ? besideEntity(new Char(handle)) : undefined;
        }
        case BlipType.Object:
            return ScriptObject.DoesExist(handle) ? besideEntity(new ScriptObject(handle)) : undefined;
    }
}

const getTypeName = (type: number) => {
    switch (type) {
        case BlipType.Car: return 'Vehicle';
        case BlipType.Char: return 'Person';
        case BlipType.Object: return 'Object';
        default: return 'Destination';
    }
}

// mission blips are the plain (sprite-less) markers scripts add for destinations and targets;
// contact points are skipped: the only sprite-less one in VC is a permanent marker, not a mission target
export const getMissionTargets = (layout: RadarLayout): MissionTarget[] => getRadarBlips(layout)
    .filter(({ sprite, display, type }) => sprite === 0 && display !== DISPLAY_NEITHER && type >= BlipType.Car && type <= BlipType.Coord)
    .map((blip) => {
        const isDestination = blip.type === BlipType.Coord;
        const position = isDestination ? blip.position : getEntityPosition(blip);

        return position && {
            ...position,
            isDestination,
            name: `${getTypeName(blip.type)} (${COLOR_NAMES[blip.color] ?? 'Other'})`,
        };
    })
    .filter((target): target is MissionTarget => !!target);
