/// <reference path='../../../.config/sa.d.ts' />
import { WeatherType } from '../../../.config/enums';
import { SAPlayer } from './models/index';

import { MainTab, TeleportTab, WeaponTab, WorldTab } from '../../tabs/index';
import { renderGui } from '../../gui';

import { SaCarTab, SaCheatsTab, StatisticsTab } from './tabs/index';

import CAR_LIST from './data/car/ids/all.json'
import CAR_COLORS from './data/car/colors.json'
import { CAR_CATEGORIES, TELEPORT_OPTIONS, WEAPON_CATEGORIES } from './data/index';

export const getSATabs = () => {
    const player = new SAPlayer(new Player(0));
    const playerChar = player.getChar();

    return [
        { name: 'Main', tab: new MainTab(player, playerChar) },
        { name: 'Weapons', tab: new WeaponTab(player, playerChar, WEAPON_CATEGORIES) },
        { name: 'Car', tab: new SaCarTab(player, playerChar, CAR_LIST, CAR_CATEGORIES, CAR_COLORS) },
        { name: 'Teleport', tab: new TeleportTab(player, playerChar, TELEPORT_OPTIONS) },
        { name: 'Statistics', tab: new StatisticsTab() },
        { name: 'World', tab: new WorldTab(WeatherType) },
        { name: 'Cheats', tab: new SaCheatsTab(player, playerChar) },
    ];
}

renderGui(getSATabs())
