const RANDOM_WEATHER_ID = -1;

export type WeatherId = number | null;

export type WeatherType = {
    [name: string]: number | string;
}

export const renderWeatherList = (weatherTypes: WeatherType, weatherId: WeatherId): WeatherId => {
    const weatherTypeList: [string, number][] = [
        ['Random', RANDOM_WEATHER_ID],
        ...Object.entries(weatherTypes)
            .filter((entry): entry is [string, number] => typeof entry[1] === 'number')
            .sort(([, id1], [, id2]) => id1 - id2),
    ];
    const currentIndex = Math.max(0, weatherTypeList.findIndex(([, id]) => id === (weatherId ?? RANDOM_WEATHER_ID)));
    const newIndex = ImGui.ComboBox(
        'Weather',
        weatherTypeList.map(([name]) => name).join(','),
        currentIndex,
    );
    const newWeatherId = weatherTypeList[newIndex]?.[1] ?? RANDOM_WEATHER_ID;

    if (newIndex !== currentIndex) {
        if (newWeatherId === RANDOM_WEATHER_ID) {
            Weather.Release();
        } else {
            Weather.Force(newWeatherId);
        }
    }

    return newWeatherId;
}
