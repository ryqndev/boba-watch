import React, {useState, useEffect} from 'react';
import 'date-fns'; 
import Swal from 'sweetalert2';
import {IconButton} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DateTimePicker} from 'material-ui-pickers';
import CloseButton from '@material-ui/icons/Close';
import {edit} from '../../controller';
import {Modal, TextInput} from '../../components';
import './Add.scss';
import { useTranslation } from 'react-i18next';

const Edit = ({open, setOpen, drinkData, setDrinkids}) => {
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [canAdd, setCanAdd] = useState(true);

    useEffect(() => {
        if(drinkData !== null){
            setName(drinkData.name);
            setLocation(drinkData.location);
            setPrice(drinkData.price/100);
            setDate(drinkData.date);
            setDescription(drinkData.description);
        }
    }, [open, drinkData]);

    const handleTextChange = setInput => e => {
        e.preventDefault();
        if(e.target.value.length >= 80) return;
        setInput(e.target.value);
    }
    const handleTextChangeDescription = setInput => e => {
        e.preventDefault();
        if(e.target.value.length >= 300) return;
        setInput(e.target.value);
    }
    const handlePriceChange = e => {(e.target.value).match(/^-?\d*\.?\d*$/) && setPrice(e.target.value)}
    const handleDateChange = date => {setDate(date)}
    const editDrink = async() => {
        setCanAdd(false);
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
            setCanAdd(true);
            return;
        }
        await edit(data, drinkData.id, setDrinkids);
        
        setCanAdd(true);
        setOpen(!open);
    };

    return (
        <Modal open={open}>
            <div className="add-modal">
                <IconButton color="secondary" className="close-button" onClick={() => {setOpen(!open)}}>
                    <CloseButton color="secondary"/>
                </IconButton>
                <h5>Edit purchase</h5>
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
                <TextInput value={description} onChange={handleTextChangeDescription(setDescription)} label="Description" id="description-input"/>
                <div className="add-button-holder">
                    <button id="add-drink--button" disabled={!canAdd} onClick={editDrink} className="text">{t('EDIT')}</button>
                </div>
            </div>
        </Modal>
    );
}

export default Edit;
