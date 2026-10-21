/// <reference path='../../../../.config/vc.d.ts' />
import { BlipType, getRadarBlips } from './radar';

const SPRITE_WAYPOINT = 0x28;

export const getVcWaypoint = (): Vector3 | undefined =>
    getRadarBlips().find(({ type, sprite }) => type === BlipType.Coord && sprite === SPRITE_WAYPOINT)?.position;
