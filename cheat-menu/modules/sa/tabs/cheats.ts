import { KeyCode } from '../../../../.config/enums';
import { MenuCar } from '../../../models/index';

import { CheatsTab } from '../../../tabs/index';

const SPEED_MULTIPLIER = 1.5;

export class SaCheatsTab extends CheatsTab {
    private speedUpCarActive = true;
    private stopCarActive = true;

    renderTabUI() {
        super.renderTabUI();
        this.speedUpCarActive = ImGui.Checkbox('SHIFT + W - Speed car', this.speedUpCarActive);
        this.stopCarActive = ImGui.Checkbox('SHIFT + S - Stop car', this.stopCarActive);
    }

    protected moreCarShortcuts(car: MenuCar) {
        if (Pad.IsKeyPressed(KeyCode.Shift)) {
            if (this.speedUpCarActive && Pad.IsKeyPressed(KeyCode.W)) {
                car.speedUpCar(SPEED_MULTIPLIER);
                wait(250);
            }

            if (this.stopCarActive && Pad.IsKeyPressed(KeyCode.S)) {
                showTextBox('BREAK');
                car.break();
            }
        }
    }
}
