// Memory features use addresses found in one exact build of each game. Before any of them runs, the build is checked:
// the host version must match and the script space must start with the main.scm header (GOTO) and have
// SCRIPT_NAME 'MAIN' where that build's main script code starts. Memory is only read once the version matches.
export interface GameBuild {
    version: string;
    build: string;
    scriptSpaceRva: number;
    mainCodeOffset: number;
    // SCRIPT_NAME 'MAIN' as encoded by that game's main.scm (SA has a type byte before strings)
    mainSignature?: number[];
}

const MAIN_SIGNATURE = [0xA4, 0x03, 0x4D, 0x41, 0x49, 0x4E, 0x00];

const isScriptSpaceMatching = ({ scriptSpaceRva, mainCodeOffset, mainSignature = MAIN_SIGNATURE }: GameBuild): boolean => {
    const scriptSpace = Memory.GetImageBase() + scriptSpaceRva;

    return Memory.ReadU8(scriptSpace, false) === 0x02
        && Memory.ReadU16(scriptSpace + 1, false) === 0x0100
        && mainSignature.every((byte, i) => Memory.ReadU8(scriptSpace + mainCodeOffset + i, false) === byte);
}

export const createBuildCheck = (gameBuild: GameBuild, features: string) => {
    let isSupported: boolean | undefined;
    let isLogged = false;

    return (): boolean => {
        if (isSupported !== undefined) {
            return isSupported;
        }
        const hostVersion = CLEO.hostVersion;
        const versionText = hostVersion
            ? `${hostVersion.toString()} ${[hostVersion.major, hostVersion.minor, hostVersion.patch, hostVersion.build].join('.')}`
            : '';
        const isVersionMatching = versionText.includes(gameBuild.version) && versionText.includes(gameBuild.build);
        // a script space that isn't loaded yet is checked again later
        const isMatching = isVersionMatching && isScriptSpaceMatching(gameBuild);

        if (isMatching || !isVersionMatching) {
            isSupported = isMatching;
        }
        if (!isLogged && isSupported !== undefined) {
            isLogged = true;
            log(`Memory features (${features}): ${isSupported ? 'enabled' : 'disabled'} - host ${versionText || 'unknown'}`);
        }

        return isMatching;
    }
}
