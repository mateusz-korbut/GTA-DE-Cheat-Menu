import { KeyCode, ImGuiCond } from '../.config/enums';
import { CONFIG_PATH } from './config';
import { isShortcutPressed } from './functions/index';

import { Tab } from './tabs/tab';

type Tabs = { name: string, tab: Tab }[];

const CONFIG_SECTION = 'GUI';
const INSTANCE_SECTION = 'RUNTIME';
const INSTANCE_KEY = 'INSTANCE';
const INSTANCE_CHECK_INTERVAL = 500;
const GUI_CONFIG = {
    width: IniFile.ReadInt(CONFIG_PATH, CONFIG_SECTION, 'WIDTH') ?? 720,
    height: IniFile.ReadInt( CONFIG_PATH, CONFIG_SECTION, 'HEIGHT') ?? 1280,
    noTitleBar: false,
    noResize: false,
    noMove: false,
    autoResize: false,
    show: false,
}

export const renderGui = (tabs: Tabs) => {
    const tabNames = tabs.map(({ name }) => name).join(',');
    // a newer menu instance (respawn via Ctrl+Space+R or a hot reload of the scripts) replaces this one;
    // CLEO events need async scripts, so the latest instance id is kept in the config file instead
    const instanceId = `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    IniFile.WriteString(instanceId, CONFIG_PATH, INSTANCE_SECTION, INSTANCE_KEY);
    let lastInstanceCheck = Date.now();

    // FIXME asyncAwait freeze script after a while
    while (true) {
        // @Note without it script is terminated
        // https://re.cleo.li/docs/en/script-lifecycle.html
        wait(0);

        if (Date.now() - lastInstanceCheck >= INSTANCE_CHECK_INTERVAL) {
            lastInstanceCheck = Date.now();

            const owner = IniFile.ReadString(CONFIG_PATH, INSTANCE_SECTION, INSTANCE_KEY);

            if (owner && owner !== instanceId) {
                break;
            }
        }

        if (isShortcutPressed('gui-toggle', KeyCode.F1)) {
            GUI_CONFIG.show = !GUI_CONFIG.show;
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
            ImGui.End();
        }

        tabs.forEach(({ tab }) => tab.updateGameState());

        ImGui.EndFrame();
    }

    ImGui.BeginFrame('mk-gui');
    ImGui.SetCursorVisible(false);
    ImGui.EndFrame();
}
