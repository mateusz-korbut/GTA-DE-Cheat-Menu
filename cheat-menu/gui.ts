import { KeyCode, ImGuiCond } from '../.config/enums';
import { Events } from './data/index';

import { Tab } from './tabs/tab';

type Tabs = { name: string, tab: Tab }[];

const USER_INPUT_DELAY = 250;
const GUI_CONFIG = {
    width: 720,
    height: 1280,
    noTitleBar: false,
    noResize: false,
    noMove: false,
    autoResize: false,
    show: false,
}

export const renderGui = (tabs: Tabs) => {
    const tabNames = tabs.map(({ name }) => name).join(',');

    addEventListener(Events.NewCheatMenuCreated, () => exit('CheatMenu script reloaded'));

    // FIXME asyncAwait freeze script after a while
    while (true) {
        // @Note without it script is terminated
        // https://re.cleo.li/docs/en/script-lifecycle.html
        wait(0);

        if (Pad.IsKeyPressed(KeyCode.F1)) {
            GUI_CONFIG.show = !GUI_CONFIG.show;
            wait(USER_INPUT_DELAY);
        }

        ImGui.BeginFrame('mk-gui');
        ImGui.SetCursorVisible(GUI_CONFIG.show);

        if (GUI_CONFIG.show) {
            ImGui.SetNextWindowSize(GUI_CONFIG.width, GUI_CONFIG.height, ImGuiCond.FirstUseEver);
            ImGui.Begin(
                '[MK] GTA Definitive Edition',
                GUI_CONFIG.show,
                GUI_CONFIG.noTitleBar,
                GUI_CONFIG.noResize,
                GUI_CONFIG.noMove,
                GUI_CONFIG.autoResize
            );

            const selectedTab = ImGui.Tabs('TabBar', tabNames);
            tabs[selectedTab]?.tab.renderTabUI();
        }

        tabs.forEach(({ tab }) => tab.updateGameState());

        ImGui.End();
        ImGui.EndFrame();
    }
}
