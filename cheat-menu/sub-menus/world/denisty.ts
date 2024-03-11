import { CONFIG_PATH } from '../../index';

const SECTION = 'WORLD';
const DENSITY = {
    min: IniFile.ReadFloat(CONFIG_PATH, SECTION, 'MIN_DENSITY'),
    max: IniFile.ReadFloat(CONFIG_PATH, SECTION, 'MAX_DENSITY'),
};

export class DensitySubMenu {
    private pedDensity: number = IniFile.ReadFloat(CONFIG_PATH, SECTION, 'PED_DENSITY');
    private carDensity: number = IniFile.ReadFloat(CONFIG_PATH, SECTION, 'CAR_DENSITY');

    renderDensityMenu() {
        if (!ImGui.CollapsingHeader('Density')) {
            return;
        }
        const newPedDensity = this.renderDensitySubMenu('Ped density', this.pedDensity);
        const newCarDensity = this.renderDensitySubMenu('Car density', this.carDensity);

        if (this.pedDensity !== newPedDensity) {
            this.pedDensity = newPedDensity;
            World.SetPedDensityMultiplier(newPedDensity);
            IniFile.WriteFloat(newPedDensity, CONFIG_PATH, SECTION, 'PED_DENSITY');
        }
        if (this.carDensity !== newCarDensity) {
            this.carDensity = newCarDensity;
            World.SetCarDensityMultiplier(newCarDensity);
            IniFile.WriteFloat(newCarDensity, CONFIG_PATH, SECTION, 'CAR_DENSITY');
        }
    }

    private renderDensitySubMenu(label: string, density: number) {
        return ImGui.SliderFloat(label, density, DENSITY.min, DENSITY.max);
    }
}
