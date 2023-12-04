/// <reference path='../.config/sa.d.ts' />
import { KeyCode, ImGuiCond } from '../.config/enums';

import { CarTab, CheatsTab, MainTab, StatisticsTab, TeleportTab, WeaponTab, WorldTab } from './tabs/index';
import { Tab } from './tabs/tab';

const PLAYER = new Player(0);
const PLAYER_CHAR = PLAYER.getChar();
const TABS: { name: string, tab: Tab }[] = [
    { name: 'Main', tab: new MainTab(PLAYER, PLAYER_CHAR) },
    { name: 'Weapons', tab: new WeaponTab(PLAYER, PLAYER_CHAR) },
    { name: 'Car', tab: new CarTab(PLAYER, PLAYER_CHAR) },
    { name: 'Teleport', tab: new TeleportTab(PLAYER, PLAYER_CHAR) },
    { name: 'Statistics', tab: new StatisticsTab() },
    { name: 'World', tab: new WorldTab() },
    { name: 'Cheats', tab: new CheatsTab(PLAYER, PLAYER_CHAR) },
];
const TAB_NAMES = TABS.map(({ name }) => name).join(',');

let showGui = false;

// FIXME asyncAwait freeze script after while
while (true) {
    // @Note without it script is terminated
    // https://re.cleo.li/docs/en/script-lifecycle.html
    wait(0);

    if (Pad.IsKeyPressed(KeyCode.F1)) {
        showGui = !showGui;
        wait(250);
    }

    ImGui.BeginFrame('mk-gui');
    ImGui.SetCursorVisible(showGui);

    if (showGui) {
        ImGui.SetNextWindowSize(720, 1280, ImGuiCond.FirstUseEver);
        ImGui.Begin('[MK] GTA: SA - Definitive Edition', showGui, false, false, false, false);

        const selectedTab = ImGui.Tabs('TabBar', TAB_NAMES);
        TABS[selectedTab]?.tab.renderTabUI();
    }

    TABS.forEach(({ tab }) => tab.updateGameState());

    ImGui.End();
    ImGui.EndFrame();
}
