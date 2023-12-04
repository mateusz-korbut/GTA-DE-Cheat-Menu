import { WeatherType } from '../../../.config/enums';

const RANDOM_WEATHER_ID = -1;

export type WeatherId = number | null;

export const renderWeatherList = (weatherType: number): WeatherId => {
    const weatherTypes: [string, number][] = [['Random', RANDOM_WEATHER_ID],...Object.entries(WeatherType)];
    const [, newWeatherId] = weatherTypes[ImGui.ComboBox(
        'Weather',
        weatherTypes.map(([name]) => name).join(','),
        weatherType + 1,
    )];

    if (newWeatherId === RANDOM_WEATHER_ID) {
        Weather.Release();
        return RANDOM_WEATHER_ID;
    }
    Weather.Force(newWeatherId);

    return newWeatherId;
}
