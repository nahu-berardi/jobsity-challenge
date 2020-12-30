import { INITIAL_STATE_RECORD } from './state';
import { constants } from './actions';

export function reminders(state = INITIAL_STATE_RECORD, action) {
    const { date, index } = action;

    if (date === undefined) {
        return state;
    }

    if (state.reminder[date] === undefined)
        state.reminder[date] = [];
    if (state.reminder[date][index] === undefined)
        state.reminder[date][index] = action.initialState;

    switch (action.type) {
        case constants.NEW_REMINDER:
            state.reminder[date][index] = {
                date: action.date,
                time: action.time,
                index: action.index,
                message: action.message,
                city: action.city,
                coordinates: action.coordinates,
                weather: action.weather,
                color: action.color,
            };
            return {
                ...state,
                reminder: state.reminder,
            };

        case constants.DELETE_REMINDER:
            console.log(date, index);
            state.reminder[date].splice(index, 1);
            return {
                ...state,
                reminder: state.reminder,
            };

        case constants.DELETE_ALL:
            state.reminder[date] = undefined;
            return {
                ...state,
                reminder: state.reminder,
            };

        default:
            return state;
    }
}