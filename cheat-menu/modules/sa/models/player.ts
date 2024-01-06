/// <reference path='../../../../.config/sa.d.ts' />
import { MenuChar, MenuPlayer } from '../../../models/index';

import { SaChar } from './char';

export class SAPlayer extends MenuPlayer {
    constructor(private readonly player: Player) {
        super();
    }

    getChar(): MenuChar {
        return new SaChar(this.player.getChar());
    }

    alterWantedLevel(wantedLevel: number) {
        this.player.alterWantedLevel(wantedLevel);

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
