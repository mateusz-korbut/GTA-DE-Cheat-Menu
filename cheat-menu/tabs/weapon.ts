/// <reference path='../../.config/sa.d.ts' />
import { renderWeaponList } from '../sub-menus/index';

import { PlayerTab } from './tab';

export class WeaponTab extends PlayerTab {

    renderTabUI() {
        renderWeaponList(this.playerChar);
    }

    updateGameState() {
    }
}
