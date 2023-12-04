/// <reference path='../../.config/sa.d.ts' />

export const getPositionInFrontOfChar = (char: Char): Vector3 => char.getOffsetInWorldCoords(0, 4, 1);

export const clearWantedLevel = (player: Player) => {
    player.clearWantedLevel();
    showTextBox(`Wanted level cleared`);
}
