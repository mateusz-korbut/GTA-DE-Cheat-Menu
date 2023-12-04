/// <reference path='../../../.config/sa.d.ts' />
const DENSITY = {
    min: 0,
    max: 2,
};

export class DensitySubMenu {
    private pedDensity: number = 1;
    private carDensity: number = 1;

    renderDensityMenu() {
        if (!ImGui.CollapsingHeader('Density')) {
            return;
        }
        const newPedDensity = this.renderDensitySubMenu('Ped density', this.pedDensity);
        const newCarDensity = this.renderDensitySubMenu('Car density', this.carDensity);

        if (this.pedDensity !== newPedDensity) {
            this.pedDensity = newPedDensity;
            World.SetPedDensityMultiplier(newPedDensity);
        }
        if (this.carDensity !== newCarDensity) {
            this.carDensity = newCarDensity;
            World.SetCarDensityMultiplier(newCarDensity);
        }
    }

    private renderDensitySubMenu(label: string, density: number) {
        return ImGui.SliderFloat(label, density, DENSITY.min, DENSITY.max);
    }
}
