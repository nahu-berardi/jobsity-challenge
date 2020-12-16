import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Calendar from './components/calendar/Calendar';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
