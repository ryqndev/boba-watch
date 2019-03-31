import React, { Component } from 'react';
import 'date-fns';
import './styles/add.css';
import {Typography, TextField} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

export class Add extends Component {
    state = {
        selectedDate: new Date()
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        return (
        <div className="add-modal">
            <Typography variant="h5">Add a purchase</Typography>
            <TextField
                id="location-value"
                className="add-input"
                label="Location"
            />
            <TextField
                id="location-value"
                className="add-input"
                label="Drink name"
            />
            <TextField
                id="location-value"
                className="add-input"
                label="Date"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    label="Date picker"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                />
            </MuiPickersUtilsProvider>
            
            <TextField
                id="location-value"
                className="add-input"
                label="Description"
            />
            
        </div>
        )
    }
}

export default Add
