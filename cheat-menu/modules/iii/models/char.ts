/// <reference path='../../../../.config/gta3.d.ts' />
import { WeaponType } from '../../../../.config/enums';
import { MenuChar } from '../../../models/index';

import { IIICar } from './car';

import { INFINITE_WEAPON_AMMO } from '../../../data/index';

export class IIIChar extends MenuChar {
    constructor(private readonly char: Char) {
        super();
    }

    setHealth(health: number) {
        this.char.setHealth(health);

        return this;
    }

    addHealth(health: number) {
        this.setHealth(this.char.getHealth() + health);

        return this;
    }

    addArmor(armor: number) {
        this.char.addArmor(armor);

        return this;
    }

    addAmmo() {
        this.char.setAmmo(WeaponType.Pistol, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.Uzi, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.Shotgun, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.M16, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.Sniper, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.Rocket, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.Flamethrower, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.Molotov, INFINITE_WEAPON_AMMO)
            .setAmmo(WeaponType.Grenade, INFINITE_WEAPON_AMMO);

        return this;
    }

    giveWeapon(id: number, ammo: number) {
        this.char.giveWeapon(id, ammo);

        return this;
    }

    getWeaponInSlot(id: number) {
        log('GTA III getWeaponInSlot not supported');
        return null;
    }

    getCurrentCar() {
        if (!this.char?.isSittingInAnyCar()) {
            return;
        }

        return new IIICar(this.char.storeCarIsInNoSave());
    }

    setCoordinates(x: number, y: number, z: number) {
        this.char.setCoordinates(x, y, z);

        return this;
    }

    getPositionInFrontOfChar() {
        return this.getOffsetInWorldCoords(0, 4, 1);
    }

    getOffsetInWorldCoords(x: number, y: number, z: number) {
        const coordinates = this.char.getCoordinates();

        return {
            x: x + coordinates.x,
            y: y + coordinates.y,
            z: z + coordinates.z,
        };
    }
}
