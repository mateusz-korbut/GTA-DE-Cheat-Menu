/// <reference path='../../../../.config/sa.d.ts' />
import { createBuildCheck, getMissionTargets, getWaypoint, RadarLayout, RadarTrace } from '../../../functions/index';
import { MissionTarget } from '../../../models/index';

// San Andreas DE 1.0.113.21181 (Steam), found by diffing memory while moving the map waypoint
const SA_BUILD = {
    version: '1.0.113',
    build: '21181',
    scriptSpaceRva: 0x51BEAE0,
    mainCodeOffset: 0xF1A8,
    mainSignature: [0xA4, 0x03, 0x09, 0x4D, 0x41, 0x49, 0x4E, 0x00],
};

// tRadarTrace keeps the classic SA bitfields: +0x29 bit 1 = in use, +0x2A bits 0-1 = display, bits 2-5 = blip type
const readSaTrace = (trace: number): RadarTrace => {
    const flags = Memory.ReadU8(trace + 0x29, false);
    const packed = Memory.ReadU8(trace + 0x2A, false);

    return {
        inUse: (flags & 0x02) !== 0,
        color: Memory.ReadU32(trace + 0x00, false),
        handle: Memory.ReadU32(trace + 0x04, false),
        position: {
            x: Memory.ReadFloat(trace + 0x08, false),
            y: Memory.ReadFloat(trace + 0x0C, false),
            z: Memory.ReadFloat(trace + 0x10, false),
        },
        display: packed & 0x03,
        type: (packed >> 2) & 0x0F,
        sprite: Memory.ReadU8(trace + 0x28, false),
    };
}

const SA_RADAR: RadarLayout = {
    traceRva: 0x542A7B0,
    traceCount: 250,
    traceSize: 0x30,
    readTrace: readSaTrace,
    waypointSprite: 0x40,
    isWaypointHeightKnown: false,
};

export const isSaMemoryFeatureSupported = createBuildCheck(SA_BUILD, 'waypoint, mission targets');

export const getSaWaypoint = (): Vector3 | undefined => isSaMemoryFeatureSupported() ? getWaypoint(SA_RADAR) : undefined;

export const getSaMissionTargets = (): MissionTarget[] => isSaMemoryFeatureSupported() ? getMissionTargets(SA_RADAR) : [];
