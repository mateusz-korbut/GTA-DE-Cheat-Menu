import { KeyCode } from './.config/enums';
import { Events } from './cheat-menu/data/index';

const USER_INPUT_DEBOUNCE = 250;
const CHEAT_MENU_SPAWN_TIMEOUT = 2000;

while (true) {
    wait(USER_INPUT_DEBOUNCE);

    if (Pad.IsKeyPressed(KeyCode.Ctrl) && Pad.IsKeyPressed(KeyCode.Space) && Pad.IsKeyPressed(KeyCode.R)) {
        dispatchEvent(Events.NewCheatMenuCreated);
        wait(CHEAT_MENU_SPAWN_TIMEOUT);

        CLEO.runScript('./cheat-menu/index.ts');

        const message = 'Cheat menu started';
        FxtStore.insert('text', message);
        Text.PrintHelp('text');
        showTextBox(message);
    }
}
