/// <reference path='../../../../.config/vc.d.ts' />
import { VcCar } from '../models/index';

import { CarTab } from '../../../tabs/index';

export class VcCarTab extends CarTab {
    protected renderMainActions(): void {
    }

    protected createCar(modelId: number) {
        return new VcCar(Car.Create(modelId, this.playerPos.x, this.playerPos.y, this.playerPos.z));
    }
}
