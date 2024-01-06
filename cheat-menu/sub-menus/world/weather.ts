const RANDOM_WEATHER_ID = -1;

export type WeatherId = number | null;

export type WeatherType = {
    [name: string]: number;
}

export const renderWeatherList = (weatherTypes: WeatherType, weatherId: number): WeatherId => {
    const weatherTypeList: [string, number][] = [['Random', RANDOM_WEATHER_ID], ...Object.entries(weatherTypes)];
    const [, newWeatherId] = weatherTypeList[ImGui.ComboBox(
        'Weather',
        weatherTypeList.map(([name]) => name).join(','),
        weatherId + 1,
    )];

    if (newWeatherId === RANDOM_WEATHER_ID) {
        Weather.Release();
        return RANDOM_WEATHER_ID;
    }
    Weather.Force(newWeatherId);

    return newWeatherId;
}
