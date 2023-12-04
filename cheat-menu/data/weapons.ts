import { WeaponSlot, WeaponType } from '../../.config/enums';

export const INFINITE_MELEE_AMMO = 1;

export const INFINITE_WEAPON_AMMO = 9999;

enum WeaponModel {
    Unarmed = 0,
    BrassKnuckles = 331,
    GolfClub = 333,
    NightStick = 334,
    Knife = 335,
    BaseballBat = 336,
    Shovel = 337,
    PoolCue = 338,
    Katana = 339,
    Chainsaw = 341,
    Pistol = 346,
    PistolSilenced = 347,
    DesertEagle = 348,
    Shotgun = 349,
    Sawnoff = 350,
    Spas12 = 351,
    MicroUzi = 352,
    Mp5 = 353,
    Tec9 = 372,
    Ak47 = 355,
    M4 = 356,
    Rifle = 357,
    Sniper = 358,
    RocketLauncher = 359,
    RocketLauncherHs = 360,
    Flamethrower = 361,
    Minigun = 362,
    Grenade = 342,
    Teargas = 343,
    Molotov = 344,
    Satchel = 363,
    Detonator = 364,
    SprayCan = 365,
    Extinguisher = 366,
    Camera = 367,
    Dildo1 = 321,
    Dildo2 = 322,
    Vibe1 = 323,
    Vibe2 = 324,
    Flowers = 325,
    Cane = 326,
    NightVision = 368,
    Infrared = 369,
    Parachute = 371,
}

interface WeaponOption {
    id: number;
    name: string;
    weaponModel: WeaponModel;
}

interface WeaponCategory {
    id: number;
    name: string;
    infiniteAmmo: number;
    options: WeaponOption[];
}

// https://wiki.multitheftauto.com/wiki/Weapons
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
        id: WeaponSlot.Melee,
        name: 'Melee',
        infiniteAmmo: INFINITE_MELEE_AMMO,
        options: [
            {
                id: WeaponType.GolfClub,
                weaponModel: WeaponModel.GolfClub,
                name: 'Golf club',
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
                id: WeaponType.Shovel,
                weaponModel: WeaponModel.Shovel,
                name: 'Shovel',
            },
            {
                id: WeaponType.PoolCue,
                weaponModel: WeaponModel.PoolCue,
                name: 'Pool cue',
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
        id: WeaponSlot.Pistols,
        name: 'Pistols',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Pistol,
                weaponModel: WeaponModel.Pistol,
                name: 'Pistol',
            },
            {
                id: WeaponType.PistolSilenced,
                weaponModel: WeaponModel.PistolSilenced,
                name: 'Pistol silenced',
            },
            {
                id: WeaponType.DesertEagle,
                weaponModel: WeaponModel.DesertEagle,
                name: 'Desert eagle',
            },
        ],
    },
    {
        id: WeaponSlot.Shotguns,
        name: 'Shotguns',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Shotgun,
                weaponModel: WeaponModel.Shotgun,
                name: 'Shotgun',
            },
            {
                id: WeaponType.Sawnoff,
                weaponModel: WeaponModel.Sawnoff,
                name: 'Pistol silenced',
            },
            {
                id: WeaponType.Spas12,
                weaponModel: WeaponModel.Spas12,
                name: 'Combat shotgun',
            },
        ],
    },
    {
        id: WeaponSlot.SMG,
        name: 'Sub-Machine',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.MicroUzi,
                weaponModel: WeaponModel.MicroUzi,
                name: 'Uzi',
            },
            {
                id: WeaponType.Mp5,
                weaponModel: WeaponModel.Mp5,
                name: 'MP5',
            },
            {
                id: WeaponType.Tec9,
                weaponModel: WeaponModel.Tec9,
                name: 'Tec-9',
            },
        ],
    },
    {
        id: WeaponSlot.Assault,
        name: 'Assault Rifles',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Ak47,
                weaponModel: WeaponModel.Ak47,
                name: 'Ak-47',
            },
            {
                id: WeaponType.M4,
                weaponModel: WeaponModel.M4,
                name: 'M4',
            },
        ],
    },
    {
        id: WeaponSlot.Rifles,
        name: 'Rifles',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Rifle,
                weaponModel: WeaponModel.Rifle,
                name: 'Rifle',
            },
            {
                id: WeaponType.Sniper,
                weaponModel: WeaponModel.Sniper,
                name: 'Sniper',
            },
        ],
    },
    {
        id: WeaponSlot.Heavy,
        name: 'Heavy Weapons',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.RocketLauncher,
                weaponModel: WeaponModel.RocketLauncher,
                name: 'RPG',
            },
            {
                id: WeaponType.RocketLauncherHs,
                weaponModel: WeaponModel.RocketLauncherHs,
                name: 'Rocket Launcher Hs',
            },
            {
                id: WeaponType.Flamethrower,
                weaponModel: WeaponModel.Flamethrower,
                name: 'Flamethrower',
            },
            {
                id: WeaponType.Minigun,
                weaponModel: WeaponModel.Minigun,
                name: 'Mini-gun',
            },
        ],
    },
    {
        id: WeaponSlot.Thrown,
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
            {
                id: WeaponType.Satchel,
                weaponModel: WeaponModel.Satchel,
                name: 'Satchel',
            },
        ],
    },
    {
        id: WeaponSlot.Slot10,
        name: 'Special',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.SprayCan,
                weaponModel: WeaponModel.SprayCan,
                name: 'SprayCan',
            },
            {
                id: WeaponType.Extinguisher,
                weaponModel: WeaponModel.Extinguisher,
                name: 'Fire Extinguisher',
            },
            {
                id: WeaponType.Camera,
                weaponModel: WeaponModel.Camera,
                name: 'Camera',
            },
        ],
    },
    {
        id: WeaponSlot.Special,
        name: 'Wearables',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.NightVision,
                weaponModel: WeaponModel.NightVision,
                name: 'Night-vision',
            },
            {
                id: WeaponType.Infrared,
                weaponModel: WeaponModel.Infrared,
                name: 'Thermo-vision',
            },
            {
                id: WeaponType.Parachute,
                weaponModel: WeaponModel.Parachute,
                name: 'Parachute',
            },
        ],
    },
    {
        id: WeaponSlot.Gift,
        name: 'Gifts',
        infiniteAmmo: INFINITE_WEAPON_AMMO,
        options: [
            {
                id: WeaponType.Dildo1,
                weaponModel: WeaponModel.Dildo1,
                name: 'Dildo 1',
            },
            {
                id: WeaponType.Dildo2,
                weaponModel: WeaponModel.Dildo2,
                name: 'Dildo 2',
            },
            {
                id: WeaponType.Vibe1,
                weaponModel: WeaponModel.Vibe1,
                name: 'Vibrator 1',
            },
            {
                id: WeaponType.Vibe2,
                weaponModel: WeaponModel.Vibe2,
                name: 'Vibrator 2',
            },
            {
                id: WeaponType.Flowers,
                weaponModel: WeaponModel.Flowers,
                name: 'Flowers',
            },
            {
                id: WeaponType.Cane,
                weaponModel: WeaponModel.Cane,
                name: 'Cane',
            },
        ],
    },
];
