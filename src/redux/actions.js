export const constants = {
    //LOADING_REMINDER: "LOADING_REMINDER",
    NEW_REMINDER: "NEW_REMINDER",
    DELETE_REMINDER: "DELETE_REMINDER",
    DELETE_ALL: "DELETE_ALL",
}

const INITIAL_STATE = {
    isLoading: false,
    date: '',
    time: '',
    index: NaN,
    message: '',
    city: '',
    weather: '',
    color: '',
};

export function newReminder(date, time, index, message, city, weather, color) {
    return {
        type: constants.NEW_REMINDER,
        date: date,
        time: time,
        index: index,
        message: message,
        city: city,
        weather: weather,
        color: color,
        initialState: INITIAL_STATE,
    };
}

export function deleteReminder(date, index) {
    return {
        type: constants.DELETE_REMINDER,
        date: date,
        index: index,
        initialState: INITIAL_STATE,
    };
}

export function deleteAllReminders(date) {
    return {
        type: constants.DELETE_ALL,
        date: date,
        initialState: INITIAL_STATE,
    };
}