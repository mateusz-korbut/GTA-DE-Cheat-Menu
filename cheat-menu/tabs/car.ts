import { ButtonConfig, CarCategory, CarOption, Color, MenuCar, MenuChar, MenuPlayer } from '../models/index';
import { loadModel } from '../functions/index';

import { CarColorMenu, renderCarList } from '../sub-menus/index';
import { PlayerTab } from './tab';

export abstract class CarTab extends PlayerTab {
    protected playerPos!: Vector3;
    protected currentCarInvincible = false;
    protected lastSpawnedCar?: MenuCar;
    protected currentCarId?: number;
    protected currentCar?: MenuCar;

    protected carColorMenu?: CarColorMenu;

    protected readonly MOD_BUTTON_SIZE: ButtonConfig = {
        width: 200,
        height: 45,
    };

    constructor(
        player: MenuPlayer,
        char: MenuChar,
        private readonly carList: CarOption[],
        private readonly carCategories: CarCategory[],
        private readonly carColors: Color[],
    ) {
        super(player, char);
    }

    protected abstract renderMainActions(): void;

    protected abstract createCar(modelId: number): MenuCar;

    renderTabUI() {
        this.playerPos = this.playerChar.getPositionInFrontOfChar();
        this.currentCar = this.playerChar.getCurrentCar();

        this.renderMainActions();

        if (ImGui.CollapsingHeader('Car Spawner')) {
            const carId = renderCarList(this.carList, this.carCategories);

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

    protected spawnCar(modelId: number) {
        loadModel(modelId);

        this.lastSpawnedCar?.delete();

        this.currentCar = this.createCar(modelId);
        this.currentCar.unlockDoors()
            .makeInvincible()
            .markAsNoLongerNeeded();
        this.currentCarInvincible = true;
        this.lastSpawnedCar = this.currentCar;

        Streaming.MarkModelAsNoLongerNeeded(modelId);
    }

    protected renderCurrentCarActions(car: MenuCar) {
        const carId = car.getModel();
        if (this.currentCarId !== carId) {
            this.initializeCache(carId);
        }

        if (ImGui.Button('Repair', this.MOD_BUTTON_SIZE.width, this.MOD_BUTTON_SIZE.height)) {
            showTextBox('Car Repaired');
            car.fix();
        }

        this.currentCarInvincible = ImGui.Checkbox('Invincible', this.currentCarInvincible);
        if (this.currentCarInvincible) {
            car.makeInvincible();
        }

        this.carColorMenu?.renderCarColorPickers(car);
    }

    protected initializeCache(carId: number) {
        this.currentCarInvincible = false;
        this.currentCarId = carId;
        this.carColorMenu = new CarColorMenu(this.carColors);
    }

    protected clearCache() {
        this.currentCarInvincible = false;
        this.currentCarId = null;
        this.carColorMenu = null;
    }
}
