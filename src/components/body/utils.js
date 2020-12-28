export function calendarTextClassName(columnIndex, dayIndex, day) {
    if ((dayIndex < 1 && day > '07') || (dayIndex > 3 && day < '23'))
        return 'inactive-text';
    else if (columnIndex === 0 || columnIndex === 6)
        return 'active-weekend-text';
    else
        return 'active-text';
}

export function calendarGridClassName(columnIndex) {
    if (columnIndex === 0 || columnIndex === 6)
        return 'inactive-background';
}