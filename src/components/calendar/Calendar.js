import React from 'react';
import { getDisplayableMonth, getDetailedMonth } from '../../api/functions';
import { Container } from '@material-ui/core';
import { Header } from '../header/Header';
import { Body } from '../body/Body';
import moment from 'moment';
import './Calendar.scss';

function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(moment().toISOString(true));
  const [currentMonth, setCurrentMonth] = React.useState(getDetailedMonth(currentDate));
  const [currentDisplayableMonth, setCurrentDisplayableMonth] = React.useState(getDisplayableMonth(currentMonth));
  const [selectedDate, setSelectedDate] = React.useState(moment().toISOString(true));

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
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <p onClick={pastMonth}>atras</p>
      <p onClick={nextMonth}>adelante</p>
      <Container fixed style={{ height: '100vh' }}>
        <Header />
        <Body display={currentDisplayableMonth} detailed={currentMonth} selectedDate={selectedDateHandler} />
      </Container >
    </>
  );
}

export default Calendar;
