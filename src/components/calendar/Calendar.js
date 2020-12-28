import React from 'react';
import { getDisplayableMonth, getDetailedMonth } from '../../api/functions';
import { createOrUpdateReminder } from '../../redux/thunks';
import { useDispatch, useStore } from 'react-redux';
import { Container, IconButton, Modal } from '@material-ui/core';
import { Header } from '../header/Header';
import { Body } from '../body/Body';
import ReminderEdit from '../reminderEdit/ReminderEdit';
import ReminderCarousel from '../reminderCarousel/ReminderCarousel';
import * as utils from './utils';
import moment from 'moment';
import './Calendar.scss';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(moment().toISOString(true));
  const [currentMonth, setCurrentMonth] = React.useState(getDetailedMonth(currentDate));
  const [currentDisplayableMonth, setCurrentDisplayableMonth] = React.useState(getDisplayableMonth(currentMonth));
  const [selectedDate, setSelectedDate] = React.useState(moment().startOf('day').format('YYYY-MM-DD'));
  const [showRemindersModalOpen, setShowRemindersModalOpen] = React.useState(false);

  const reminders = useStore().getState().reminders;
  const dispatch = useDispatch();

  const pastMonth = () => {
    const newDate = moment(currentDate).subtract(1, 'month').toISOString(true);
    setCurrentDate(newDate);
  }

  const nextMonth = () => {
    const newDate = moment(currentDate).add(1, 'month').toISOString(true);
    setCurrentDate(newDate);
  }

  const selectedDateHandler = (date) => {
    setSelectedDate(moment(date).toISOString(true));
    setShowRemindersModalOpen(true);
  }

  const handleClose = () => {
    setShowRemindersModalOpen(false);
  }

  React.useEffect(() => {
    const newMonth = getDetailedMonth(currentDate);
    setCurrentMonth(newMonth);
  }, [currentDate]);

  React.useEffect(() => {
    const newDisplayableMonth = getDisplayableMonth(currentMonth);
    setCurrentDisplayableMonth(newDisplayableMonth);
  }, [currentMonth]);

  React.useEffect(() => {
    console.log(reminders);
  }, [reminders]);

  return (
    <div className="calendar-container">
      <div className="change-month-button" onClick={pastMonth}>
        <IconButton size="small">
          <ArrowBackIos />
        </IconButton>
      </div>
      <Container fixed style={{ height: 'calc(100vh - 25px)', padding: '0px' }}>
        <span>{moment(currentDate).format('MMMM YYYY')}</span>
        <Header />
        <Body display={currentDisplayableMonth} detailed={currentMonth} selectedDate={selectedDateHandler} />
        <Modal open={showRemindersModalOpen} onClose={handleClose}>
          <ReminderCarousel close={handleClose} selectedDate={selectedDate} />
        </Modal>
      </Container >
      <div className="change-month-button" onClick={nextMonth}>
        <IconButton size="small">
          <ArrowForwardIos />
        </IconButton>
      </div>
    </div>
  );
}

export default Calendar;
