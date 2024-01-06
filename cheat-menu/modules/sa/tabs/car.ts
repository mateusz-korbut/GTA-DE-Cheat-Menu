/// <reference path='../../../../.config/sa.d.ts' />
import { SaCar } from '../models/index';

import { CarModMenu, CarPaintJobMenu } from '../sub-menus/index';
import { CarTab } from '../../../tabs/index';

export class SaCarTab extends CarTab {
    protected currentCar: SaCar;
    private carModMenu?: CarModMenu;
    private carPaintJobMenu?: CarPaintJobMenu;

    protected renderMainActions() {
        if (ImGui.Button('Spawn Jetpack', this.MOD_BUTTON_SIZE.width, this.MOD_BUTTON_SIZE.height)) {
            showTextBox('Jetpack spawned');
            Pickup.Create(370, 4, this.playerPos.x, this.playerPos.y, this.playerPos.z);
        }
    }

    protected createCar(modelId: number) {
        return new SaCar(Car.Create(modelId, this.playerPos.x, this.playerPos.y, this.playerPos.z));
    }

    protected renderCurrentCarActions(car: SaCar) {
        super.renderCurrentCarActions(car);
        this.carModMenu?.renderCarModList(car, this.MOD_BUTTON_SIZE);
        this.carPaintJobMenu?.renderPaintJobList(car);
    }

    protected initializeCache(carId: number) {
        super.initializeCache(carId);
        this.carModMenu = new CarModMenu(carId);
        this.carPaintJobMenu = new CarPaintJobMenu(this.currentCar);
    }

    protected clearCache() {
        super.clearCache();
        this.carModMenu = null;
        this.carPaintJobMenu = null;
    }
}
