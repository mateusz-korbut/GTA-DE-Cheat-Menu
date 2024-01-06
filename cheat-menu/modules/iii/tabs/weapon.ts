import { WeaponType } from '../../../../.config/enums';

import { PlayerTab } from '../../../tabs/tab';

import { INFINITE_WEAPON_AMMO } from '../../../data/index';

export class IIIWeaponTab extends PlayerTab {
    renderTabUI() {
        ImGui.Text('Get weapon:');
        ImGui.Separator();

        Object.entries(WeaponType).forEach(([name, weaponType]) => {
            if (ImGui.Selectable(name, false)) {
                this.playerChar.giveWeapon(weaponType, INFINITE_WEAPON_AMMO);
            }
        });
    }

    updateGameState() {
    }
}
