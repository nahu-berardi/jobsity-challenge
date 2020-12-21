export function isTextActive(index, day) {
    return ((index === 0 && day > '10') || (index === 4 && day < '20'));
}