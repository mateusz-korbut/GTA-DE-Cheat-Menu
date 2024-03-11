import { KeyCode } from '../../.config/enums';
import { getBoolean, saveBoolean } from '../functions/index';
import { MenuCar } from '../models/index';

import { MAX_HEALTH } from '../data/index';

import { PlayerTab } from './tab';

const SECTION = 'CHEATS';

export class CheatsTab extends PlayerTab {
    private addHealthActive = getBoolean(SECTION, 'ADD_HEALTH_ACTIVE');
    private clearWantedLevelActive = getBoolean(SECTION, 'CLEAR_WANTED_LEVEL_ACTIVE');
    private flipCarActive = getBoolean(SECTION, 'FLIP_CAR_ACTIVE');
    private saveGameActive = getBoolean(SECTION, 'SAVE_GAME_ACTIVE');

    renderTabUI() {
        const addHealthActive = ImGui.Checkbox('F2 - Add health / Fix car', this.addHealthActive);
        const clearWantedLevelActive = ImGui.Checkbox('F3 - Clear wanted level', this.clearWantedLevelActive);
        const flipCarActive = ImGui.Checkbox('F4 - Fip car', this.flipCarActive);
        const saveGameActive = ImGui.Checkbox('F5 - Save game', this.saveGameActive);

        if (this.addHealthActive !== addHealthActive) {
            this.addHealthActive = addHealthActive;
            saveBoolean(SECTION, 'ADD_HEALTH_ACTIVE', addHealthActive);
        }
        if (this.clearWantedLevelActive !== clearWantedLevelActive) {
            this.clearWantedLevelActive = clearWantedLevelActive;
            saveBoolean(SECTION, 'CLEAR_WANTED_LEVEL_ACTIVE', clearWantedLevelActive);
        }
        if (this.flipCarActive !== flipCarActive) {
            this.flipCarActive = flipCarActive;
            saveBoolean(SECTION, 'FLIP_CAR_ACTIVE', flipCarActive);
        }
        if (this.saveGameActive !== saveGameActive) {
            this.saveGameActive = saveGameActive;
            saveBoolean(SECTION, 'SAVE_GAME_ACTIVE', saveGameActive);
        }
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
