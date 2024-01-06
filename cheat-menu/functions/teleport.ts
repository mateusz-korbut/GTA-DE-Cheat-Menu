import { MenuChar } from '../models/index';

export const teleport = (char: MenuChar, to: Vector3 | undefined) => {
    if (!to) {
        return;
    }
    const { x, y, z } = to;
    const currentCar = char.getCurrentCar();

    if (currentCar) {
        currentCar.setCoordinates(x, y, z);
    } else {
        char.setCoordinates(x, y, z);
    }
}

export const getPos = (char: MenuChar): Vector3 => {
    return char.getCurrentCar()?.getOffsetInWorldCoords(0, 0, 0)
        || char.getOffsetInWorldCoords(0, 0, 0);
}
