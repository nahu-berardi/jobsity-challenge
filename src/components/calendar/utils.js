export function shouldChangeMonth(dayIndex, day) {
    return ((dayIndex < 1 && day > '07') || (dayIndex > 3 && day < '23'));
}