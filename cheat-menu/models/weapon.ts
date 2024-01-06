export interface WeaponOption {
    id: number;
    name: string;
    weaponModel: number;
}

export interface WeaponCategory {
    id: number;
    name: string;
    infiniteAmmo: number;
    options: WeaponOption[];
}
