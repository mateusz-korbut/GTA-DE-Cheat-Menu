/// <reference path='../.config/sa.d.ts' />
import { KeyCode, ImGuiCond } from '../.config/enums';

import { CarTab, CheatsTab, MainTab, StatisticsTab, TeleportTab, WeaponTab, WorldTab } from './tabs/index';
import { Tab } from './tabs/tab';

const USER_INPUT_DELAY = 250;

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

const GUI_CONFIG = {
    width: 720,
    height: 1280,
    noTitleBar: false,
    noResize: false,
    noMove: false,
    autoResize: false,
    show: false,
}

export const renderGui = async () => {
    while (true) {
        // @Note without it script is terminated
        // https://re.cleo.li/docs/en/script-lifecycle.html
        await asyncWait(0);

        if (Pad.IsKeyPressed(KeyCode.F1)) {
            GUI_CONFIG.show = !GUI_CONFIG.show;
            await asyncWait(USER_INPUT_DELAY);
        }

        ImGui.BeginFrame('mk-gui');
        ImGui.SetCursorVisible(GUI_CONFIG.show);

        if (GUI_CONFIG.show) {
            ImGui.SetNextWindowSize(GUI_CONFIG.width, GUI_CONFIG.height, ImGuiCond.FirstUseEver);
            ImGui.Begin(
                '[MK] GTA: SA - Definitive Edition',
                GUI_CONFIG.show,
                GUI_CONFIG.noTitleBar,
                GUI_CONFIG.noResize,
                GUI_CONFIG.noMove,
                GUI_CONFIG.autoResize
            );

            const selectedTab = ImGui.Tabs('TabBar', TAB_NAMES);
            TABS[selectedTab]?.tab.renderTabUI();
        }

        ImGui.End();
        ImGui.EndFrame();
    }
}
