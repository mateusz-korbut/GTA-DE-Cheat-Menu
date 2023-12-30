/// <reference path='../../.config/sa.d.ts' />
import { loadModel } from '../functions/index';

import { WEAPON_CATEGORIES } from '../data/index';

export const renderWeaponList = (char: Char) => {
    WEAPON_CATEGORIES.forEach(({ id, name, options, infiniteAmmo }) => {
        const charWeaponModel = char.getWeaponInSlot(id)?.weaponModel;
        const charOptionIndex = options.findIndex(({ weaponModel }) => weaponModel === charWeaponModel);
        const newWeaponIndex = ImGui.ComboBox(
            name,
            options.map(({ name }) => name).join(','),
            charOptionIndex,
        );

        if (newWeaponIndex !== charOptionIndex) {
            const newWeapon = options[newWeaponIndex];

            loadModel(newWeapon.weaponModel);
            char.giveWeapon(newWeapon.id, infiniteAmmo);
        }
    });
}
