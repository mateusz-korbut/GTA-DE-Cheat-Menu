import { getBoolean, saveBoolean } from '../../functions/index';

const SECTION = 'MAIN';

export class MainOptions {
    private _isInfiniteHealthChecked = getBoolean(SECTION, 'INFINITE_HEALTH');
    private _isInfiniteAmmoChecked = getBoolean(SECTION, 'INFINITE_AMMO');
    private _isNeverTired = getBoolean(SECTION, 'NEVER_TIRED');
    private _isWantedLevelFrozen = getBoolean(SECTION, 'WANTED_LEVEL_FROZEN');
    private _isMissionTimerFrozen = getBoolean(SECTION, 'MISSION_TIMER_FROZEN');

    private set isInfiniteHealthChecked(value: boolean) {
        if (this._isInfiniteHealthChecked === value) return;

        this._isInfiniteHealthChecked = value;
        saveBoolean(SECTION, 'INFINITE_HEALTH', value);
    }
    get isInfiniteHealthChecked(): boolean {
        return this._isInfiniteHealthChecked;
    }

    private set isInfiniteAmmoChecked(value: boolean) {
        if (this._isInfiniteAmmoChecked === value) return;

        this._isInfiniteAmmoChecked = value;
        saveBoolean(SECTION, 'INFINITE_AMMO', value);
    }
    get isInfiniteAmmoChecked(): boolean {
        return this._isInfiniteAmmoChecked;
    }

    private set isNeverTired(value: boolean) {
        if (this._isNeverTired === value) return;

        this._isNeverTired = value;
        saveBoolean(SECTION, 'NEVER_TIRED', value);
    }
    get isNeverTired(): boolean {
        return this._isNeverTired;
    }

    private set isWantedLevelFrozen(value: boolean) {
        if (this._isWantedLevelFrozen === value) return;

        this._isWantedLevelFrozen = value;
        saveBoolean(SECTION, 'WANTED_LEVEL_FROZEN', value);
    }
    get isWantedLevelFrozen(): boolean {
        return this._isWantedLevelFrozen;
    }

    private set isMissionTimerFrozen(value: boolean) {
        if (this._isMissionTimerFrozen === value) return;

        this._isMissionTimerFrozen = value;
        saveBoolean(SECTION, 'MISSION_TIMER_FROZEN', value);
    }
    get isMissionTimerFrozen(): boolean {
        return this._isMissionTimerFrozen;
    }

    renderMainOptions() {
        this.isInfiniteHealthChecked = ImGui.Checkbox('Infinite health', this.isInfiniteHealthChecked);
        this.isInfiniteAmmoChecked = ImGui.Checkbox('Infinite ammo', this.isInfiniteAmmoChecked);
        this.isNeverTired = ImGui.Checkbox('Never tired', this.isNeverTired);
        this.isWantedLevelFrozen = ImGui.Checkbox('Freeze wanted level', this.isWantedLevelFrozen);
        this.isMissionTimerFrozen = ImGui.Checkbox('Freeze mission timer', this.isMissionTimerFrozen);
    }
}
