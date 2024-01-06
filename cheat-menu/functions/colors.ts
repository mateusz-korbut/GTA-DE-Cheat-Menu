import { Color, ImGuiColor } from '../models/index';

export const findNearestCarColors = (
    carColors: Color[],
    { red, green, blue }: ImGuiColor,
    getNumberOfColors: number = 10
): Color[] => carColors.map(({ id, r, g, b, name }) => [
    { id, r, g, b, name },
    Math.sqrt((
            ((red / 255) - r)) ** 2 +
        (((green / 255) - g)) ** 2 +
        (((blue / 255) - b)) ** 2
    )
] as [Color, number])
    .sort(([, d1], [, d2]) => d1 - d2)
    .slice(0, getNumberOfColors).map(([color]) => color);
