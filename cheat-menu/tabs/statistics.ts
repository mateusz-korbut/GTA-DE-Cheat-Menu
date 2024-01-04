/// <reference path='../../.config/sa.d.ts' />
import {
    COLLECTIBLES_STATISTICS,
    DRIVING_STATISTICS,
    GIRLFRIEND_STATISTICS,
    PLAYER_STATISTICS,
    Statistic,
    WEAPON_STATISTICS
} from '../data/statistics';

import { renderStatisticsFor } from '../sub-menus/index';
import { Tab } from './tab';

const addValueStatistic = ({ id, name, range }: Partial<Statistic>): Statistic => ({
    id,
    name,
    range,
    value: Stat.GetInt(id),
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
                renderStatisticsFor(statistics);
            }
        });
    }

    updateGameState() {
    }
}
