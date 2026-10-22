/// <reference path='../../../../.config/vc.d.ts' />
import { getLoadedMissionName, isMemoryFeatureSupported, readGlobal, writeGlobal } from './script-space';

// ICECRE1 (DE): sales counter; "more than 49" is checked when the mission ends (leaving or losing the van)
const ICE_CREAM_SALES = 33644;
const ICE_CREAM_TARGET = 50;
// "player is on a mission" global, set by ICECRE1 (and every mission script) when it starts
const ON_MISSION = 2472;

// completion flags and counters in the DE main.scm, taken from the DE mission scripts (AMBULAN, COPCAR, FIRETRU, TAXI)
const PARAMEDIC_DONE = 7972;
const VIGILANTE_DONE = 7976;
const FIREFIGHTER_DONE = 7980;
const TAXI_DONE = 2720;
const TAXI_FARES = 2704;
const FINAL_LEVEL = 12;
const TAXI_FARES_TARGET = 100;

export interface SideMission {
    name: string;
    reward: string;
    isDone: () => boolean;
    // replays what the mission script does when its last level is passed
    complete: () => void;
}

const player = () => new Player(0);

export const SIDE_MISSIONS: SideMission[] = [
    {
        name: 'Paramedic',
        reward: 'infinite sprint, $25,000',
        isDone: () => readGlobal(PARAMEDIC_DONE) !== 0,
        complete: () => {
            Stat.RegisterAmbulanceLevel(FINAL_LEVEL);
            player().addScore(25000).setNeverGetsTired(true);
            Stat.PlayerMadeProgress(1);
            Stat.RegisterOddjobMissionPassed();
            writeGlobal(PARAMEDIC_DONE, 1);
        },
    },
    {
        name: 'Firefighter',
        reward: 'fireproof',
        isDone: () => readGlobal(FIREFIGHTER_DONE) !== 0,
        complete: () => {
            player().makeFireProof(true);
            Stat.PlayerMadeProgress(1);
            Stat.RegisterOddjobMissionPassed();
            writeGlobal(FIREFIGHTER_DONE, 1);
            Stat.RegisterFireLevel(FINAL_LEVEL);
        },
    },
    {
        name: 'Vigilante',
        reward: '+50 max armour (150)',
        isDone: () => readGlobal(VIGILANTE_DONE) !== 0,
        complete: () => {
            Stat.PlayerMadeProgress(1);
            player().increaseMaxArmor(50).addArmour(150);
            Stat.RegisterOddjobMissionPassed();
            writeGlobal(VIGILANTE_DONE, 1);
        },
    },
    {
        name: 'Taxi Driver',
        reward: 'taxis with nitro and jump, $10,000',
        isDone: () => readGlobal(TAXI_DONE) !== 0,
        complete: () => {
            Stat.RegisterMissionGiven();
            Stat.RegisterOddjobMissionPassed();
            Game.SetAllTaxisHaveNitro(true);
            Stat.PlayerMadeProgress(1);
            writeGlobal(TAXI_DONE, 1);
            writeGlobal(TAXI_FARES, Math.max(readGlobal(TAXI_FARES), TAXI_FARES_TARGET));
            player().addScore(10000);
        },
    },
];

export const completeIceCreamSales = (): string => {
    if (!isMemoryFeatureSupported()) {
        return 'Not supported on this game version';
    }
    if (getLoadedMissionName() !== 'ICECRE1' || readGlobal(ON_MISSION) !== 1) {
        return 'Start the ice cream mission first (Mr. Whoopee van)';
    }
    writeGlobal(ICE_CREAM_SALES, ICE_CREAM_TARGET);

    return `${ICE_CREAM_TARGET} sales set - leave the van to complete Cherry Popper`;
}
