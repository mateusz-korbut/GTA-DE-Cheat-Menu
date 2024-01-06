import { KeyCode } from '../../.config/enums';
import { getPos, teleport } from '../functions/index';

import { PlayerTab } from './tab';
import { Location, MenuChar, MenuPlayer } from '../models';

export class TeleportTab extends PlayerTab {
    private savedPosition: Vector3;
    private lastPosition: Vector3;

    constructor(
        player: MenuPlayer,
        playerChar: MenuChar,
        private readonly teleportOptions: Location[]) {
        super(player, playerChar);
    }

    renderTabUI() {
        ImGui.Text(`Keyboard shortcuts:`);
        ImGui.TextWithBullet('CTRL + S: Saves your position');
        ImGui.TextWithBullet('CTRL + T: Teleports to saved position');
        ImGui.TextWithBullet('CTRL + Z: Teleport to previous position');

        ImGui.Separator();

        this.teleportOptions.forEach((teleportOption) => {
            if (ImGui.CollapsingHeader(teleportOption.name)) {
                teleportOption.locations.forEach((vector) => {
                    if (ImGui.Selectable(vector.name, false)) {
                        teleport(this.playerChar, vector);
                    }
                });
            }
        });
    }

    updateGameState() {
        if (!Pad.IsKeyPressed(KeyCode.Ctrl)) {
            return;
        }

        if (Pad.IsKeyPressed(KeyCode.S)) {
            this.savedPosition = getPos(this.playerChar);
            showTextBox(`Position saved`);
        }

        if (Pad.IsKeyPressed(KeyCode.T)) {
            this.lastPosition = getPos(this.playerChar);
            teleport(this.playerChar, this.savedPosition);
            showTextBox(`Teleported to saved position`);
        }

        if (Pad.IsKeyPressed(KeyCode.Z)) {
            teleport(this.playerChar, this.lastPosition);
            showTextBox(`Teleported to previous position`);
        }

        wait(250);
    }
}

