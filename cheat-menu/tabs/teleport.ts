import { KeyCode, ImGuiCond } from '../../.config/enums';
import { getPos, isShortcutPressed, teleport } from '../functions/index';
import { PlayerTab } from './tab';
import { Location, MenuChar, MenuPlayer, MissionTarget } from '../models';

type LocationPoint = Location['locations'][number];

const PICKUP_REFRESH_INTERVAL = 2000;
// the game reports z = 1.0 until it resolves the ground height of a fresh waypoint
const MIN_KNOWN_WAYPOINT_Z = 1.5;
// above any roof or mountain (Mount Chiliad is ~530 m)
const WAYPOINT_DROP_Z = 1000;
const GROUND_FIX_DELAY = 500;
const GROUND_FIX_TIMEOUT = 4000;
const MISSION_TARGETS_REFRESH_INTERVAL = 500;
// a target closer than this is the one you are already at
const MIN_TARGET_DISTANCE = 15;

interface PickupCache {
    remaining: LocationPoint[];
    refreshedAt: number;
}

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
    private pickupCache: { [category: string]: PickupCache } = {};
    private pendingGroundFix?: { x: number, y: number, fromZ: number, since: number, heading?: number, launchSpeed?: number };
    private missionTargets: MissionTarget[] = [];
    private missionTargetsRefreshedAt = 0;

    constructor(
        player: MenuPlayer,
        playerChar: MenuChar,
        private readonly teleportOptions: Location[],
        private readonly getWaypoint?: () => Vector3 | undefined,
        private readonly getMissionTargets?: () => MissionTarget[],
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

        if (this.getWaypoint) {
            ImGui.TextWithBullet('F6: Teleport to waypoint');
        }
        if (this.getMissionTargets) {
            ImGui.TextWithBullet('F7: Teleport to mission destination / target');
        }
        if (this.getWaypoint) {
            ImGui.Separator();

            if (ImGui.Button('Teleport to waypoint', 300, 50)) {
                this.teleportToWaypoint();
            }
        }
        if (this.getMissionTargets) {
            ImGui.SameLine();

            if (ImGui.Button('Teleport to destination', 300, 50)) {
                this.teleportToMissionTarget();
            }
            this.renderMissionTargets();
        }

        ImGui.Separator();

        this.teleportOptions.forEach((teleportOption) => {
            if (teleportOption.pickups) {
                return this.renderPickupLocations(teleportOption);
            }

            if (ImGui.CollapsingHeader(`${teleportOption.name} (${teleportOption.locations.length})###${teleportOption.name}`)) {
                if (teleportOption.hint) {
                    ImGui.TextWrapped(teleportOption.hint);
                }

                teleportOption.locations.forEach((vector) => {
                    // names repeat across categories, so the ID needs the category too
                    if (ImGui.Selectable(`${vector.name}##${teleportOption.name}`, false)) {
                        this.teleportTo(vector, teleportOption);
                    }
                });
            }
        });

        if (this.customLocations.length > 0) {
            if (ImGui.CollapsingHeader("Custom Locations")) {
                this.customLocations.forEach((loc, index) => {
                    if (ImGui.Selectable(`${loc.name}##custom-${index}`, false)) {
                        this.teleportTo(loc);
                    }
                });
            }
        }
    }

    private teleportToWaypoint() {
        const waypoint = this.getWaypoint?.();

        if (!waypoint) {
            showTextBox('No waypoint set on the map');
            return;
        }
        this.teleportToGround(waypoint);
        showTextBox('Teleported to waypoint');
    }

    private teleportToGround({ x, y, z }: Vector3) {
        if (z > MIN_KNOWN_WAYPOINT_Z) {
            this.teleportTo({ x, y, z: z + 1 });
        } else {
            // drop in from above and land once the destination collision is loaded
            this.teleportTo({ x, y, z: WAYPOINT_DROP_Z });
            this.pendingGroundFix = { x, y, fromZ: WAYPOINT_DROP_Z, since: Date.now() };
        }
    }

    private getCachedMissionTargets(): MissionTarget[] {
        if (Date.now() - this.missionTargetsRefreshedAt >= MISSION_TARGETS_REFRESH_INTERVAL) {
            this.missionTargets = this.getMissionTargets?.() ?? [];
            this.missionTargetsRefreshedAt = Date.now();
        }

        return this.missionTargets;
    }

    private distanceTo({ x, y }: Vector3): number {
        const position = getPos(this.playerChar);

        return Math.sqrt((x - position.x) ** 2 + (y - position.y) ** 2);
    }

    private renderMissionTargets() {
        const targets = this.getCachedMissionTargets();

        if (!ImGui.CollapsingHeader(`Mission targets (${targets.length})###mission-targets`)) {
            return;
        }
        if (!targets.length) {
            ImGui.Text('No mission destination or target on the radar.');
        }

        // ImGuiRedux keys clicks by the whole label, so it must not contain the changing distance
        targets.forEach((target, index) => {
            if (ImGui.Selectable(`${target.name}##target-${index}`, false)) {
                this.teleportToGround(target);
            }
            ImGui.SameLine();
            ImGui.Text(`${this.distanceTo(target).toFixed(0)} m`);
        });
    }

    private teleportToMissionTarget() {
        this.missionTargetsRefreshedAt = 0;
        // destinations first, then the nearest target you are not already standing at
        const [target] = this.getCachedMissionTargets()
            .map((candidate) => ({ candidate, distance: this.distanceTo(candidate) }))
            .filter(({ distance }) => distance > MIN_TARGET_DISTANCE)
            .sort((a, b) => Number(b.candidate.isDestination) - Number(a.candidate.isDestination) || a.distance - b.distance);

        if (!target) {
            showTextBox('No mission destination or target found');
            return;
        }
        this.teleportToGround(target.candidate);
        showTextBox(`Teleported to ${target.candidate.name}`);
    }

    private fixGroundAfterTeleport() {
        if (!this.pendingGroundFix) {
            return;
        }
        const { x, y, fromZ, since, heading, launchSpeed } = this.pendingGroundFix;
        const elapsed = Date.now() - since;

        if (elapsed < GROUND_FIX_DELAY) {
            return;
        }
        const groundZ = World.GetGroundZFor3DCoord(x, y, fromZ);

        if (groundZ > 0) {
            teleport(this.playerChar, { x, y, z: groundZ + 1 }, heading);

            if (launchSpeed) {
                this.playerChar.getCurrentCar()?.setForwardSpeed?.(launchSpeed);
            }
        }
        if (groundZ > 0 || elapsed > GROUND_FIX_TIMEOUT) {
            this.pendingGroundFix = undefined;
        }
    }

    private renderPickupLocations({ name, locations, collectedCount, hint }: Location) {
        const remaining = this.getRemainingPickups(name, locations);
        // nothing detected: either everything is collected or the check is not supported, so offer all of them
        const isStatusKnown = remaining.length > 0;
        const shownLocations = isStatusKnown ? remaining : locations;
        const collected = collectedCount ? collectedCount() : locations.length - remaining.length;
        const status = collectedCount || isStatusKnown ? `${collected}/${locations.length} collected` : `${locations.length}`;

        if (!ImGui.CollapsingHeader(`${name} (${status})###pickups-${name}`)) {
            return;
        }

        if (hint) {
            ImGui.TextWrapped(hint);
        }
        if (!isStatusKnown) {
            ImGui.TextWrapped('No uncollected pickups detected - showing all locations.');
        }

        if (ImGui.Button(`Teleport to nearest##${name}`, 260, 45)) {
            this.teleportTo(this.findNearest(shownLocations));
        }

        shownLocations.forEach((location) => {
            if (ImGui.Selectable(`${location.name}##${name}`, false)) {
                this.teleportTo(location);
            }
        });
    }

    private getRemainingPickups(category: string, locations: LocationPoint[]): LocationPoint[] {
        const cache = this.pickupCache[category];

        if (cache && Date.now() - cache.refreshedAt < PICKUP_REFRESH_INTERVAL) {
            return cache.remaining;
        }

        // pickup categories only exist in games with IS_ANY_PICKUP_AT_COORDS (not GTA III DE)
        const world = World as unknown as { IsAnyPickupAtCoords: (x: number, y: number, z: number) => boolean };
        const remaining = locations.filter(({ x, y, z }) => world.IsAnyPickupAtCoords(x, y, z));
        this.pickupCache[category] = { remaining, refreshedAt: Date.now() };

        return remaining;
    }

    private findNearest(locations: LocationPoint[]): LocationPoint | undefined {
        const { x, y } = getPos(this.playerChar);
        let nearest: LocationPoint | undefined;
        let nearestDistance = Infinity;

        for (const location of locations) {
            const distance = (location.x - x) ** 2 + (location.y - y) ** 2;

            if (distance < nearestDistance) {
                nearest = location;
                nearestDistance = distance;
            }
        }

        return nearest;
    }

    private teleportTo(location: (Vector3 & { heading?: number }) | undefined, option?: Location) {
        if (!location) {
            return;
        }
        this.lastPosition = getPos(this.playerChar);
        this.pendingGroundFix = undefined;
        teleport(this.playerChar, location, location.heading);

        if (option?.groundFix) {
            this.pendingGroundFix = {
                x: location.x,
                y: location.y,
                fromZ: location.z,
                since: Date.now(),
                heading: location.heading,
                launchSpeed: option.launchSpeed,
            };
        }
        // refresh collected state right after the pickup is (likely) taken
        this.pickupCache = {};
    }

    updateGameState() {
        this.fixGroundAfterTeleport();

        if (this.getWaypoint && isShortcutPressed('teleport-waypoint', KeyCode.F6)) {
            this.teleportToWaypoint();
        }

        if (this.getMissionTargets && isShortcutPressed('teleport-mission-target', KeyCode.F7)) {
            this.teleportToMissionTarget();
        }

        if (isShortcutPressed('teleport-save', KeyCode.Ctrl, KeyCode.S)) {
            this.savedPosition = getPos(this.playerChar);
            showTextBox(`Position saved`);
        }

        if (isShortcutPressed('teleport-to-saved', KeyCode.Ctrl, KeyCode.T) && this.savedPosition) {
            this.teleportTo(this.savedPosition);
            showTextBox(`Teleported to saved position`);
        }

        if (isShortcutPressed('teleport-back', KeyCode.Ctrl, KeyCode.Z) && this.lastPosition) {
            this.pendingGroundFix = undefined;
            teleport(this.playerChar, this.lastPosition);
            showTextBox(`Teleported to previous position`);
        }

        if (isShortcutPressed('teleport-save-named', KeyCode.Ctrl, KeyCode.R) && !Pad.IsKeyPressed(KeyCode.Space)) {
            this.inputName = "";
            this.isSaveWindowOpen = !this.isSaveWindowOpen;
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
