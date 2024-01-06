/// <reference path='../../../.config/vc.d.ts' />
import { WeatherType } from '../../../.config/enums';
import { VcPlayer } from './models/index';

import { MainTab, TeleportTab, WeaponTab, WorldTab } from '../../tabs/index';
import { VcCarTab, VcCheatsTab } from './tabs/index';
import { renderGui } from '../../gui';

import CAR_LIST from './data/car/ids/all.json'
import CAR_COLORS from './data/car/colors.json'
import { CAR_CATEGORIES, TELEPORT_OPTIONS, WEAPON_CATEGORIES } from './data/index';

export const getVCTabs = () => {
    const player = new VcPlayer(new Player(0));
    const playerChar = player.getChar();

    return [
        { name: 'Main', tab: new MainTab(player, playerChar) },
        { name: 'Weapons', tab: new WeaponTab(player, playerChar, WEAPON_CATEGORIES) },
        { name: 'Car', tab: new VcCarTab(player, playerChar, CAR_LIST, CAR_CATEGORIES, CAR_COLORS) },
        { name: 'Teleport', tab: new TeleportTab(player, playerChar, TELEPORT_OPTIONS) },
        { name: 'World', tab: new WorldTab(WeatherType) },
        { name: 'Cheats', tab: new VcCheatsTab(player, playerChar) },
    ];
}

renderGui(getVCTabs())
