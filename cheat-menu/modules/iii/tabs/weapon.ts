import { WeaponType } from '../../../../.config/enums';

import { PlayerTab } from '../../../tabs/tab';

import { INFINITE_WEAPON_AMMO } from '../../../data/index';

export class IIIWeaponTab extends PlayerTab {
    renderTabUI() {
        ImGui.Text('Get weapon:');
        ImGui.Separator();

        // CLEO Redux 1.5 enums are TS enums: skip the reverse "10" -> "Molotov" entries, the game needs the number
        Object.entries(WeaponType)
            .filter((entry): entry is [string, number] => typeof entry[1] === 'number')
            .forEach(([name, weaponType]) => {
                if (ImGui.Selectable(name, false)) {
                    this.playerChar.giveWeapon(weaponType, INFINITE_WEAPON_AMMO);
                }
            });
    }

    updateGameState() {
    }
}
