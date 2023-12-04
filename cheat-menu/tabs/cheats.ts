/// <reference path='../../.config/sa.d.ts' />
import { KeyCode } from '../../.config/enums';
import { clearWantedLevel, getCurrentCar, speedUpCar } from '../functions/index';

import { MAX_HEALTH } from '../data/index';

import { PlayerTab } from './tab';

export class CheatsTab extends PlayerTab {
    private clearWantedLevelActive = true;
    private flipCarActive = true;
    private addHealthActive = true;
    private saveGameActive = true;
    private speedUpCarActive = true;
    private stopCarActive = true;

    renderTabUI() {
        this.addHealthActive = ImGui.Checkbox('F2 - Add health / Fix car', this.addHealthActive);
        this.clearWantedLevelActive = ImGui.Checkbox('F3 - Clear wanted level', this.clearWantedLevelActive);
        this.flipCarActive = ImGui.Checkbox('F4 - Fip car', this.flipCarActive);
        this.saveGameActive = ImGui.Checkbox('F5 - Save game', this.saveGameActive);
        this.speedUpCarActive = ImGui.Checkbox('SHIFT + W - Speed car', this.speedUpCarActive);
        this.stopCarActive = ImGui.Checkbox('SHIFT + S - Stop car', this.stopCarActive);
    }

    updateGameState() {
        this.checkCheatsShortcuts();
        this.checkCarShortcuts();
    }

    private checkCheatsShortcuts() {
        if (this.addHealthActive && Pad.IsKeyPressed(KeyCode.F2)) {
            this.playerChar.setHealth(MAX_HEALTH);
        }

        if (this.clearWantedLevelActive && Pad.IsKeyPressed(KeyCode.F3)) {
            clearWantedLevel(this.player);
        }

        if (this.saveGameActive && Pad.IsKeyPressed(KeyCode.F5)) {
            Game.ActivateSaveMenu();
        }
    }

    private checkCarShortcuts() {
        const car = getCurrentCar(this.playerChar);

        if (car) {
            if (this.addHealthActive && Pad.IsKeyPressed(KeyCode.F2)) {
                car.fix();
            }

            if (this.flipCarActive && Pad.IsKeyPressed(KeyCode.F4)) {
                car.setHeading(0);
            }

            this.checkCarSpeedShortcuts(car);
        }
    }

    private checkCarSpeedShortcuts(car: Car) {
        if (Pad.IsKeyPressed(KeyCode.Shift)) {
            if (this.speedUpCarActive && Pad.IsKeyPressed(KeyCode.W)) {
                speedUpCar(car);
                wait(250);
            }

            if (this.stopCarActive && Pad.IsKeyPressed(KeyCode.S)) {
                showTextBox(`BREAK`);
                car.setForwardSpeed(0);
            }
        }
    }
}
