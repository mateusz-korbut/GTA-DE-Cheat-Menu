import { KeyCode } from '../../.config/enums';
import { getBoolean, isShortcutPressed, saveBoolean } from '../functions/index';
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

    protected isAddHealthPressed = false;
    protected isFlipCarPressed = false;

    updateGameState() {
        this.isAddHealthPressed = isShortcutPressed('cheat-add-health', KeyCode.F2);
        this.isFlipCarPressed = isShortcutPressed('cheat-flip-car', KeyCode.F4);
        this.checkCheatsShortcuts();
        this.checkCarShortcuts();
    }

    protected moreCarShortcuts(car: MenuCar) {
    }

    private checkCheatsShortcuts() {
        if (this.addHealthActive && this.isAddHealthPressed) {
            this.playerChar.setHealth(MAX_HEALTH);
        }

        if (isShortcutPressed('cheat-clear-wanted', KeyCode.F3) && this.clearWantedLevelActive) {
            this.player.alterWantedLevel(0);
        }

        if (isShortcutPressed('cheat-save-game', KeyCode.F5) && this.saveGameActive) {
            Game.ActivateSaveMenu();
        }
    }

    private checkCarShortcuts() {
        const car = this.playerChar.getCurrentCar();

        if (car) {
            if (this.addHealthActive && this.isAddHealthPressed) {
                car.fix();
            }

            if (this.flipCarActive && this.isFlipCarPressed) {
                car.setCarOnWheels();
            }

            this.moreCarShortcuts(car);
        }
    }
}
