import { KeyCode } from './.config/enums';
import { isShortcutPressed } from './cheat-menu/functions/keys';

const USER_INPUT_DEBOUNCE = 50;

while (true) {
    wait(USER_INPUT_DEBOUNCE);

    if (isShortcutPressed('menu-respawn', KeyCode.Ctrl, KeyCode.Space, KeyCode.R)) {
        // the new menu instance takes over and the running one exits by itself
        CLEO.runScript('./cheat-menu/index.ts');

        showTextBox('Cheat menu started');
    }
}
