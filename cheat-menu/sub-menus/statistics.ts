import { Statistic, ZERO_THOUSAND_RANGE } from '../data/index';

export const renderStatisticsFor = (statistics: Statistic[]) =>
    statistics.forEach(({ id, name, value, range }, statisticsIndex) => {
        const min = range?.min ?? ZERO_THOUSAND_RANGE.min;
        const max = range?.max ?? ZERO_THOUSAND_RANGE.max;
        const newValue = ImGui.SliderInt(name, value, min, max);

        if (newValue !== value) {
            const difference = Math.abs(newValue - value);

            if (newValue < value) {
                Stat.DecrementInt(id, difference);
            } else {
                Stat.IncrementIntNoMessage(id, difference);
            }

            statistics[statisticsIndex].value = newValue;
        }
    });
