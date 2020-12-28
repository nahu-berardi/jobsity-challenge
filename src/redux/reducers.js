import { combineReducers } from "redux";
import { reminders } from "./reducer";
import { } from './state';

const reducers = () => combineReducers({
    reminders: reminders,
});

export default reducers;
