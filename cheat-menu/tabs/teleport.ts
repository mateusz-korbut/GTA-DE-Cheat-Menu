import { KeyCode, ImGuiCond } from '../../.config/enums';
import { getPos, teleport } from '../functions/index';
import { PlayerTab } from './tab';
import { Location, MenuChar, MenuPlayer } from '../models';

interface SavedLocation {
    name: string;
    x: number;
    y: number;
    z: number;
}

export class TeleportTab extends PlayerTab {
    private savedPosition: Vector3 | null = null;
    private lastPosition: Vector3 | null = null;
    private isSaveWindowOpen: boolean = false;
    private inputName: string = "";
    
    private customLocations: SavedLocation[] = [];

    constructor(
        player: MenuPlayer,
        playerChar: MenuChar,
        private readonly teleportOptions: Location[]
    ) {
        super(player, playerChar);
        this.loadIniLocations();
    }

    private loadIniLocations() {
        const iniPath = "CLEO/saved-locations.ini";
        const sectionKeys = "Locations";

        const keysString = IniFile.ReadString(iniPath, sectionKeys, "keys");
        if (!keysString) return;

        const keys = keysString.split(",");
        keys.forEach((key) => {
            const value = IniFile.ReadString(iniPath, key, "pos");
            if (value) {
                const parts = value.split(",").map(Number);
                if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
                    this.customLocations.push({
                        name: key,
                        x: parts[0],
                        y: parts[1],
                        z: parts[2],
                    });
                }
            }
        });
    }

    renderTabUI() {
        ImGui.Text(`Keyboard shortcuts:`);
        ImGui.TextWithBullet('CTRL + S: Save your position');
        ImGui.TextWithBullet('CTRL + T: Teleports to saved position');
        ImGui.TextWithBullet('CTRL + Z: Teleport to previous position');
        ImGui.TextWithBullet('CTRL + R: Save your position with name');

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

        if (this.customLocations.length > 0) {
            if (ImGui.CollapsingHeader("Custom Locations")) {
                this.customLocations.forEach((loc) => {
                    if (ImGui.Selectable(loc.name, false)) {
                        teleport(this.playerChar, loc);
                    }
                });
            }
        }
    }

    updateGameState() {
        if (Pad.IsKeyPressed(KeyCode.Ctrl) && Pad.IsKeyPressed(KeyCode.S)) {
            this.savedPosition = getPos(this.playerChar);
            showTextBox(`Position saved`);
        }

        if (Pad.IsKeyPressed(KeyCode.Ctrl) && Pad.IsKeyPressed(KeyCode.T) && this.savedPosition) {
            this.lastPosition = getPos(this.playerChar);
            teleport(this.playerChar, this.savedPosition);
            showTextBox(`Teleported to saved position`);
        }

        if (Pad.IsKeyPressed(KeyCode.Ctrl) && Pad.IsKeyPressed(KeyCode.Z) && this.lastPosition) {
            teleport(this.playerChar, this.lastPosition);
            showTextBox(`Teleported to previous position`);
        }

        if (Pad.IsKeyPressed(KeyCode.Ctrl) && Pad.IsKeyPressed(KeyCode.R)) {
            this.inputName = "";
            this.isSaveWindowOpen = !this.isSaveWindowOpen;
            wait(200); 
        }

        if (this.isSaveWindowOpen) {
            ImGui.SetCursorVisible(true);
            ImGui.SetNextWindowSize(700, 300, ImGuiCond.FirstUseEver);

            if (ImGui.Begin("Save location", this.isSaveWindowOpen, false, false, false, false)) {
                ImGui.Text("Location name:");
                this.inputName = ImGui.InputText("##locName");

                if (ImGui.Button("Save", 100, 50) && this.inputName) {
                    const pos = getPos(this.playerChar);
                    const iniPath = "CLEO/saved-locations.ini";
                    const sectionKeys = "Locations";

                    IniFile.WriteString(`${pos.x},${pos.y},${pos.z}`, iniPath, this.inputName, "pos");

                    // Actualizamos la lista de keys
                    let keysString = IniFile.ReadString(iniPath, sectionKeys, "keys") || "";
                    const keys = keysString ? keysString.split(",") : [];
                    if (!keys.includes(this.inputName)) keys.push(this.inputName);
                    IniFile.WriteString(keys.join(","), iniPath, sectionKeys, "keys");

                    this.customLocations.push({ name: this.inputName, x: pos.x, y: pos.y, z: pos.z });

                    showTextBox(`Location "${this.inputName}" saved`);
                    this.isSaveWindowOpen = false;
                    this.inputName = "";
                }

                ImGui.SameLine();
                if (ImGui.Button("Cancel", 100, 50)) {
                    this.inputName = "";
                    this.isSaveWindowOpen = false;
                }

                ImGui.End();
            }
        }
    }
}
