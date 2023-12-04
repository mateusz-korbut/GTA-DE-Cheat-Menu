/// <reference path='../../../.config/sa.d.ts' />
import { ModSlot } from '../../../.config/enums';
import { ButtonConfig, CarAvailableMods, CarOption } from '../../models/index';
import { loadModel } from '../../functions/index';

import { MOD_REMOVED, NOT_REMOVABLE_MODS, WARN_COLOR } from '../../data/index';
import CAR_SUPPORTED_MODS from '../../data/car/supported-mods.json';
import CAR_MODS from '../../data/car/mods.json';

export class CarModMenu {
    private mods!: CarAvailableMods;

    get modsAvailable(): boolean {
        return Object.keys(this.mods).length > 0;
    }

    constructor(carId: number) {
        this.mods = this.getCarSupportedMods(carId);
    }

    renderCarModList(car: Car, buttonConfig: ButtonConfig) {
        if (!this.modsAvailable || !ImGui.CollapsingHeader('Mods')) {
            return;
        }

        Object.entries(this.mods).forEach(([partName, mods]) => {
            const currentModId = car.getCurrentMod(ModSlot[partName]);

            if (NOT_REMOVABLE_MODS.includes(partName)) {
                return this.renderNotRemovableModMenu(car, partName, mods, currentModId, buttonConfig);
            }

            this.renderModMenu(car, partName, mods, currentModId);
        });
    }

    private renderNotRemovableModMenu(
        car: Car,
        partName: string,
        mods: CarOption[],
        currentModId: number,
        buttonConfig: ButtonConfig,
    ) {
        if (!ImGui.CollapsingHeader(partName) || currentModId !== MOD_REMOVED) {
            return;
        }

        ImGui.TextColored(`Once ${ partName } is installed it cannot be removed!`, WARN_COLOR.r, WARN_COLOR.g, WARN_COLOR.b, WARN_COLOR.a);

        if (ImGui.Button(`Add ${ partName }`, buttonConfig.width, buttonConfig.height)) {
            const modId = mods[0].id;
            this.addMod(car, modId);
        }
    }

    private renderModMenu(
        car: Car,
        partName: string,
        mods: CarOption[],
        currentModId: number,
    ) {
        const newModId = mods[ImGui.ComboBox(
            partName,
            mods.map(({ name }) => name).join(','),
            mods.findIndex(({ id }) => id === currentModId),
        )]?.id;

        if (!newModId || newModId === currentModId) {
            return;
        }

        if (newModId === MOD_REMOVED) {
            car.removeMod(currentModId);
            return;
        }

        this.addMod(car, newModId);
    }

    private addMod(car: Car, modId: number) {
        loadModel(modId);
        car.addMod(modId);
    }

    private getCarSupportedMods(carId: number): CarAvailableMods {
        return CAR_SUPPORTED_MODS[carId.toString()]?.reduce((supportedMods: CarAvailableMods, modId: number) => {
            const { slot, name } = CAR_MODS[modId];
            const modOption = { id: modId, name };

            if (supportedMods[slot]) {
                supportedMods[slot].push(modOption);

                return supportedMods;
            }

            supportedMods[slot] = [modOption];

            if (!NOT_REMOVABLE_MODS.includes(slot)) {
                supportedMods[slot].unshift({ id: MOD_REMOVED, name: 'Not installed' });
            }

            return supportedMods;
        }, {}) || {};
    }
}
