import React, { Component } from 'react';
import 'date-fns';
import swal from 'sweetalert';
import './styles/add.css';
import {Typography, TextField, Button} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';

export class Add extends Component {
    state = {
        selectedDate: new Date()
    }
    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };
    saveDrink = () => {
        let data = {
            drink: {
                name: document.getElementById('name-value').value,
                location: document.getElementById('location-value').value,
                price: parseInt(document.getElementById('price-value').value * 100),
                date: new Date(document.getElementById('date-value').value).toISOString(),
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
        }).then((resp) => { swal("Done!", "Drink has been added", "success"); this.props.toggleSelf();
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
                <DateTimePicker
                    id="date-value"
                    className="add-input"
                    margin="dense"
                    format="M/d/yyyy h:mm a"
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
