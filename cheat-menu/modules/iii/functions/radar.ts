/// <reference path='../../../../.config/gta3.d.ts' />
import { createBuildCheck, getMissionTargets, getWaypoint, RadarLayout, readPlainTrace } from '../../../functions/index';
import { MissionTarget } from '../../../models/index';

// GTA III DE 1.0.113.21181 (Steam), found by diffing memory while moving the map waypoint
const III_BUILD = { version: '1.0.113', build: '21181', scriptSpaceRva: 0x4FD0470, mainCodeOffset: 0x575C };
const III_RADAR: RadarLayout = {
    traceRva: 0x516D700,
    traceCount: 32,
    traceSize: 0x30,
    readTrace: readPlainTrace({ position: 0x14, inUse: 0x23, display: 0x2A, sprite: 0x2C }),
    waypointSprite: 0x1C,
    isWaypointHeightKnown: true,
};

export const isIIIMemoryFeatureSupported = createBuildCheck(III_BUILD, 'waypoint, mission targets');

export const getIIIWaypoint = (): Vector3 | undefined => isIIIMemoryFeatureSupported() ? getWaypoint(III_RADAR) : undefined;

export const getIIIMissionTargets = (): MissionTarget[] => isIIIMemoryFeatureSupported() ? getMissionTargets(III_RADAR) : [];
