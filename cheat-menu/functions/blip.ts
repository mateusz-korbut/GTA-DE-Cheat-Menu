/// <reference path='../../.config/sa.d.ts' />
import { BlipColor } from '../../.config/enums';

export const addBlipTo = async (
    to: Car | Char | Vector3 | Pickup | ScriptObject,
    removeAfter = 2000,
    color = BlipColor.Green,
) => {
    // FIXME async
    return;
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

    await asyncWait(removeAfter);
    blip.remove();
}
