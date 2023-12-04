/// <reference path='../../.config/sa.d.ts' />
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
            char.giveWeapon(options[newWeaponIndex].id, infiniteAmmo);
        }
    });
}
