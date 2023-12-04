/// <reference path='../../.config/sa.d.ts' />
import { getCurrentCar } from './car';

export const teleport = (char: Char, to: Vector3 | undefined) => {
    if (!to) {
        return;
    }
    const { x, y, z } = to;
    const currentCar = getCurrentCar(char);

    if (currentCar) {
        currentCar.setCoordinates(x, y, z);
    } else {
        char.setCoordinates(x, y, z);
    }
}

export const getPos = (char: Char): Vector3 => {
    return getCurrentCar(char)?.getOffsetInWorldCoords(0, 0, 0)
        || char.getOffsetInWorldCoords(0, 0, 0);
}
