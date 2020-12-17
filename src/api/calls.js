import moment from 'moment'

export const getMonthAsArray = (date) => {
    let datesArray = [];

    const firstDay = moment(date).startOf('month');
    const lastDay = moment(date).endOf('month');

    let currentDate = firstDay;
    while (moment(currentDate).isBefore(lastDay, 'day')) {
        datesArray.push(currentDate);
        currentDate.add(1, 'day');
    }

    return datesArray;
}