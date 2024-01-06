export interface CarOption {
    id: number;
    name: string;
}

export interface CarCategory {
    name: string;
    list: CarOption[];
}

export abstract class MenuCar {
    abstract getModel(): number;

    abstract fix(): MenuCar;

    abstract makeInvincible(): MenuCar;

    abstract delete(): void;

    abstract setCoordinates(x: number, y: number, z: number): MenuCar;

    abstract setHeading(number: number);

    abstract setCarOnWheels(): MenuCar;

    abstract getOffsetInWorldCoords(x: number, y: number, z: number): { x: number, y: number, z: number };

    abstract speedUpCar(multiplier: number): MenuCar;

    abstract break(): MenuCar;

    abstract unlockDoors(): MenuCar;

    abstract markAsNoLongerNeeded(): MenuCar;

    abstract getColors(): { primaryColour: number, secondaryColour: number };

    abstract changeColor(primaryColor: number, secondaryColour: number): MenuCar;
}
