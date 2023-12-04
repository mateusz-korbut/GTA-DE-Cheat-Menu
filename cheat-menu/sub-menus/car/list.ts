/// <reference path='../../../.config/sa.d.ts' />
import { CarOption } from '../../models';

import CAR_LIST from '../../data/car/ids/all.json';
import { CAR_CATEGORIES } from '../../data/index';

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

const renderCarListByName = (searchCarName: string) => {
    let carList: CarOption[];

    if (searchCache[searchCarName]) {
        carList = searchCache[searchCarName];
    } else {
        carList = CAR_LIST.filter(({ name }) => name.toLowerCase().includes(searchCarName));
        addSearchToCache(searchCarName, carList);
        log(searchCache);
    }

    for (const { id, name } of carList) {
        if (name.toLowerCase().includes(searchCarName) && ImGui.Selectable(name, false)) {
            return id;
        }
    }
}

const renderCarListByCategories = () => {
    for (const category of CAR_CATEGORIES) {
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

export const renderCarList = (): number | undefined => {
    const searchName = ImGui.InputText('Search car').trim().toLowerCase();

    if (searchName) {
        return renderCarListByName(searchName);
    }

    return renderCarListByCategories();
}
