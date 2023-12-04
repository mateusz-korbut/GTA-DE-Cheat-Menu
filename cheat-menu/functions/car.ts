/// <reference path='../../.config/sa.d.ts' />

const SPEED_MULTIPLIER = 1.5;

export const getCurrentCar = (char: Char | undefined): Car | undefined => {
    if (!char?.isSittingInAnyCar()) {
        return;
    }

    return char.getCarIsUsing();
}

export const speedUpCar = (car: Car, multiplier = SPEED_MULTIPLIER) => {
    const newSpeed = car.getSpeed() * multiplier;

    showTextBox(`Speed set to ${ newSpeed.toFixed(0) }`);
    car.setForwardSpeed(newSpeed);
    wait(250);
}

export const makeCarInvincible = (car: Car) => {
    return car.setCanBeDamaged(false)
        .setPetrolTankWeakpoint(false)
        .setCanBeVisiblyDamaged(false)
        .setCanBurstTires(false)
        .setProofs(true, true, true, true, true);
}
