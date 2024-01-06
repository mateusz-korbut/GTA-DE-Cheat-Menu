/// <reference path='../../../../.config/gta3.d.ts' />
import { IIICar } from '../models/index';

import { CarTab } from '../../../tabs/index';

export class IIICarTab extends CarTab {
    protected renderMainActions(): void {
    }

    protected createCar(modelId: number) {
        return new IIICar(Car.Create(modelId, this.playerPos.x, this.playerPos.y, this.playerPos.z));
    }
}
