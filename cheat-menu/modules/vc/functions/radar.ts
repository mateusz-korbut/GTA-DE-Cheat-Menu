/// <reference path='../../../../.config/vc.d.ts' />
import { isMemoryFeatureSupported } from './script-space';

// Vice City DE 1.0.113.21181 (Steam): CRadar::ms_RadarTrace[75], found by diffing memory while moving the map waypoint
const RADAR_TRACE_RVA = 0x5244C80;
const RADAR_TRACE_SIZE = 0x38;
const RADAR_TRACE_COUNT = 75;
const MAX_COORDINATE = 3000;

export enum BlipType {
    Car = 1,
    Char = 2,
    Object = 3,
    Coord = 4,
    ContactPoint = 5,
}

export interface RadarBlip {
    color: number;
    type: number;
    handle: number;
    position: Vector3;
    display: number;
    sprite: number;
}

export const getRadarBlips = (): RadarBlip[] => {
    if (!isMemoryFeatureSupported()) {
        return [];
    }
    const traces = Memory.GetImageBase() + RADAR_TRACE_RVA;
    const blips: RadarBlip[] = [];

    for (let i = 0; i < RADAR_TRACE_COUNT; i++) {
        const trace = traces + i * RADAR_TRACE_SIZE;

        if (Memory.ReadU8(trace + 0x27, false) !== 1) {
            continue;
        }
        const position = {
            x: Memory.ReadFloat(trace + 0x18, false),
            y: Memory.ReadFloat(trace + 0x1C, false),
            z: Memory.ReadFloat(trace + 0x20, false),
        };

        if (![position.x, position.y, position.z].every((value) => Math.abs(value) < MAX_COORDINATE)) {
            continue;
        }
        blips.push({
            color: Memory.ReadU32(trace + 0x00, false),
            type: Memory.ReadU32(trace + 0x04, false),
            handle: Memory.ReadU32(trace + 0x08, false),
            position,
            display: Memory.ReadU16(trace + 0x32, false),
            sprite: Memory.ReadU16(trace + 0x34, false),
        });
    }

    return blips;
}
