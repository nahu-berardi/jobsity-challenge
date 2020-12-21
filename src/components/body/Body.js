import React from 'react';
import { Grid, Paper, Tooltip } from "@material-ui/core";
import moment from 'moment';
import { isTextActive } from "./utils";
import './Body.scss';

export function Body(props) {
    const { display, detailed, selectedDate } = props;

    return (
        <Paper style={{ display: 'flex', height: 'calc(100% - 56px)', width: '100%' }}>
            {display.map((_column, columnIndex, origMonth) => (
                <Grid container style={{ display: 'flex', width: '14.28%', height: '20%', direction: 'column' }}>
                    {origMonth[columnIndex].map((day, dayIndex, origColumn) => {
                        return (
                            <Grid item style={{ height: '100%', width: '100%', border: '1px solid gray' }}>
                                <Tooltip title={moment(detailed[columnIndex][dayIndex]).format('LL')}>
                                    <p
                                        key={dayIndex}
                                        style={{ margin: 16, height: 'calc(100% - 32px)', width: 'calc(100% - 32px)' }}
                                        className={`${isTextActive(dayIndex, day) ? 'inactive-text' : 'active-weekend-text'}`}
                                        onClick={_ => selectedDate(moment(detailed[columnIndex][dayIndex]).toISOString(true))}
                                    >
                                        {origColumn[dayIndex]}
                                    </p>
                                </Tooltip>
                            </Grid>);
                    })}
                </Grid>
            ))}
        </Paper>
    );
}