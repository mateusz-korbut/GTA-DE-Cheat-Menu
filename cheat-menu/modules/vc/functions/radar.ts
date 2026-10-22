/// <reference path='../../../../.config/vc.d.ts' />
import { getMissionTargets, getWaypoint, RadarLayout, readPlainTrace } from '../../../functions/index';
import { MissionTarget } from '../../../models/index';
import { isMemoryFeatureSupported } from './script-space';

// Vice City DE 1.0.113.21181 (Steam): CRadar::ms_RadarTrace[75], found by diffing memory while moving the map waypoint
const VC_RADAR: RadarLayout = {
    traceRva: 0x5244C80,
    traceCount: 75,
    traceSize: 0x38,
    readTrace: readPlainTrace({ position: 0x18, inUse: 0x27, display: 0x32, sprite: 0x34 }),
    waypointSprite: 0x28,
    isWaypointHeightKnown: true,
};

export const getVcWaypoint = (): Vector3 | undefined => isMemoryFeatureSupported() ? getWaypoint(VC_RADAR) : undefined;

export const getVcMissionTargets = (): MissionTarget[] => isMemoryFeatureSupported() ? getMissionTargets(VC_RADAR) : [];
