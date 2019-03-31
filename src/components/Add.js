import React, { Component } from 'react';
import 'date-fns';
import './styles/add.css';
import {Typography, TextField, Button} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

function nothing(){
    return;
}
export class Add extends Component {
    state = {
        selectedDate: new Date()
    }
    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };
    saveDrink = (callback=nothing) => {
        let data = {
            drink: {
                name: "test1",
                location: "test12",
                price: 123,
                date: "2019-03-30T20:19:57.000Z",
                photo: "",
                userId: this.props.userId
            }
        }
        fetch("https://api.boba.watch/drinks/" + this.props.accessToken, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((resp) => { alert("Drink Added!"); callback(); this.props.toggleSelf();
        }).catch(err => { console.log(err);
        });
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
                margin="dense"
                label="Drink name"
            />
            <TextField
                id="location-value"
                className="add-input"
                margin="dense"
                label="Date"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    className="add-input"
                    margin="dense"
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
            <div className="add-button-holder">
                <Button onClick={this.saveDrink} className="add-button">ADD</Button>
            </div>
        </div>
        )
    }
}

export default Add
