/// <reference path='../../.config/sa.d.ts' />
import { CarLock } from '../../.config/enums';
import { ButtonConfig } from '../models/index';
import {
    addBlipTo,
    loadModel,
    getPositionInFrontOfChar,
    getCurrentCar,
    makeCarInvincible,
} from '../functions/index';

import { CarColorMenu, CarModMenu, CarPaintJobMenu, renderCarList } from '../sub-menus/index';
import { PlayerTab } from './tab';

const MOD_BUTTON_SIZE: ButtonConfig = {
    width: 200,
    height: 45,
};

export class CarTab extends PlayerTab {
    private playerPos!: Vector3;
    private currentCarInvincible = false;
    private lastSpawnedCar?: Car;
    private currentCarId?: number;
    private currentCar?: Car;

    private carModMenu?: CarModMenu;
    private carColorMenu?: CarColorMenu;
    private carPaintJobMenu?: CarPaintJobMenu;

    renderTabUI() {
        this.playerPos = getPositionInFrontOfChar(this.playerChar);
        this.currentCar = getCurrentCar(this.playerChar);

        this.renderMainActions();

        if (ImGui.CollapsingHeader('Car Spawner')) {
            const carId = renderCarList();

            if (carId) {
                this.spawnCar(carId);
            }
        }

        if (!this.currentCar) {
            return this.clearCache();
        }

        if (ImGui.CollapsingHeader('Current Car')) {
            this.renderCurrentCarActions(this.currentCar);
        }
    }

    updateGameState() {
    }

    private renderMainActions() {
        if (ImGui.Button('Spawn Jetpack', MOD_BUTTON_SIZE.width, MOD_BUTTON_SIZE.height)) {
            showTextBox('Jetpack spawned');
            const pickup = Pickup.Create(370, 4, this.playerPos.x, this.playerPos.y, this.playerPos.z);

            addBlipTo(pickup);
        }
    }

    private renderCurrentCarActions(car: Car) {
        const carId = car.getModel();
        this.initializeCache(carId);

        if (ImGui.Button('Repair', MOD_BUTTON_SIZE.width, MOD_BUTTON_SIZE.height)) {
            showTextBox('Car Repaired');
            car.fix();
        }

        this.currentCarInvincible = ImGui.Checkbox('Invincible', this.currentCarInvincible);
        if (this.currentCarInvincible) {
            makeCarInvincible(car);
        }

        this.carModMenu.renderCarModList(car, MOD_BUTTON_SIZE);
        this.carPaintJobMenu.renderPaintJobList(car);
        this.carColorMenu.renderCarColorPickers(car);

    }

    private async spawnCar(modelId: number) {
        await loadModel(modelId);

        this.lastSpawnedCar?.delete();

        this.currentCar = makeCarInvincible(
            Car.Create(modelId, this.playerPos.x, this.playerPos.y, this.playerPos.z)
                .lockDoors(CarLock.NotUsed)
                .markAsNoLongerNeeded(),
        );
        this.currentCarInvincible = true;
        this.lastSpawnedCar = this.currentCar;

        Streaming.MarkModelAsNoLongerNeeded(modelId);
        addBlipTo(this.currentCar);
    }

    private initializeCache(carId: number) {
        if (this.currentCarId === carId) {
            return;
        }

        this.currentCarInvincible = false;
        this.currentCarId = carId;
        this.carModMenu = new CarModMenu(carId);
        this.carColorMenu = new CarColorMenu();
        this.carPaintJobMenu = new CarPaintJobMenu(this.currentCar);
    }

    private clearCache() {
        this.currentCarInvincible = false;
        this.currentCarId = null;
        this.carModMenu = null;
        this.carColorMenu = null;
        this.carPaintJobMenu = null;
    }
}
