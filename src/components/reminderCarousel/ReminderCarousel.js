import React from 'react';
import { Avatar, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Modal, Tooltip } from '@material-ui/core';
import { AccessTime, Add, Apartment, Close, Delete, DeleteForever, Edit, WbSunny } from '@material-ui/icons';
import { useDispatch, useStore } from 'react-redux';
import ReminderEdit from '../reminderEdit/ReminderEdit';
import { deleteEveryReminder, deleteSingleReminder } from '../../redux/thunks';
import Carousel from 'react-material-ui-carousel';
import * as utils from './utils';
import moment from 'moment';
import './ReminderCarousel.scss';

function ReminderCarousel(props) {
    const { close, selectedDate } = props;

    const [remindersDate, setRemindersDate] = React.useState(moment(selectedDate).format('YYYY-MM-DD').substr(0, 10));
    const [newReminderModalOpen, setNewReminderModalOpen] = React.useState(false);
    const [newReminderProps, setNewReminderProps] = React.useState(undefined);
    const [value, updateReminders] = React.useState(false);

    const reminders = useStore().getState().reminders.reminder;
    const dispatch = useDispatch();

    const handleShowRemindersClose = () => {
        close();
    }

    const handleNewReminderClose = () => {
        setNewReminderModalOpen();
    }

    const handleNewReminderOpen = (reminder) => {
        setNewReminderModalOpen(true);

        if (reminder) {
            setNewReminderProps(reminder);
        }
        else {
            setNewReminderProps(undefined);
        }
    }

    const handleReminderDeletion = (date, index) => {
        dispatch(deleteSingleReminder(date, index));
        updateReminders(!value);
    }

    const handleDateDeletion = (date) => {
        dispatch(deleteEveryReminder(date));
        updateReminders(!value);
    }

    React.useEffect(() => {
        setRemindersDate(selectedDate.substr(0, 10));
    }, [selectedDate]);

    return (
        <div className="reminder-modal">
            <IconButton size="small" className="reminder-close-button" onClick={handleShowRemindersClose}>
                <Close />
            </IconButton>
            {reminders[remindersDate] && reminders[remindersDate].length ?
                (<Carousel indicators={false} fullHeightHover={false} >
                    {[...reminders[remindersDate]].sort(utils.compareReminders).map((reminder, index) => {
                        return (
                            <div className="reminder-container">
                                <Card>
                                    <CardHeader
                                        title={reminder.message}
                                        avatar={<Avatar className={`avatar-size background-${reminder.color}`}>{''}</Avatar>}
                                    />
                                    <CardContent className="reminder-content">
                                        <div className="reminder-row">
                                            <AccessTime />
                                            <span>{reminder.time}</span>
                                        </div>
                                        <div className="reminder-row">
                                            <Apartment />
                                            <span>{reminder.city}</span>
                                        </div>
                                        <div className="reminder-row">
                                            <WbSunny />
                                            <span>{reminder.weather}</span>
                                        </div>
                                    </CardContent>
                                    <CardActions className="center-buttons">
                                        <ButtonGroup>
                                            <Tooltip title="Add">
                                                <Button variant="contained" onClick={_ => handleNewReminderOpen()}>
                                                    <Add />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <Button variant="contained" onClick={_ => handleNewReminderOpen(reminder)}>
                                                    <Edit />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button variant="contained" onClick={_ => handleReminderDeletion({ date: reminder.date, index: reminder.index })}>
                                                    <Delete />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete all">
                                                <Button variant="contained" onClick={_ => handleDateDeletion({ date: reminder.date })}>
                                                    <DeleteForever />
                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </CardActions>
                                </Card>
                            </div>
                        );
                    })}
                </Carousel>) :
                (<div>
                    <div className="no-reminders-modal">
                        <span style={{ fontWeight: 'bold' }}>{remindersDate}</span>
                        <Divider />
                        <span>Whoops, there's no reminders!</span>
                        <div className="spaced-full-width">
                            <Button variant="contained" onClick={handleNewReminderOpen}>Add new</Button>
                            <Button variant="contained" onClick={handleShowRemindersClose}>Close</Button>
                        </div>
                    </div>
                </div>)
            }

            <Modal open={newReminderModalOpen} onClose={handleNewReminderClose}>
                <ReminderEdit reminder={newReminderProps} close={handleNewReminderClose} selectedDate={remindersDate} />
            </Modal>
        </div>
    );
}

export default ReminderCarousel;