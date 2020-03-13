import React, {useState, useEffect} from 'react';
import 'date-fns'; 
import Swal from 'sweetalert2';
import {IconButton} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DateTimePicker} from 'material-ui-pickers';
import CloseButton from '@material-ui/icons/Close';
import stats from '../../controller/calculateStatistics.js';
import FirebaseUser from '../../controller/backend.js';
import {Modal, TextInput} from '../../components';
import './Add.scss';

const Edit = ({open, setOpen, edit, setDrinkids}) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');

    useEffect(() => {
        if(edit !== null){
            setName(edit.name);
            setLocation(edit.location);
            setPrice(edit.price/100);
            setDate(edit.date);
            setDescription(edit.description);
        }
    }, [open, edit]);

    const handleTextChange = setInput => e => {
        e.preventDefault();
        if(e.target.value.length >= 80) return;
        setInput(e.target.value);
    }
    const handlePriceChange = e => {(e.target.value).match(/^-?\d*\.?\d*$/) && setPrice(e.target.value)}
    const handleDateChange = date => {setDate(date)}
    const finishUpdate = () => {
        document.getElementById('add-drink--button').disabled = false;
        stats.deleteDrink(edit.id, FirebaseUser.get.currentUser.drinkids);
        stats.addDrink({drink: {
            name: name,
            location: location,
            price: parseInt(parseFloat(price) * 100),
            date: new Date(date).toISOString(),
            description: description
        }}, edit.id, FirebaseUser.get.currentUser.drinkids);
        FirebaseUser.user.updateStats();
        setDrinkids(FirebaseUser.get.currentUser.drinkids);
        edit.update();
        setOpen(!open);
    }
    const addDrink = () => {
        document.getElementById('add-drink--button').disabled = true;
        let data = {
            drink: {
                name: name,
                location: location,
                price: parseInt(parseFloat(price) * 100),
                date: new Date(date).toISOString(),
                description: description
            }
        }
        // validate price
        if (isNaN(data.drink.price)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid price to add drink'
            });
            return document.getElementById('add-drink--button').disabled = false;
        }
        FirebaseUser.drinks.update(data, edit.id, finishUpdate);
    };

    return (
        <Modal open={open}>
            <div className="add-modal">
                <IconButton color="secondary" className="close-button" onClick={() => {setOpen(!open)}}>
                    <CloseButton color="secondary"/>
                </IconButton>
                <h5>Add a purchase</h5>
                <TextInput value={location} onChange={handleTextChange(setLocation)} label="Location" id="location-input"/>
                <TextInput value={name} onChange={handleTextChange(setName)} label="Drink Name" id="name-input"/>
                <TextInput value={price} onChange={handlePriceChange} label="Price" id="name-input" type="tel"/>
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
                <TextInput value={description} onChange={handleTextChange(setDescription)} label="Description" id="description-input"/>
                <div className="add-button-holder">
                    <button id="add-drink--button" onClick={addDrink} className="text">{'EDIT'}</button>
                </div>
            </div>
        </Modal>
    );
}

export default Edit;
