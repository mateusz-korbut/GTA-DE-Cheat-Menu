export const renderClockMenu = () => {
    const now = Clock.GetTimeOfDay();
    const hour = ImGui.SliderInt('Hour', now.hours, 0, 24);

    if (hour !== now.hours) {
        Clock.SetTimeOfDay(hour, now.minutes);
    }
}
