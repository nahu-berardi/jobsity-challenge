export function compareReminders(a, b) {
    return a.time > b.time ? 1 : -1;
}