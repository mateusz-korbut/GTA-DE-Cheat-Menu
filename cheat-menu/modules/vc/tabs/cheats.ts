import { KeyCode } from '../../../../.config/enums';
import { getBoolean } from '../../../functions/index';
import { CONFIG_PATH } from '../../../config';
import { CheatsTab } from '../../../tabs/index';
import { MenuCar } from '../../../models';

const SECTION = 'CHEATS';
const SPEED_MULTIPLIER = IniFile.ReadFloat(CONFIG_PATH, SECTION, 'SPEED_MULTIPLIER');

export class VcCheatsTab extends CheatsTab {
    private speedUpCarActive = getBoolean(SECTION, 'SPEED_CAR_ACTIVE');
    private stopCarActive = getBoolean(SECTION, 'STOP_CAR_ACTIVE');

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
