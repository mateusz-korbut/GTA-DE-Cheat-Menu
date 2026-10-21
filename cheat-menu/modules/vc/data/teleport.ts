/// <reference path='../../../../.config/vc.d.ts' />
import ASSETS_LOCATIONS from './teleports/assets.json';
import HIDDEN_PACKAGES_LOCATIONS from './teleports/hidden-packages.json';
import RAMPAGES_LOCATIONS from './teleports/rampages.json';
import SAFE_HOUSES_LOCATIONS from './teleports/safe-houses.json';
import STORE_ROBBERIES_LOCATIONS from './teleports/store-robberies.json';
import STUNT_JUMPS_LOCATIONS from './teleports/stunt-jumps.json';

// collectible coordinates come from the classic VC main.scm (same map in DE)
export const TELEPORT_OPTIONS = [
    {
        name: 'Safe houses',
        locations: SAFE_HOUSES_LOCATIONS,
    },
    {
        name: 'Assets',
        locations: ASSETS_LOCATIONS,
    },
    {
        name: 'Hidden packages',
        locations: HIDDEN_PACKAGES_LOCATIONS,
        pickups: true,
        collectedCount: () => Game.GetCollectablesCollected(),
    },
    {
        name: 'Rampages',
        locations: RAMPAGES_LOCATIONS,
        pickups: true,
    },
    {
        name: 'Unique stunt jumps',
        // 35 m before the jump, facing it; the direction comes from the jump camera, which sits on the landing side
        locations: STUNT_JUMPS_LOCATIONS,
        groundFix: true,
        launchSpeed: 20,
        hint: 'Puts you 35 m before the ramp, facing it, with a running start - keep accelerating (a car is needed).',
    },
    {
        name: 'Store robberies',
        locations: STORE_ROBBERIES_LOCATIONS,
    },
];
