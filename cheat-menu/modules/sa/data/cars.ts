import AIR_CRAFTS from './car/ids/aircraft.json'
import BIKES from './car/ids/bikes.json'
import BOATS from './car/ids/boats.json'
import COUPES from './car/ids/coupes.json'
import INDUSTRIALS from './car/ids/industrials.json'
import LOW_RIDERS from './car/ids/lowriders.json'
import MISCELLANEOUS from './car/ids/miscellaneous.json'
import PUBLIC_SERVICE from './car/ids/public-service.json'
import SEDANS from './car/ids/sedans.json'
import SPORTS from './car/ids/sports.json'
import TRUCKS from './car/ids/trucks.json'
import TUNERS from './car/ids/tuners.json'
import VANS from './car/ids/vans.json'

import { CarCategory } from '../../../models/index';

export const MOD_REMOVED = -1;

export const NOT_REMOVABLE_MODS = ['Hydraulics'];

export const CAR_CATEGORIES: CarCategory[] = [
    {
        name: 'Sports',
        list: SPORTS,
    },
    {
        name: 'Aircraft',
        list: AIR_CRAFTS
    },
    {
        name: 'Bikes',
        list: BIKES,
    },
    {
        name: 'Public service',
        list: PUBLIC_SERVICE,
    },
    {
        name: 'Tuners',
        list: TUNERS,
    },
    {
        name: 'Low riders',
        list: LOW_RIDERS,
    },
    {
        name: 'Boats',
        list: BOATS,
    },
    {
        name: 'Coupes',
        list: COUPES,
    },
    {
        name: 'Industrials',
        list: INDUSTRIALS,
    },
    {
        name: 'Sedans',
        list: SEDANS,
    },
    {
        name: 'Trucks',
        list: TRUCKS,
    },
    {
        name: 'Vans',
        list: VANS,
    },
    {
        name: 'Miscellaneous',
        list: MISCELLANEOUS,
    },
]
