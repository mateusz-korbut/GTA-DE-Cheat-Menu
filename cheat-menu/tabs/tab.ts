import { Events } from '../data/events';

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
    abstract updateGameState(): void | Promise<void>;
}

export abstract class PlayerTab extends Tab {
    constructor(
        protected readonly player: Player,
        protected readonly playerChar: Char) {
        super();
    }
}
