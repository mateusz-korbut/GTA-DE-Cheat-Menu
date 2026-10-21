/// <reference path='../../../../.config/vc.d.ts' />
import { MissionTarget } from '../../../models/index';
import { BlipType, getRadarBlips, RadarBlip } from './radar';

const COLOR_NAMES = ['Red', 'Green', 'Light blue', 'Gray', 'Yellow', 'Magenta', 'Cyan'];
const DISPLAY_NEITHER = 0;
// land next to an entity rather than inside it
const ENTITY_OFFSET = { x: 3, y: 0, z: 1 };

const getEntityPosition = ({ type, handle }: RadarBlip): Vector3 | undefined => {
    const { x, y, z } = ENTITY_OFFSET;

    switch (type) {
        case BlipType.Car:
            return Car.IsDead(handle) ? undefined : new Car(handle).getOffsetInWorldCoords(x, y, z);
        case BlipType.Char:
            return !Char.DoesExist(handle) || Char.IsDead(handle) ? undefined : new Char(handle).getOffsetInWorldCoords(x, y, z);
        case BlipType.Object:
            return ScriptObject.DoesExist(handle) ? new ScriptObject(handle).getOffsetInWorldCoords(x, y, z) : undefined;
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
// contact points are skipped: the only sprite-less one is a permanent marker, not a mission target
export const getVcMissionTargets = (): MissionTarget[] => getRadarBlips()
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
