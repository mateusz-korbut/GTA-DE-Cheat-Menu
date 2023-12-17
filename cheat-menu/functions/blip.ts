/// <reference path='../../.config/sa.d.ts' />
import { BlipColor } from '../../.config/enums';

export const addBlipTo = (
    to: Car | Char | Vector3 | Pickup | ScriptObject,
    removeAfter = 4000,
    color = BlipColor.Green,
) => {
    let blip: Blip;

    if (to instanceof Char) {
        blip = Blip.AddForChar(to);
    } else if (to instanceof Car) {
        blip = Blip.AddForCar(to);
    } else if (to instanceof Pickup) {
        blip = Blip.AddForPickup(to);
    } else if (to instanceof ScriptObject) {
        blip = Blip.AddForObject(to);
    } else if ('x' in to && 'y' in to && 'z' in to) {
        blip = Blip.AddForCoord(to.x, to.y, to.z);
    } else {
        log(`WARN: Cannot add blip to: ${ JSON.stringify(to) }`);
        return;
    }
    blip.changeColor(color);

    setTimeout(() => blip.remove(), removeAfter);
}
