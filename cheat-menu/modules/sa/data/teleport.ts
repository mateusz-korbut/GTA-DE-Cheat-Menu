import ASSETS_LOCATIONS from './teleports/assets.json';
import BARBERS_LOCATIONS from './teleports/barbers.json';
import CLOTHING_SHOPS_LOCATIONS from './teleports/clothing-shops.json';
import GIRLFRIENDS_LOCATIONS from './teleports/girlfriends.json';
import GYM_LOCATIONS from './teleports/gyms.json';
import RACES_LOCATIONS from './teleports/races.json';
import SAFE_HOUSES_LOCATIONS from './teleports/safe-houses.json';
import SCHOOLS_LOCATIONS from './teleports/schools.json';
import TATTOOS_LOCATIONS from './teleports/tattoos.json';

import { Location } from '../../../models/index';

export const TELEPORT_OPTIONS: Location[] = [
    {
        name: 'Girlfriends',
        locations: GIRLFRIENDS_LOCATIONS,
    },
    {
        name: 'Safe houses',
        locations: SAFE_HOUSES_LOCATIONS,
    },
    {
        name: 'Assets',
        locations: ASSETS_LOCATIONS,
    },
    {
        name: 'Clothing shops',
        locations: CLOTHING_SHOPS_LOCATIONS,
    },
    {
        name: 'Races',
        locations: RACES_LOCATIONS,
    },
    {
        name: 'Gyms',
        locations: GYM_LOCATIONS,
    },
    {
        name: 'Schools',
        locations: SCHOOLS_LOCATIONS,
    },
    {
        name: 'Barbers',
        locations: BARBERS_LOCATIONS,
    },
    {
        name: 'Tattoos',
        locations: TATTOOS_LOCATIONS,
    },
];
