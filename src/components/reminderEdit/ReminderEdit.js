import React from 'react';
import { Avatar, Button, TextField } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { InputGooglePlaces } from '../inputGooglePlaces/InputGooglePlaces';
import { getWeatherPrediction } from '../../api/calls';
import { createOrUpdateReminder, deleteSingleReminder } from '../../redux/thunks';
import { useDispatch, useStore } from 'react-redux';
import moment from 'moment';
import './ReminderEdit.scss';

const pickeableColors = ["blue", "green", "red", "pink", "violet"];

function ReminderEdit(props) {
    const { close, selectedDate } = props;

    const defaultMessage = props.reminder && props.reminder.message ? props.reminder.message : "My reminder";
    const defaultDate = props.reminder && props.reminder.date ? props.reminder.date : moment(selectedDate).format('YYYY-MM-DD').substr(0, 10);
    const defaultTime = props.reminder && props.reminder.time ? props.reminder.time : "07:30";
    const defaultLocation = props.reminder && props.reminder.city ? props.reminder.city : undefined;
    const defaultCoordinates = props.reminder && props.reminder.coordinates ? props.reminder.coordinates : undefined;
    const defaultWeather = props.reminder && props.reminder.weather ? props.reminder.weather : undefined;
    const defaultColor = props.reminder && props.reminder.color ? props.reminder.color : undefined;

    const [reminderText, setReminderText] = React.useState(defaultMessage);
    const [reminderDate, setReminderDate] = React.useState(defaultDate);
    const [reminderTime, setReminderTime] = React.useState(defaultTime);
    const [reminderLocation, setReminderLocation] = React.useState(defaultLocation);
    const [reminderColor, setReminderColor] = React.useState(defaultColor);
    const [reminderCoordinates, setReminderCoordinates] = React.useState(defaultCoordinates);
    const [reminderWeather, setReminderWeather] = React.useState(defaultWeather);
    const [reminderDateError, showReminderDateError] = React.useState(false);
    const [unfilteredReminderDate, setUnfilteredReminderDate] = React.useState(moment(selectedDate).format('YYYY-MM-DD').substr(0, 10));

    const reminders = useStore().getState().reminders;
    const dispatch = useDispatch();

    const handleTextLength = (e) => {
        setReminderText(e.target.value.substr(0, 30));
    }

    const handleDateValidation = (e) => {
        setUnfilteredReminderDate(e.target.value);
        if (!moment(e.target.value, ['YYYY-MM-DD'], true).isValid()) {
            showReminderDateError(true);
        }
        else {
            setReminderDate(moment(e.target.value).format('YYYY-MM-DD').substr(0, 10));
            showReminderDateError(false);
        }
    }

    const handleSelectedTime = (e) => {
        setReminderTime(e.target.value);
    }

    const handleLocation = (locationName) => {
        setReminderLocation(locationName);
    }

    const handleCoordinates = (coordinates) => {
        if (coordinates && moment().add(7, 'days').isAfter(moment(reminderDate))) {
            setReminderCoordinates(coordinates);

            const weather = getWeatherPrediction(coordinates.lat, coordinates.lng).then(days => { return days; });
            if (weather) {
                weather.then(days => setReminderWeather(days && days[reminderDate] ?
                    `${days[reminderDate].weather} - ${days[reminderDate].description}` :
                    'Not available.'
                ));
            }
        }
    }

    const submitNewReminder = () => {
        if ((reminderDate || reminderDateError) && reminderLocation && reminderColor) {
            let date = reminderDate;
            let index = reminders.reminder[reminderDate] ? reminders.reminder[reminderDate].length : 0;

            if (props.reminder && props.reminder.date && props.reminder.index !== undefined) {
                if (props.reminder.date === date) {
                    date = props.reminder.date;
                    index = props.reminder.index;
                }
                else {
                    dispatch(deleteSingleReminder({ date: props.reminder.date, index: props.reminder.index }));
                }
            }

            const data = {
                date: date,
                time: reminderTime,
                index: index,
                message: reminderText === "" ? 'Untitled reminder' : reminderText,
                city: reminderLocation,
                coordinates: reminderCoordinates,
                weather: reminderWeather ? reminderWeather : 'Not available.',
                color: reminderColor,
            }

            dispatch(createOrUpdateReminder(data));
            close();
        }
        else {
            alert('Some fields may be empty or unselected.');
        }

        // TODO improve missing fields notification
        // (location & color notifying if empty/unselected only w/ alert)
    }

    const cancelNewReminder = () => {
        close();
    }

    React.useEffect(() => {
        handleCoordinates(reminderCoordinates);
    }, [reminderDate]);
    
    React.useEffect(() => {
        handleCoordinates(reminderCoordinates);
    }, [reminderCoordinates]);

    return (
        <div className="reminder-modal center-children">
            <TextField
                label="Reminder"
                value={reminderText}
                variant="outlined"
                fullWidth
                onChange={handleTextLength}
            />
            <TextField
                label="Date"
                value={unfilteredReminderDate}
                variant="outlined"
                fullWidth
                onChange={handleDateValidation}
                error={reminderDateError}
                helperText={reminderDateError ? `Wrong date / format` : `Enter your date`}
            />
            <TextField
                label="Time"
                type="time"
                value={reminderTime}
                variant="outlined"
                fullWidth
                onChange={handleSelectedTime}
            />
            <InputGooglePlaces
                location={handleLocation}
                latlng={handleCoordinates}
            />
            <div className="spaced-full-width">
                {pickeableColors.map(color => {
                    return (
                        <Avatar className={`clickable avatar-size background-${color}`} onClick={_ => setReminderColor(color)}>
                            {reminderColor === color && <Check />}
                        </Avatar>
                    );
                })}
            </div>
            <div className="spaced-full-width">
                <Button variant="contained" onClick={submitNewReminder}>Submit</Button>
                <Button variant="contained" onClick={cancelNewReminder}>Cancel</Button>
            </div>
        </div >
    );
}

export default ReminderEdit;