/// <reference path='../../.config/sa.d.ts' />
import {
    DensitySubMenu,
    renderClockMenu,
    renderWeatherList,
    WeatherId, WeatherType
} from '../sub-menus/world/index';

import { Tab } from './tab';

export class WorldTab extends Tab {
    private weatherType: WeatherId = null;
    private densitySubMenu = new DensitySubMenu();

    constructor(private readonly weatherTypes: WeatherType) {
        super();
    }

    renderTabUI() {
        renderClockMenu();
        this.weatherType = renderWeatherList(this.weatherTypes, this.weatherType);
        this.densitySubMenu.renderDensityMenu();
    }

    updateGameState() {
        if (this.weatherType !== null) {
            Weather.Force(this.weatherType);
        }
    }
}
