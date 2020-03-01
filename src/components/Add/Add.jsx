import React, { useState, useEffect } from 'react';
import 'date-fns'; 
import Swal from 'sweetalert2';
import { IconButton } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import CloseButton from '@material-ui/icons/Close';
import stats from '../calculateStatistics.js';
import FirebaseUser from '../firebaseCalls.js';
import TextInput from '../globals/TextInput';
import Modal from '../globals/Modal';
import './Add.scss';

const Add = ({open, setOpen, edit}) => {
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');

    const handleTextChange = setInput => e => {
        e.preventDefault();
        if(e.target.value.length >= 80) return;
        setInput(e.target.value);
    }
    const handlePriceChange = e => {
        if((e.target.value).match(/^-?\d*\.?\d*$/))
            setPrice(e.target.value)
    }
    const handleDateChange = (date) => {setDate(date)}
    const closeAddModal = () => {
        setOpen(!open);
        setName('');
        setLocation('');
        setPrice('');
        setDate(new Date());
        setDescription('');
        setId(null);
    }
    const finishAdd = (resp) => {
        document.getElementById('add-drink--button').disabled = false;
        resp.get().then(r => {
            addLocally(r.data(), r.id);
        })
    }
    const addLocally = (data, id) => {
        stats.addDrink(data, id);
        FirebaseUser.user.updateStats();
        closeAddModal();
    }
    const finishUpdate = () => {
        document.getElementById('add-drink--button').disabled = false;
        stats.deleteDrink(id);
        stats.addDrink({drink: {
            name: name,
            location: location,
            price: parseInt(parseFloat(price) * 100),
            date: new Date(date).toISOString(),
            description: description
        }}, id);
        FirebaseUser.user.updateStats();
        closeAddModal();
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
        if(id === null){
            console.log("This is an add operation");
            return FirebaseUser.drinks.add(data, finishAdd);
        }
        console.log("This is an update operation")
        FirebaseUser.drinks.update(data, id, finishUpdate);
    };

    useEffect(() => {
        if(edit !== null){
            setId(edit.id);
            setLocation(edit.location);
            setName(edit.name);
            setPrice(edit.price);
            setDate(edit.date);
            setDescription(edit.description);
        }
    }, [open, edit]);

    return (
        <Modal open={open}>
            <div className="add-modal">
                <IconButton color="secondary" className="close-button" onClick={closeAddModal}>
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
                    <button id="add-drink--button" onClick={addDrink} className="text">ADD</button>
                </div>
            </div>
        </Modal>
    );
}

export default Add;
