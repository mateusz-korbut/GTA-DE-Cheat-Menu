/// <reference path='../../../../.config/sa.d.ts' />
import { Tab } from '../../../tabs/tab';

import {
    COLLECTIBLES_STATISTICS,
    DRIVING_STATISTICS,
    GIRLFRIEND_STATISTICS,
    PLAYER_STATISTICS,
    Statistic,
    WEAPON_STATISTICS
} from '../data/statistics';
import { ZERO_THOUSAND_RANGE } from '../data/index';

// the menu's Statistics enum uses the game's stat ids
const addValueStatistic = ({ id, name, range }: Omit<Statistic, 'value'>): Statistic => ({
    id,
    name,
    range,
    value: Stat.GetInt(id as number),
});

export class StatisticsTab extends Tab {
    private readonly statistics = [
        {
            header: 'Player',
            statistics: PLAYER_STATISTICS.map(addValueStatistic),
        },
        {
            header: 'Driving',
            statistics: DRIVING_STATISTICS.map(addValueStatistic),
        },
        {
            header: 'Weapons',
            statistics: WEAPON_STATISTICS.map(addValueStatistic),
        },
        // {
        //     header: 'Girlfriends',
        //     statistics: GIRLFRIEND_STATISTICS.map(addValueStatistic),
        // },
        {
            header: 'Collectibles',
            statistics: COLLECTIBLES_STATISTICS.map(addValueStatistic),
        },
    ];

    renderTabUI() {
        this.statistics.forEach(({ header, statistics }) => {
            if (ImGui.CollapsingHeader(header)) {
                this.renderStatisticsFor(statistics);
            }
        });
    }

    updateGameState() {
    }

    private renderStatisticsFor(statistics: Statistic[]) {
        statistics.forEach(({ id, name, value, range }, statisticsIndex) => {
            const min = range?.min ?? ZERO_THOUSAND_RANGE.min;
            const max = range?.max ?? ZERO_THOUSAND_RANGE.max;
            const newValue = ImGui.SliderInt(name, value, min, max);

            if (newValue !== value) {
                const difference = Math.abs(newValue - value);

                if (newValue < value) {
                    Stat.DecrementInt(id as number, difference);
                } else {
                    Stat.IncrementIntNoMessage(id as number, difference);
                }

                statistics[statisticsIndex].value = newValue;
            }
        })
    }
}
