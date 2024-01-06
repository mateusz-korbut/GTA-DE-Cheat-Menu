import { renderMainActions, renderMoneySlider, MainOptions, renderWantedLevelSlider } from '../sub-menus/index';

import { MAX_HEALTH } from '../data/index';

import { PlayerTab } from './tab';

const BUTTON_SIZE = {
    width: 150,
    height: 60,
}

export class MainTab extends PlayerTab {
    private readonly mainOptions = new MainOptions();
    private wantedLevel = 0;

    renderTabUI() {
        renderMainActions(this.playerChar, BUTTON_SIZE);
        this.mainOptions.renderMainOptions();
        this.wantedLevel = renderWantedLevelSlider(this.player, this.wantedLevel);
        renderMoneySlider(this.player);
    }

    updateGameState() {
        if (this.mainOptions.isInfiniteHealthChecked) {
            this.playerChar.setHealth(MAX_HEALTH);
        }

        if (this.mainOptions.isInfiniteAmmoChecked) {
            this.playerChar.addAmmo();
        }

        if (this.mainOptions.isWantedLevelFrozen) {
            this.player.alterWantedLevel(this.wantedLevel);
        }

        this.player.setNeverGetsTired(this.mainOptions.isNeverTired);

        Hud.FreezeTimer(this.mainOptions.isMissionTimerFrozen);
    }
}
