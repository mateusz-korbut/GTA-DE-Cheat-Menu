/// <reference path='../../../../.config/vc.d.ts' />
import { createBuildCheck } from '../../../functions/index';

// Vice City DE 1.0.113.21181 (Steam): CTheScripts::ScriptSpace - main.scm globals + code; the running mission is loaded at +0x370E8.
// Global offsets differ from the classic main.scm (DE inserted its own variables), they were taken from the DE scripts in memory.
const SCRIPT_SPACE_RVA = 0x5047AE0;
const MISSION_SLOT_OFFSET = 0x370E8;
const MISSION_NAME_SEARCH_SIZE = 0x400;
const SCRIPT_NAME_OPCODE = 0x03A4;

const VC_BUILD = { version: '1.0.113', build: '21181', scriptSpaceRva: SCRIPT_SPACE_RVA, mainCodeOffset: 0x9098 };

const getScriptSpace = () => Memory.GetImageBase() + SCRIPT_SPACE_RVA;

// all VC memory offsets were found in this one build: on any other build (RGL, Epic, other patches) these features stay off
export const isMemoryFeatureSupported = createBuildCheck(VC_BUILD, 'waypoint, mission targets, side missions');

export const readGlobal = (offset: number): number =>
    isMemoryFeatureSupported() ? Memory.ReadI32(getScriptSpace() + offset, false) : 0;

export const writeGlobal = (offset: number, value: number) => {
    if (isMemoryFeatureSupported()) {
        Memory.WriteI32(getScriptSpace() + offset, value, false);
    }
}

// name of the mission script currently (or last) loaded into the mission slot, e.g. 'ICECRE1'
export const getLoadedMissionName = (): string | undefined => {
    if (!isMemoryFeatureSupported()) {
        return;
    }
    const slot = getScriptSpace() + MISSION_SLOT_OFFSET;

    for (let offset = 0; offset < MISSION_NAME_SEARCH_SIZE; offset++) {
        if (Memory.ReadU16(slot + offset, false) !== SCRIPT_NAME_OPCODE) {
            continue;
        }
        let name = '';

        for (let i = 0; i < 8; i++) {
            const char = Memory.ReadU8(slot + offset + 2 + i, false);

            if (char === 0) {
                break;
            }
            name += String.fromCharCode(char);
        }
        if (/^[A-Z0-9_]{2,7}$/.test(name)) {
            return name;
        }
    }
}
