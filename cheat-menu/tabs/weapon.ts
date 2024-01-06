import { renderWeaponList } from '../sub-menus/index';
import { MenuChar, MenuPlayer, WeaponCategory } from '../models/index';

import { PlayerTab } from './tab';

export class WeaponTab extends PlayerTab {
    constructor(
        protected readonly player: MenuPlayer,
        protected readonly playerChar: MenuChar,
        protected readonly weaponCategories: WeaponCategory[],
    ) {
        super(player, playerChar);
    }

    renderTabUI() {
        renderWeaponList(this.weaponCategories, this.playerChar);
    }

    updateGameState() {
    }
}
