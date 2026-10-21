const shortcutStates: { [id: string]: boolean } = {};

export const isShortcutPressed = (id: string, ...keys: number[]): boolean => {
    const isDown = keys.every((key) => Pad.IsKeyPressed(key));
    // keys still held when the menu (re)starts don't count as a new press
    const wasDown = id in shortcutStates ? shortcutStates[id] : isDown;
    shortcutStates[id] = isDown;

    return isDown && !wasDown;
}
