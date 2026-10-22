/// <reference path='../../../../.config/vc.d.ts' />
import { WeaponType } from '../../../../.config/enums';
import { MenuChar } from '../../../models/index';
import { VcCar } from './car';

import { INFINITE_WEAPON_AMMO } from '../../../data/index';

// slots 3-9: thrown, pistols, shotguns, SMGs, rifles, heavy, sniper (1-2 are melee, 10 is camera/detonator)
const FIRST_AMMO_SLOT = 3;
const LAST_AMMO_SLOT = 9;

export class VcChar extends MenuChar {
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
        for (let slot = FIRST_AMMO_SLOT; slot <= LAST_AMMO_SLOT; slot++) {
            const { weaponType, weaponAmmo } = this.char.getWeaponInSlot(slot);

            if (weaponType > WeaponType.Unarmed && weaponAmmo < INFINITE_WEAPON_AMMO / 2) {
                this.char.addAmmo(weaponType, INFINITE_WEAPON_AMMO - weaponAmmo);
            }
        }

        return this;
    }

    giveWeapon(id: number, ammo: number) {
        this.char.giveWeapon(id, ammo);

        return this;
    }

    getWeaponInSlot(id: number) {
        return this.char.getWeaponInSlot(id);
    }

    getCurrentCar() {
        if (!this.char?.isSittingInAnyCar()) {
            return;
        }

        return new VcCar(this.char.storeCarIsInNoSave());
    }

    setCoordinates(x: number, y: number, z: number) {
        this.char.setCoordinates(x, y, z);

        return this;
    }

    setHeading(heading: number) {
        this.char.setHeading(heading);

        return this;
    }

    getPositionInFrontOfChar() {
        return this.getOffsetInWorldCoords(0, 4, 1);
    }

    getOffsetInWorldCoords(x: number, y: number, z: number) {
        return this.char.getOffsetInWorldCoords(x, y, z);
    }
}
