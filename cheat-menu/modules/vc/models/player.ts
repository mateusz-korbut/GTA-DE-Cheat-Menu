/// <reference path='../../../../.config/vc.d.ts' />
import { MenuChar, MenuPlayer } from '../../../models/index';
import { VcChar } from './char';

export class VcPlayer extends MenuPlayer {
    constructor(private readonly player: Player) {
        super();
    }

    getChar(): MenuChar {
        return new VcChar(this.player.getChar());
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
