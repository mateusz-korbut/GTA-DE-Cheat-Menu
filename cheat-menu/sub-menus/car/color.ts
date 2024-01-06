import { Color, MenuCar } from '../../models/index';
import { findNearestCarColors } from '../../functions/index';

import { WARN_COLOR } from '../../data/index';

interface ColorCache {
    id?: number;
    red: number;
    green: number;
    blue: number;
    colors: Color[];
}

export class CarColorMenu {
    private primaryColor?: ColorCache;
    private secondaryColor?: ColorCache;

    constructor(private readonly colors: Color[]) {
    }

    renderCarColorPickers(car: MenuCar) {
        if (!ImGui.CollapsingHeader('Colors')) {
            return;
        }

        // TODO make colors-supported.json
        ImGui.TextColored('Not all colors applies to this car', WARN_COLOR.r, WARN_COLOR.g, WARN_COLOR.b, WARN_COLOR.a);
        this.primaryColor = this.renderColorPicker('Primary color', this.primaryColor);
        this.secondaryColor = this.renderColorPicker('Secondary color', this.secondaryColor);
        const newPrimaryColor = this.primaryColor.id;
        const newSecondaryColor = this.secondaryColor.id;
        const { primaryColour, secondaryColour } = car.getColors();

        if (newPrimaryColor && newPrimaryColor !== primaryColour) {
            car.changeColor(newPrimaryColor, secondaryColour);
        }
        if (newSecondaryColor && newSecondaryColor !== secondaryColour) {
            car.changeColor(primaryColour, newSecondaryColor);
        }
    }

    private renderColorPicker(label: string, colorCached: ColorCache | undefined): ColorCache {
        const color = ImGui.ColorPicker(label);
        const colorChanged = !colorCached
            || colorCached.red !== color.red
            || colorCached.green !== color.green
            || colorCached.blue !== color.blue;

        if (colorChanged) {
            colorCached = {
                ...color,
                colors: findNearestCarColors(this.colors, color),
            };
        }

        ImGui.NewLine();
        colorCached.id = this.renderNearestColors(colorCached.colors);

        return colorCached;
    }

    private renderNearestColors(colors: Color[]): number | undefined {
        for (const { id, name, r, g, b } of colors) {
            ImGui.SameLine();

            if (ImGui.ButtonColored(name, r, g, b, 1, 34, 34)) {
                return id;
            }
        }
    }
}
