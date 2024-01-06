/// <reference path='../../.config/sa.d.ts' />
import { MenuChar, WeaponCategory } from '../models/index';
import { loadModel } from '../functions/index';

export const renderWeaponList = (weaponCategories: WeaponCategory[], char: MenuChar) => {
    weaponCategories.forEach(({ id, name, options, infiniteAmmo }) => {
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
