import React, { Component } from 'react';
import 'date-fns';
import swal from 'sweetalert';
import './styles/add.css';
import { Typography, TextField, Button, IconButton, Modal } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import CloseButton from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import stats from './calculateStatistics';
import backend from './firebaseCalls';

export class Add extends Component {
    state = {
        selectedDate: new Date()
    }
    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        })
    };
    /**
     * @function update
     * TODO: implement live reload instead of using recalculate metrics
     * also need to do user input sanitation for reading the metrics and storing legit data
     */
    update = ( resp ) => {
        document.getElementById('add-drink--button').disabled = false;
        resp.get().then(r => {
            this.addLocally(r.data(), r.id);
        })
    }
    addLocally = (data, id) => {
        stats.addDrink(data, id);
        backend.user.updateStats();
        this.props.close();
                this.setState({
            selectedDate: new Date()
        });
    }
    /**
     * @function addDrink - called when the user submits drink information to be added.
     * Has 3 parts:
     *  1. Gets all the user filled out info
     *  2. Only required parameter is price and if not filled, throws error
     *  3. Makes api call to server to add the drink with info
     * 
     * TODO: better job of parsing the info and potentially add chips and autofill for
     * better data processing
     */
    addDrink = () => {
        document.getElementById('add-drink--button').disabled = true;
        let data = {
            drink: {
                name: document.getElementById('name-value').value,
                location: document.getElementById('location-value').value,
                price: parseInt(parseFloat(document.getElementById('price-value').value) * 100),
                date: new Date(document.getElementById('date-value').value).toISOString(),
                description: document.getElementById('description-value').value
            }
        }
        // validate price
        if (isNaN(data.drink.price)) {
            swal("Error!", `Please enter a valid price to add drink`, "error");
            document.getElementById('add-drink--button').disabled = false;
            return;
        }
        backend.drinks.add(data, this.update);
    };
    render() {
        return (
        <Modal open={this.props.open}>
            <div className="add-modal">
                <IconButton color="secondary" className="close-button" onClick={this.props.close}>
                    <CloseButton color="secondary" style={{ fontSize: 14 }}/>
                </IconButton>
                <Typography variant="h5" style={{textAlign: "center"}}>Add a purchase</Typography>
                <TextField id="location-value" className="add-input" label="Location" inputProps={{ maxLength: 250 }}/>
                <TextField id="name-value"  className="add-input" margin="dense" label="Drink name" inputProps={{ maxLength: 80 }}/>
                <TextField id="price-value" className="add-input" margin="dense" label="Price" inputProps={{ maxLength: 30 }}
                    type='number'
                    pattern="^-?[0-9]\d*\.?\d*$"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        id="date-value"
                        className="add-input"
                        margin="dense"
                        format="M/d/yyyy h:mm a"
                        label="Date"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        inputProps={{ maxLength: 100 }}
                    />
                </MuiPickersUtilsProvider>
                <TextField id="description-value" className="add-input" label="Description" inputProps={{ maxLength: 1000 }}/>
                <div className="add-button-holder">
                    <Button id="add-drink--button" onClick={this.addDrink} className="add-button">ADD</Button>
                </div>
            </div>
        </Modal>
        )
    }
}

export default withRouter(Add);
