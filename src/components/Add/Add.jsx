import React, { useState } from 'react';
import 'date-fns'; 
import Swal from 'sweetalert2';
import { Typography, TextField, Button, IconButton, Modal } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import CloseButton from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import stats from '../calculateStatistics';
import backend from '../firebaseCalls';
import './Add.css';

const Add = ({open, setOpen}) => {
    const [date, setDate] = useState(new Date());
    const handleDateChange = (date) => {setDate(date)}
    const closeAddModal = () => {setOpen(!open)}
    const update = ( resp ) => {
        document.getElementById('add-drink--button').disabled = false;
        resp.get().then(r => {
            addLocally(r.data(), r.id);
        })
    }
    const addLocally = (data, id) => {
        stats.addDrink(data, id);
        backend.user.updateStats();
        closeAddModal();
        setDate(new Date());
    }
    const addDrink = () => {
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid price to add drink'
              })
            return document.getElementById('add-drink--button').disabled = false;
        }
        backend.drinks.add(data, update);
    };
    return (
        <Modal open={open}>
            <div className="add-modal">
                <IconButton color="secondary" className="close-button" onClick={closeAddModal}>
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
                        value={date}
                        onChange={handleDateChange}
                        inputProps={{ maxLength: 100 }}
                    />
                </MuiPickersUtilsProvider>
                <TextField id="description-value" className="add-input" label="Description" inputProps={{ maxLength: 1000 }}/>
                <div className="add-button-holder">
                    <Button id="add-drink--button" onClick={addDrink} className="add-button">ADD</Button>
                </div>
            </div>
        </Modal>
    );
}

export default withRouter(Add);
