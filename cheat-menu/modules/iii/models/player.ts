/// <reference path='../../../../.config/sa.d.ts' />
import { MenuPlayer } from '../../../models/index';

import { IIIChar } from './char';

export class IIIPlayer extends MenuPlayer {
    constructor(private readonly player: Player) {
        super();
    }

    getChar() {
        return new IIIChar(this.player.getChar());
    }

    alterWantedLevel(newWantedLevel: number) {
        this.player.alterWantedLevel(newWantedLevel);
        return this;
    }

    addMoney(money: number) {
        this.player.addScore(money);

        return this;
    }

    setNeverGetsTired(isNeverTired: boolean) {
        this.player.setNeverGetsTired(isNeverTired);
        return this;
    }
}
