import { MenuCar } from './car';

export abstract class MenuChar {
    abstract setHealth(health: number): MenuChar;

    abstract addHealth(health: number): MenuChar;

    abstract addArmor(armor: number): MenuChar;

    abstract addAmmo(): MenuChar;

    abstract giveWeapon(id: number, ammo: number): MenuChar;

    abstract getWeaponInSlot(id: number): {
        weaponType: number;
        weaponAmmo: number;
        weaponModel: number;
    };

    abstract getCurrentCar(): MenuCar;

    abstract setCoordinates(x: number, y: number, z: number): MenuChar;

    abstract getPositionInFrontOfChar(): Vector3;

    abstract getOffsetInWorldCoords(x: number, y: number, z: number): Vector3;
}
