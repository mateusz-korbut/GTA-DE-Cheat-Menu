/// <reference path='../../../.config/gta3.d.ts' />
import { WeatherType } from '../../../.config/enums';
import { IIIPlayer } from './models/index';

import { CheatsTab, MainTab, TeleportTab, WorldTab } from '../../tabs/index';
import { Tab } from '../../tabs/tab';
import { IIICarTab, IIIWeaponTab } from './tabs/index';

import CAR_LIST from './data/car/ids/all.json';
import CAR_COLORS from './data/car/colors.json'
import { CAR_CATEGORIES, TELEPORT_OPTIONS } from './data/index';
import { renderGui } from '../../gui';

export const getIIITabs = (): { name: string, tab: Tab }[] => {
    const player = new IIIPlayer(new Player(0));
    const playerChar = player.getChar();

    return [
        { name: 'Main', tab: new MainTab(player, playerChar) },
        { name: 'Weapons', tab: new IIIWeaponTab(player, playerChar) },
        { name: 'Car', tab: new IIICarTab(player, playerChar, CAR_LIST, CAR_CATEGORIES, CAR_COLORS) },
        { name: 'Teleport', tab: new TeleportTab(player, playerChar, TELEPORT_OPTIONS) },
        { name: 'World', tab: new WorldTab(WeatherType) },
        { name: 'Cheats', tab: new CheatsTab(player, playerChar) },
    ];
}

renderGui(getIIITabs());
