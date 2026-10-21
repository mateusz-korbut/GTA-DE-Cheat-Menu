import { MissionTarget } from '../models/index';

// CRadar::ms_RadarTrace of a DE build: the field layout differs per game, the leading color/type/handle fields don't
export interface RadarLayout {
    traceRva: number;
    traceCount: number;
    traceSize: number;
    positionOffset: number;
    inUseOffset: number;
    displayOffset: number;
    spriteOffset: number;
    // sprite of the waypoint the player sets on the map
    waypointSprite: number;
}

export enum BlipType {
    Car = 1,
    Char = 2,
    Object = 3,
    Coord = 4,
    ContactPoint = 5,
}

interface RadarBlip {
    color: number;
    type: number;
    handle: number;
    position: Vector3;
    display: number;
    sprite: number;
}

const MAX_COORDINATE = 5000;
const COLOR_NAMES = ['Red', 'Green', 'Light blue', 'Gray', 'Yellow', 'Magenta', 'Cyan'];
const DISPLAY_NEITHER = 0;
// land next to an entity rather than inside it
const ENTITY_OFFSET = { x: 3, y: 0, z: 1 };

const getRadarBlips = (layout: RadarLayout): RadarBlip[] => {
    const traces = Memory.GetImageBase() + layout.traceRva;
    const blips: RadarBlip[] = [];

    for (let i = 0; i < layout.traceCount; i++) {
        const trace = traces + i * layout.traceSize;

        if (Memory.ReadU8(trace + layout.inUseOffset, false) !== 1) {
            continue;
        }
        const position = {
            x: Memory.ReadFloat(trace + layout.positionOffset, false),
            y: Memory.ReadFloat(trace + layout.positionOffset + 4, false),
            z: Memory.ReadFloat(trace + layout.positionOffset + 8, false),
        };

        if (![position.x, position.y, position.z].every((value) => Math.abs(value) < MAX_COORDINATE)) {
            continue;
        }
        blips.push({
            color: Memory.ReadU32(trace + 0x00, false),
            type: Memory.ReadU32(trace + 0x04, false),
            handle: Memory.ReadU32(trace + 0x08, false),
            position,
            display: Memory.ReadU16(trace + layout.displayOffset, false),
            sprite: Memory.ReadU16(trace + layout.spriteOffset, false),
        });
    }

    return blips;
}

export const getWaypoint = (layout: RadarLayout): Vector3 | undefined =>
    getRadarBlips(layout).find(({ type, sprite }) => type === BlipType.Coord && sprite === layout.waypointSprite)?.position;

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
