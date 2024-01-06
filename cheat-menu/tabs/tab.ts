import { Events } from '../data/events';
import { MenuChar, MenuPlayer } from '../models/index';

export abstract class Tab {
    constructor() {
        addEventListener(
            Events.NewGameFrame,
            () => this.updateGameState(),
        );
    }
    /*
    * This method is called when the tab is open and is responsible for generating the tab's UI layout
    * */
    abstract renderTabUI();

    /*
    * It is called once per game frame, allowing you to execute any necessary logic or updates game logic.
    * */
    abstract updateGameState();
}

export abstract class PlayerTab extends Tab {
    constructor(
        protected readonly player: MenuPlayer,
        protected readonly playerChar: MenuChar) {
        super();
    }
}
