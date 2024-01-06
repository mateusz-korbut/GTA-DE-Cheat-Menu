import { MenuChar } from './char';

export abstract class MenuPlayer {
    abstract getChar(): MenuChar;

    abstract alterWantedLevel(newWantedLevel: number): MenuPlayer;

    abstract addMoney(money: number): MenuPlayer;

    abstract setNeverGetsTired(isNeverTired: boolean): MenuPlayer;
}
