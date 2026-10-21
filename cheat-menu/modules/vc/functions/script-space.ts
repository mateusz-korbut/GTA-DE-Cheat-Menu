/// <reference path='../../../../.config/vc.d.ts' />

// Vice City DE 1.0.113.21181 (Steam): CTheScripts::ScriptSpace - main.scm globals + code; the running mission is loaded at +0x370E8.
// Global offsets differ from the classic main.scm (DE inserted its own variables), they were taken from the DE scripts in memory.
const SCRIPT_SPACE_RVA = 0x5047AE0;
const MISSION_SLOT_OFFSET = 0x370E8;
const MISSION_NAME_SEARCH_SIZE = 0x400;
const SCRIPT_NAME_OPCODE = 0x03A4;

const SUPPORTED_BUILD = { version: '1.0.113', build: '21181' };
// main.scm header (GOTO) at the start of the script space and SCRIPT_NAME 'MAIN' where the DE main script code starts
const MAIN_CODE_OFFSET = 0x9098;
const MAIN_SIGNATURE = [0xA4, 0x03, 0x4D, 0x41, 0x49, 0x4E, 0x00];

const getScriptSpace = () => Memory.GetImageBase() + SCRIPT_SPACE_RVA;

let isSupported: boolean | undefined;
let isLogged = false;

const isScriptSpaceMatching = (): boolean => {
    const scriptSpace = getScriptSpace();

    return Memory.ReadU8(scriptSpace, false) === 0x02
        && Memory.ReadU16(scriptSpace + 1, false) === 0x0100
        && MAIN_SIGNATURE.every((byte, i) => Memory.ReadU8(scriptSpace + MAIN_CODE_OFFSET + i, false) === byte);
}

// all offsets in the VC module were found in this one build: on any other build (RGL, Epic, other patches) memory features stay off
export const isMemoryFeatureSupported = (): boolean => {
    if (isSupported !== undefined) {
        return isSupported;
    }
    const hostVersion = CLEO.hostVersion;
    const versionText = hostVersion
        ? `${hostVersion.toString()} ${[hostVersion.major, hostVersion.minor, hostVersion.patch, hostVersion.build].join('.')}`
        : '';
    const isVersionMatching = versionText.includes(SUPPORTED_BUILD.version) && versionText.includes(SUPPORTED_BUILD.build);
    // memory is only read once the build is known; a script space that isn't loaded yet is checked again later
    const isMatching = isVersionMatching && isScriptSpaceMatching();

    if (isMatching || !isVersionMatching) {
        isSupported = isMatching;
    }
    if (!isLogged && isSupported !== undefined) {
        isLogged = true;
        log(`Memory features (waypoint, mission targets, side missions): ${isSupported ? 'enabled' : 'disabled'} - host ${versionText || 'unknown'}`);
    }

    return isMatching;
}

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
