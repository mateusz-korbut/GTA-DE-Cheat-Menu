export interface Location {
    name: string;
    locations: ({ name: string, heading?: number } & Vector3)[];
    // locations are pickups (e.g. hidden packages): list only the ones still in the world
    pickups?: boolean;
    // the game's own counter of collected items, preferred over counting pickups
    collectedCount?: () => number;
    // put the player on the ground below the point once the destination collision is loaded
    groundFix?: boolean;
    // forward speed given to the player's vehicle after landing (e.g. a run-up for stunt jumps)
    launchSpeed?: number;
    hint?: string;
}

export interface MissionTarget extends Vector3 {
    name: string;
    // a place to go to (coordinate blip) rather than a car / person / object
    isDestination: boolean;
}
