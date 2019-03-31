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
        let date = document.getElementById('date-value').value;
        let data = {
            drink: {
                name: document.getElementById('name-value').value,
                location: document.getElementById('location-value').value,
                price: document.getElementById('price-value').value,
                date: "2019-03-30T20:19:57.000Z",
                photo: "",
                userId: parseInt(this.props.userId),
                description: document.getElementById('description-value').value
            }
        }
        fetch("https://api.boba.watch/drinks/" + this.props.accessToken, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
                id="name-value"
                className="add-input"
                margin="dense"
                label="Drink name"
            />
            <TextField
                id="price-value"
                className="add-input"
                margin="dense"
                label="Price"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    id="date-value"
                    className="add-input"
                    margin="dense"
                    label="Date picker"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                />
            </MuiPickersUtilsProvider>
            <TextField
                id="description-value"
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
