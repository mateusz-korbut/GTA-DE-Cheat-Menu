/// <reference path='../../../../.config/sa.d.ts' />
import { CarLock } from '../../../../.config/enums';
import { MenuCar } from '../../../models/index';

export class SaCar extends MenuCar {
    constructor(private readonly car: Car) {
        super();
    }

    getModel() {
        return this.car.getModel();
    }

    fix(): MenuCar {
        this.car.fix();

        return this;
    }

    makeInvincible(): MenuCar {
        this.car.setCanBeDamaged(false)
            .setPetrolTankWeakpoint(false)
            .setCanBeVisiblyDamaged(false)
            .setCanBurstTires(false)
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
        this.setHeading(0);

        return this;
    }

    getOffsetInWorldCoords(x: number, y: number, z: number) {
        return this.car.getOffsetInWorldCoords(x, y, z);
    }

    speedUpCar(multiplier: number) {
        const newSpeed = this.car.getSpeed() * multiplier;

        showTextBox(`Speed set to ${ newSpeed.toFixed(0) }`);
        this.car.setForwardSpeed(newSpeed);

        return this;
    }

    break() {
        this.car.setForwardSpeed(0);

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

    getColors(): { primaryColour: number; secondaryColour: number; } {
        return this.car.getColors();
    }

    changeColor(primaryColor: number, secondaryColour: number) {
        this.car.changeColor(primaryColor, secondaryColour);

        return this;
    }

    getCurrentMod(slotId: number) {
        return this.car.getCurrentMod(slotId);
    }

    addMod(modId: number) {
        return this.car.addMod(modId);
    }

    removeMod(modId: number) {
        this.car.removeMod(modId);

        return this;
    }

    getCurrentPaintjob(): number {
        return this.car.getCurrentPaintjob();
    }

    getNumAvailablePaintjobs(): number {
        return this.car.getNumAvailablePaintjobs();
    }

    givePaintjob(id: number) {
        this.car.givePaintjob(id);

        return this;
    }
}
