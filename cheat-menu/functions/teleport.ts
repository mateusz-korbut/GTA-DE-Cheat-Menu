import { MenuChar } from '../models/index';

export const teleport = (char: MenuChar, to: Vector3 | undefined, heading?: number) => {
    if (!to) {
        return;
    }
    const { x, y, z } = to;
    const currentCar = char.getCurrentCar();

    // not every game has REQUEST_COLLISION (GTA III DE doesn't)
    if (typeof Streaming.RequestCollision === 'function') {
        Streaming.RequestCollision(x, y);
    }

    if (currentCar) {
        currentCar.setCoordinates(x, y, z);

        if (heading !== undefined) {
            currentCar.setHeading(heading);
        }
    } else {
        char.setCoordinates(x, y, z);

        if (heading !== undefined) {
            char.setHeading?.(heading);
        }
    }
}

export const getPos = (char: MenuChar): Vector3 => {
    return char.getCurrentCar()?.getOffsetInWorldCoords(0, 0, 0)
        || char.getOffsetInWorldCoords(0, 0, 0);
}
