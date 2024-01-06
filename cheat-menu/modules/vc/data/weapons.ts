import { WeaponSlot, WeaponType } from '../../../../.config/enums';
import { WeaponCategory } from '../../../models/index';

import { INFINITE_MELEE_AMMO, INFINITE_WEAPON_AMMO } from '../../../data/index';

enum WeaponModel {
    Unarmed = -1,
    BrassKnuckles = 259,
    Screwdriver = 260,
    GolfClub = 261,
    NightStick = 262,
    Knife = 263,
    BaseballBat = 264,
    Hammer = 265,
    MeatCleaver = 266,
    Machete = 267,
    Katana = 268,
    Chainsaw = 269,
    Grenade = 270,
    RemoteGrenade = null,
    Teargas = 271,
    Molotov = 272,
    Pistol = 274,
    Python = 275,
    Shotgun = 277,
    SpazShotgun = 278,
    StubbyShotgun = 279,
    Tec9 = 281,
    Uzi = 282,
    Ingram = 283,
    MP5 = 284,
    M4 = 280,
    Ruger = 276,
    SniperRifle = 285,
    LaserSniper = 286,
    RPG = 287,
    FlameThrower = 288,
    M60 = 289,
    Minigun = 290,
    Camera = 292,
    Detonator = 291
}

export const WEAPON_CATEGORIES: WeaponCategory[] = [
    {
        id: WeaponSlot.Slot1,
        name: 'Hand',
        infiniteAmmo: INFINITE_MELEE_AMMO,
        options: [
            {
                id: WeaponType.Unarmed,
                weaponModel: WeaponModel.Unarmed,
                name: 'Unarmed',
            },
            {
                id: WeaponType.BrassKnuckles,
                weaponModel: WeaponModel.BrassKnuckles,
                name: 'Brass knuckles',
            },
        ],
    },
    {
        id: WeaponSlot.Slot2,
        name: 'Melee',
        infiniteAmmo: INFINITE_MELEE_AMMO,
        options: [
            {
                id: WeaponType.GolfClub,
                weaponModel: WeaponModel.GolfClub,
                name: 'Golf club',
            },
            {
                id: WeaponType.Screwdriver,
                weaponModel: WeaponModel.Screwdriver,
                name: 'Screwdriver',
            },
            {
                id: WeaponType.Hammer,
                weaponModel: WeaponModel.Hammer,
                name: 'Hammer',
            },
            {
                id: WeaponType.NightStick,
                weaponModel: WeaponModel.NightStick,
                name: 'Night stick',
            },
            {
                id: WeaponType.Knife,
                weaponModel: WeaponModel.Knife,
                name: 'Knife',
            },
            {
                id: WeaponType.BaseballBat,
                weaponModel: WeaponModel.BaseballBat,
                name: 'Baseball bat',
            },
            {
                id: WeaponType.Cleaver,
                weaponModel: WeaponModel.MeatCleaver,
                name: 'Meat Cleaver',
            },
            {
                id: WeaponType.Machete,
                weaponModel: WeaponModel.Machete,
                name: 'Machete',
            },
            {
                id: WeaponType.Katana,
                weaponModel: WeaponModel.Katana,
                name: 'Katana',
            },
            {
                id: WeaponType.Chainsaw,
                weaponModel: WeaponModel.Chainsaw,
                name: 'Chainsaw',
            },
        ],
    },
    {
        id: WeaponSlot.Slot4,
        name: 'Pistols',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Pistol,
                weaponModel: WeaponModel.Pistol,
                name: 'Pistol',
            },
            {
                id: WeaponType.Python,
                weaponModel: WeaponModel.Python,
                name: 'Python',
            },
        ],
    },
    {
        id: WeaponSlot.Slot5,
        name: 'Shotguns',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Shotgun,
                weaponModel: WeaponModel.Shotgun,
                name: 'Shotgun',
            },
            {
                id: WeaponType.Spas12,
                weaponModel: WeaponModel.SpazShotgun,
                name: 'Combat shotgun',
            },
            {
                id: WeaponType.Stubby,
                weaponModel: WeaponModel.StubbyShotgun,
                name: 'Stubby shotgun',
            },
        ],
    },
    {
        id: WeaponSlot.Slot6,
        name: 'Sub-Machine',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Tec9,
                weaponModel: WeaponModel.Tec9,
                name: 'Tec9',
            },
            {
                id: WeaponType.Uzi,
                weaponModel: WeaponModel.Uzi,
                name: 'Uzi',
            },
            {
                id: WeaponType.Ingram,
                weaponModel: WeaponModel.Ingram,
                name: 'Ingram',
            },
            {
                id: WeaponType.Mp5,
                weaponModel: WeaponModel.MP5,
                name: 'MP5',
            },
        ],
    },
    {
        id: WeaponSlot.Slot7,
        name: 'Assault Rifles',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Ruger,
                weaponModel: WeaponModel.Ruger,
                name: 'Ruger',
            },
            {
                id: WeaponType.M4,
                weaponModel: WeaponModel.M4,
                name: 'M4',
            },
        ],
    },
    {
        id: WeaponSlot.Slot9,
        name: 'Rifles',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Sniper,
                weaponModel: WeaponModel.SniperRifle,
                name: 'Sniper',
            },
            {
                id: WeaponType.Laserscope,
                weaponModel: WeaponModel.LaserSniper,
                name: 'Laser sniper',
            },
        ],
    },
    {
        id: WeaponSlot.Slot8,
        name: 'Heavy Weapons',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.RocketLauncher,
                weaponModel: WeaponModel.RPG,
                name: 'RPG',
            },
            {
                id: WeaponType.Flamethrower,
                weaponModel: WeaponModel.FlameThrower,
                name: 'Flamethrower',
            },
            {
                id: WeaponType.M60,
                weaponModel: WeaponModel.M60,
                name: 'M60',
            },
            {
                id: WeaponType.Minigun,
                weaponModel: WeaponModel.Minigun,
                name: 'Mini-gun',
            },
        ],
    },
    {
        id: WeaponSlot.Slot3,
        name: 'Explosives',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Grenade,
                weaponModel: WeaponModel.Grenade,
                name: 'Grenade',
            },
            {
                id: WeaponType.Teargas,
                weaponModel: WeaponModel.Teargas,
                name: 'Teargas',
            },
            {
                id: WeaponType.Molotov,
                weaponModel: WeaponModel.Molotov,
                name: 'Molotov',
            },
        ],
    },
];
