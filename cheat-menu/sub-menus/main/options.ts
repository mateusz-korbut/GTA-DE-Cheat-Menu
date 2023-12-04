/// <reference path='../../../.config/sa.d.ts' />

export class MainOptions {
    private _isInfiniteHealthChecked = false;
    private _isNeverTired = false;
    private _isWantedLevelFrozen = false;
    private _isMissionTimerFrozen = false;

    get isInfiniteHealthChecked(): boolean {
        return this._isInfiniteHealthChecked;
    }

    get isNeverTired(): boolean {
        return this._isNeverTired;
    }

    get isWantedLevelFrozen(): boolean {
        return this._isWantedLevelFrozen;
    }

    get isMissionTimerFrozen(): boolean {
        return this._isMissionTimerFrozen;
    }

    renderMainOptions() {
        this._isInfiniteHealthChecked = ImGui.Checkbox('Infinite health', this.isInfiniteHealthChecked);
        this._isNeverTired = ImGui.Checkbox('Never tired', this.isNeverTired);
        this._isWantedLevelFrozen = ImGui.Checkbox('Freeze wanted level', this.isWantedLevelFrozen);
        this._isMissionTimerFrozen = ImGui.Checkbox('Freeze mission timer', this.isMissionTimerFrozen);
    }
}
