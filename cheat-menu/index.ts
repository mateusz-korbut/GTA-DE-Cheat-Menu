/// <reference path='../.config/sa.d.ts' />

import { Events } from './data/events';

import { renderGui } from './gui';

const updateGameState = async () => {
    const FRAME_DELAY = 1000;

    while (true) {
        await asyncWait(FRAME_DELAY);
        dispatchEvent<void>(Events.NewGameFrame);
    }
}

(async () => {
    updateGameState();
    renderGui();
})();
