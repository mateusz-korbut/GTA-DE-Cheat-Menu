/// <reference path='../../../../.config/gta3.d.ts' />
import { CarLock } from '../../../../.config/enums';
import { MenuCar } from '../../../models/index';

const MAX_HEALTH = 10000;

export class IIICar extends MenuCar {
    constructor(private readonly car: Car) {
        super();
    }

    getModel() {
        return this.car.getModel();
    }

    fix() {
        this.car.setHealth(MAX_HEALTH);

        return this;
    }

    makeInvincible() {
        this.car.setCanBeDamaged(false)
            .setProofs(true, true, true, true, true);

        return this;
    }

    delete() {
        this.car.delete();
    }

    setCoordinates(x: number, y: number, z: number) {
        this.car.setCoordinates(x, y, z);

        return this;
    }

    setHeading(heading: number) {
        this.car.setHeading(heading);

        return this;
    }

    setCarOnWheels() {
        return this.setHeading(0);
    }

    getOffsetInWorldCoords(x: number, y: number, z: number) {
        const coordinates = this.car.getCoordinates();

        return {
            x: x + coordinates.x,
            y: y + coordinates.y,
            z: z + coordinates.z,
        };
    }

    speedUpCar(multiplier: number) {
        log('GTA III speedUpCar not supported');
        return this;

    }

    break() {
        log('GTA III break not supported');
        return this;
    }

    unlockDoors() {
        this.car.lockDoors(CarLock.NotUsed);

        return this;
    }

    markAsNoLongerNeeded() {
        this.car.markAsNoLongerNeeded();

        return this;
    }

    getColors() {
        return this.car.getColors();
    }

    changeColor(primaryColor: number, secondaryColour: number) {
        this.car.changeColor(primaryColor, secondaryColour);

        return this;
    }
}
