/// <reference path='../../../.config/sa.d.ts' />
import { CarOption } from '../../models/index';

import { MOD_REMOVED } from '../../data/index';

export class CarPaintJobMenu {
    private paintJobs!: CarOption[];

    constructor(car: Car | undefined) {
        this.paintJobs = this.getPaintJobs(car);
    }

    renderPaintJobList(car: Car) {
        if (!this.paintJobs.length || !ImGui.CollapsingHeader('Paint jobs')) {
            return;
        }
        const currentPaintJob = car.getCurrentPaintjob();
        const currentPaintJobId = isFinite(currentPaintJob) ? currentPaintJob : MOD_REMOVED;
        const newPaintJobId = this.paintJobs[ImGui.ComboBox(
            'Paint job',
            this.paintJobs.map(({ name }) => name).join(','),
            currentPaintJobId + 1
        )]?.id;

        if (newPaintJobId === undefined || newPaintJobId === currentPaintJobId) {
            return;
        }

        car.givePaintjob(newPaintJobId);
    }

    private getPaintJobs(car: Car | undefined): CarOption[] {
        const paintJobs: CarOption[] = [];
        const availablePaintJobs = car?.getNumAvailablePaintjobs();

        if (availablePaintJobs) {
            paintJobs.push({ id: MOD_REMOVED, name: 'Remove paint-job' });

            for (let id = 0; id < availablePaintJobs - 1; id++) {
                paintJobs.push({
                    id,
                    name: `Paint-job: ${ id + 1 }`,
                });
            }
        }

        return paintJobs;
    }
}
