/// <reference path='../../../.config/sa.d.ts' />
import { CarCategory, CarOption } from '../../models';

const MAX_CACHED_SEARCHES = 5;
const searchCache: { [key: string]: CarOption[] } = {};

const addSearchToCache = (key: string, value: CarOption[]) => {
    searchCache[key] = value;

    const cachedSearches = Object.keys(searchCache);

    if (cachedSearches.length > MAX_CACHED_SEARCHES) {
        const toRemove = cachedSearches.slice(0, cachedSearches.length - MAX_CACHED_SEARCHES);

        toRemove.forEach((keyToRemove) => delete searchCache[keyToRemove]);
    }
}

const renderCarListByName = (allCars: CarOption[], searchCarName: string) => {
    let carList: CarOption[];

    if (searchCache[searchCarName]) {
        carList = searchCache[searchCarName];
    } else {
        carList = allCars.filter(({ name }) => name.toLowerCase().includes(searchCarName));
        addSearchToCache(searchCarName, carList);
        log(searchCache);
    }

    for (const { id, name } of carList) {
        if (name.toLowerCase().includes(searchCarName) && ImGui.Selectable(name, false)) {
            return id;
        }
    }
}

const renderCarListByCategories = (carCategories: CarCategory[]) => {
    for (const category of carCategories) {
        if (!ImGui.CollapsingHeader(category.name)) {
            continue;
        }

        for (const { id, name } of category.list) {
            if (ImGui.Selectable(name, false)) {
                return id;
            }
        }
    }
}

export const renderCarList = (carList: CarOption[], carCategories: CarCategory[]): number | undefined => {
    const searchName = ImGui.InputText('Search car').trim().toLowerCase();

    if (searchName) {
        return renderCarListByName(carList, searchName);
    }

    return renderCarListByCategories(carCategories);
}
