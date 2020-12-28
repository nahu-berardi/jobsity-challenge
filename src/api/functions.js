import { getMonthWithAdditionals } from './calls';
import moment from 'moment';

// Moment seems to be retrieving the actual date 
// only when converted to string, hence the extra 
// conversions being done here.
// This might be solved by simply pouring this code
// using the Luxon library.

export const getDetailedMonth = (date) => {
    return getMonthWithAdditionals(date);
}

export const getDisplayableMonth = (usableMonth) => {
    let month = [];

    for (let i = 0; i < usableMonth.length; i++) {
        month.push([]);
        for (let j = 0; j < usableMonth[i].length; j++) {
            const day = moment(usableMonth[i][j]).format('DD');
            month[i].push(day);
        }
    }

    return month;
}