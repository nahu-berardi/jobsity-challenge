import moment from 'moment';

export const getMonthAsArray = (date) => {
    let datesArray = [];

    const firstDay = moment(date).startOf('month');
    const lastDay = moment(date).endOf('month');

    let currentDate = firstDay;
    while (moment(currentDate).isSameOrBefore(lastDay, 'day')) {
        datesArray.push(moment(currentDate).toISOString(true));
        currentDate.add(1, 'day');
    }

    return datesArray;
}

export const getMonthWithAdditionals = (date) => {
    let usableMonth = [[], [], [], [], [], [], []];

    const month = getMonthAsArray(date);

    const missingDaysLeft = moment(month[0]).day();
    const missingDaysRight = 35 - (month.length + missingDaysLeft);

    let currentDate = moment(month[0]).subtract(1, 'day');
    const leftInitialDay = moment(moment(month[0]).subtract(missingDaysLeft, 'days').toISOString(true));
    while (currentDate.isSameOrAfter(leftInitialDay, 'day')) {
        usableMonth[currentDate.day()].push(moment(currentDate).toISOString(true));
        currentDate.subtract(1, 'day');
    }

    month.forEach(day => {
        const currentDay = moment(day);
        usableMonth[currentDay.day()].push(currentDay.toISOString(true));
    })

    currentDate = moment(month[month.length - 1]).add(1, 'day');
    const rightTargetDay = moment(moment(month[month.length - 1]).add(missingDaysRight, 'days').toISOString(true));
    while (currentDate.isSameOrBefore(rightTargetDay, 'day')) {
        usableMonth[currentDate.day()].push(moment(currentDate).toISOString(true));
        currentDate.add(1, 'day');
    }

    return usableMonth;
}