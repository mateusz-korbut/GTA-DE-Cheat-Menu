import { KeyCode } from '../../../../.config/enums';
import { getBoolean, isShortcutPressed, saveBoolean } from '../../../functions/index';
import { CONFIG_PATH } from '../../../config';
import { CheatsTab } from '../../../tabs/index';
import { MenuCar } from '../../../models';
import { completeIceCreamSales, isMemoryFeatureSupported, SIDE_MISSIONS } from '../functions/index';

const SECTION = 'CHEATS';
const SPEED_MULTIPLIER = IniFile.ReadFloat(CONFIG_PATH, SECTION, 'SPEED_MULTIPLIER') ?? 1.5;
const SPEED_UP_INTERVAL = 250;

export class VcCheatsTab extends CheatsTab {
    private speedUpCarActive = getBoolean(SECTION, 'SPEED_CAR_ACTIVE');
    private stopCarActive = getBoolean(SECTION, 'STOP_CAR_ACTIVE');
    private lastSpeedUpTime = 0;
    private isStopPressed = false;

    updateGameState() {
        // evaluated every frame (not only in a car) so the key state never goes stale
        this.isStopPressed = isShortcutPressed('cheat-stop-car', KeyCode.Shift, KeyCode.S);
        super.updateGameState();
    }

    renderTabUI() {
        super.renderTabUI();
        const speedUpCarActive = ImGui.Checkbox('SHIFT + W - Speed car', this.speedUpCarActive);
        const stopCarActive = ImGui.Checkbox('SHIFT + S - Stop car', this.stopCarActive);

        if (this.speedUpCarActive !== speedUpCarActive) {
            this.speedUpCarActive = speedUpCarActive;
            saveBoolean(SECTION, 'SPEED_CAR_ACTIVE', speedUpCarActive);
        }
        if (this.stopCarActive !== stopCarActive) {
            this.stopCarActive = stopCarActive;
            saveBoolean(SECTION, 'STOP_CAR_ACTIVE', stopCarActive);
        }

        this.renderSideMissions();
    }

    private renderSideMissions() {
        if (!ImGui.CollapsingHeader('Side missions')) {
            return;
        }
        if (!isMemoryFeatureSupported()) {
            ImGui.TextWrapped('Needs GTA Vice City DE 1.0.113.21181 (Steam) - not available on this game version.');
            return;
        }
        SIDE_MISSIONS.forEach((mission) => {
            if (mission.isDone()) {
                ImGui.Text(`${mission.name}: completed`);
                return;
            }
            if (ImGui.Button(`Complete ${mission.name}##side-${mission.name}`, 380, 50)) {
                mission.complete();
                showTextBox(`${mission.name} completed: ${mission.reward}`);
            }
        });

        ImGui.Separator();
        ImGui.TextWrapped('Cherry Popper: start the ice cream mission, press the button, then leave the van.');

        if (ImGui.Button('Ice cream: set sales to 50', 380, 50)) {
            showTextBox(completeIceCreamSales());
        }
    }

    protected moreCarShortcuts(car: MenuCar) {
        if (this.speedUpCarActive && Pad.IsKeyPressed(KeyCode.Shift) && Pad.IsKeyPressed(KeyCode.W)
            && Date.now() - this.lastSpeedUpTime >= SPEED_UP_INTERVAL) {
            this.lastSpeedUpTime = Date.now();
            car.speedUpCar(SPEED_MULTIPLIER);
        }

        if (this.stopCarActive && this.isStopPressed) {
            showTextBox('BREAK');
            car.break();
        }
    }
}
