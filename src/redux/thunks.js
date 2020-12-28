import { deleteReminder, deleteAllReminders, newReminder } from './actions';

export const createOrUpdateReminder = (props) => async (dispatch) => {
    const { date, index } = props;
    dispatch(newReminder(date, props.time, index, props.message, props.city, props.weather, props.color));
};

export const deleteSingleReminder = (props) => async (dispatch) => {
    const { date, index } = props;
    dispatch(deleteReminder(date, index));
}

export const deleteEveryReminder = (props) => async (dispatch) => {
    const { date } = props;
    dispatch(deleteAllReminders(date));
}