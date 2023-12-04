/// <reference path='../../.config/sa.d.ts' />
import { WeaponType } from '../../.config/enums';

import { INFINITE_WEAPON_AMMO } from '../data/index';

export const infiniteAmmo = (char: Char): Char =>
    char.setAmmo(WeaponType.Pistol, INFINITE_WEAPON_AMMO)
        .setAmmo(WeaponType.Shotgun, INFINITE_WEAPON_AMMO)
        .setAmmo(WeaponType.Mp5, INFINITE_WEAPON_AMMO)
        .setAmmo(WeaponType.M4, INFINITE_WEAPON_AMMO)
        .setAmmo(WeaponType.Sniper, INFINITE_WEAPON_AMMO)
        .setAmmo(WeaponType.RocketLauncher, INFINITE_WEAPON_AMMO)
        .setAmmo(WeaponType.Satchel, INFINITE_WEAPON_AMMO)
        .setAmmo(WeaponType.SprayCan, INFINITE_WEAPON_AMMO);
