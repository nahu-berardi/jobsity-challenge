import React from 'react';
import { Badge, Grid, Paper, Tooltip } from "@material-ui/core";
import moment from 'moment';
import * as utils from "./utils";
import './Body.scss';
import { useStore } from 'react-redux';
import { Event } from '@material-ui/icons';

export function Body(props) {
    const { display, detailed, selectedDate } = props;

    const reminders = useStore().getState().reminders.reminder;

    return (
        <Paper style={{ display: 'flex', height: 'calc(100% - 56px)', width: '100%' }}>
            {display.map((_column, columnIndex, origMonth) => (
                <Grid container style={{ display: 'flex', width: 'calc(100% / 7)', height: 'calc(100% / 6)', direction: 'column' }}>
                    {origMonth[columnIndex].map((day, dayIndex, origColumn) => {
                        return (
                            <Tooltip title={moment(detailed[columnIndex][dayIndex]).format('LL')}>
                                <Grid
                                    item
                                    style={{ position: 'relative', height: '100%', width: '100%', padding: '16px', border: '1px solid gray', cursor: 'pointer' }}
                                    className={utils.calendarGridClassName(columnIndex)}
                                    onClick={_ => selectedDate(moment(detailed[columnIndex][dayIndex]).toISOString(true))}
                                >
                                    <p
                                        key={dayIndex}
                                        style={{ margin: 0 }}
                                        className={utils.calendarTextClassName(columnIndex, dayIndex, day)}
                                    >
                                        {origColumn[dayIndex]}
                                    </p>
                                    {reminders[detailed[columnIndex][dayIndex].substr(0, 10)] &&
                                        reminders[detailed[columnIndex][dayIndex].substr(0, 10)].length ?
                                        (<div style={{ position: 'absolute', bottom: 0, right: 12 }}>
                                            <Badge
                                                color="primary"
                                                badgeContent={reminders[detailed[columnIndex][dayIndex].substr(0, 10)].length}
                                                max={9}
                                            >
                                                <Event />
                                            </Badge>
                                        </div>) :
                                        (<></>)
                                    }
                                </Grid>
                            </Tooltip>
                        );
                    })}
                </Grid>
            ))
            }
        </Paper >
    );
}