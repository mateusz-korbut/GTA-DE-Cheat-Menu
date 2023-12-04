export interface CarOption {
    id: number;
    name: string;
}

export interface CarAvailableMods {
    [modSlot: string]: CarOption[];
}
