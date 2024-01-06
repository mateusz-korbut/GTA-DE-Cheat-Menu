import { KeyCode } from '../../.config/enums';
import { MenuCar } from '../models/index';

import { MAX_HEALTH } from '../data/index';

import { PlayerTab } from './tab';

export class CheatsTab extends PlayerTab {
    private clearWantedLevelActive = true;
    private flipCarActive = true;
    private addHealthActive = true;
    private saveGameActive = true;

    renderTabUI() {
        this.addHealthActive = ImGui.Checkbox('F2 - Add health / Fix car', this.addHealthActive);
        this.clearWantedLevelActive = ImGui.Checkbox('F3 - Clear wanted level', this.clearWantedLevelActive);
        this.flipCarActive = ImGui.Checkbox('F4 - Fip car', this.flipCarActive);
        this.saveGameActive = ImGui.Checkbox('F5 - Save game', this.saveGameActive);
    }

    updateGameState() {
        this.checkCheatsShortcuts();
        this.checkCarShortcuts();
    }

    protected moreCarShortcuts(car: MenuCar) {
    }

    private checkCheatsShortcuts() {
        if (this.addHealthActive && Pad.IsKeyPressed(KeyCode.F2)) {
            this.playerChar.setHealth(MAX_HEALTH);
        }

        if (this.clearWantedLevelActive && Pad.IsKeyPressed(KeyCode.F3)) {
            this.player.alterWantedLevel(0);
        }

        if (this.saveGameActive && Pad.IsKeyPressed(KeyCode.F5)) {
            Game.ActivateSaveMenu();
        }
    }

    private checkCarShortcuts() {
        const car = this.playerChar.getCurrentCar();

        if (car) {
            if (this.addHealthActive && Pad.IsKeyPressed(KeyCode.F2)) {
                car.fix();
            }

            if (this.flipCarActive && Pad.IsKeyPressed(KeyCode.F4)) {
                car.setCarOnWheels();
            }

            this.moreCarShortcuts(car);
        }
    }
}
