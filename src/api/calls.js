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
    const missingDaysRight = 42 - (month.length + missingDaysLeft);

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

export const getWeatherPrediction = (latitude, longitude) => {
    const lat = Math.round(latitude);
    const lng = Math.round(longitude);
    const exclude = "current,minutely,hourly,alerts";
    const unit = "metric";
    const key = "{API_KEY}";

    const endpoint = `https://pro.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=${exclude}&units=${unit}&appid=${key}`;

    fetch(endpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // TODO parse data when key is available.
            console.log(data);
        })
        .catch(function () {
            // TODO manage error(s).
        })
}