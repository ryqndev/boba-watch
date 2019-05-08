import React, { Component } from 'react';
import 'date-fns';
import swal from 'sweetalert';
import './styles/add.css';
import {Typography, TextField, Button, IconButton, Modal} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import CloseButton from '@material-ui/icons/Close';
import {withRouter} from 'react-router-dom';
import stats from './calculateStatistics';

export class Add extends Component {
    state = {
        selectedDate: new Date()
    }
    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };
    /**
     * @function update
     * TODO: implement live reload instead of using recalculate metrics
     */
    update = () => {
        fetch("https://api.boba.watch/drinks/user/" + this.props.userId,{
        }).then(resp => {
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            return resp;
        }).then((resp) => { return resp.json();
        }).then((resp) => { 
            stats.recalculateMetrics(resp);
            swal("Done!", "Drink has been added", "success"); 
            this.props.close();
        }).catch(err => { swal("Error!", `Something Went Wrong: ${err}`, "error");
        });   
    }
    /**
     * @function saveDrink - called when the user submits drink information to be added.
     * Has 3 parts:
     *  1. Gets all the user filled out info
     *  2. Only required parameter is price and if not filled, throws error
     *  3. Makes api call to server to add the drink with info
     * 
     * TODO: better job of parsing the info and potentially add chips and autofill for
     * better data processing
     */
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
        if(document.getElementById('price-value').value === '' || 
            isNaN(parseInt(document.getElementById('price-value').value)) ||
            parseInt(document.getElementById('price-value').value) === 0
        ){
            swal("Error!", `Please enter a price to add drink`, "error");
            return;
        }
        fetch("https://api.boba.watch/drinks/" + this.props.accessToken, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(resp => {
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            return resp;
        }).then((resp) => { this.update();
        }).catch(err => {swal("Error!", `Couldn't update drinks. Error: ${err}`, "error");
        });
    };
    render() {
        return (
        <Modal open={this.props.open}>
            <div className="add-modal">
                <IconButton color="secondary" className="close-button" onClick={this.props.close}>
                    <CloseButton color="secondary" style={{ fontSize: 14 }}/>
                </IconButton>
                <Typography variant="h5" style={{textAlign: "center"}}>Add a purchase</Typography>
                <TextField id="location-value" className="add-input" label="Location"/>
                <TextField id="name-value" className="add-input" margin="dense" label="Drink name"/>
                <TextField id="price-value" className="add-input" margin="dense" label="Price" />
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
                <TextField id="description-value" className="add-input" label="Description"/>
                <div className="add-button-holder">
                    <Button onClick={this.saveDrink} className="add-button">ADD</Button>
                </div>
            </div>
        </Modal>
        )
    }
}

export default withRouter(Add);
