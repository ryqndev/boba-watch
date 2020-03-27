import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'date-fns'; 
import Swal from 'sweetalert2';
import { IconButton } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import CloseButton from '@material-ui/icons/Close';
import {add} from '../../controller';
import {TextInput, Modal} from '../../components';
import './Add.scss';

const Add = ({open, setOpen, setDrinkids}) => {
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [canAdd, setCanAdd] = useState(true);

    const handleTextChange = setInput => e => {
        e.preventDefault();
        if(e.target.value.length >= 80) return;
        setInput(e.target.value);
    }
    const handlePriceChange = e => {if((e.target.value).match(/^-?\d*\.?\d*$/)) setPrice(e.target.value)}
    const handleDateChange = (date) => {setDate(date)}
    const closeAddModal = () => {
        setOpen(!open);
        setName('');
        setLocation('');
        setPrice('');
        setDate(new Date());
        setDescription('');
    }
    const addDrink = async() => {
        setCanAdd(false);
        let data = {drink: {
            name: name,
            location: location,
            price: parseInt(parseFloat(price) * 100),
            date: new Date(date).toISOString(),
            description: description
        }} 
        if (isNaN(data.drink.price)){
            Swal.fire('Oops...', t('Please enter a valid price to add drink'), 'error');
            setCanAdd(true);
            return;
        }
        await add(data, setDrinkids);
        setCanAdd(true);
        closeAddModal();
    };
    return (
        <Modal open={open}>
            <div className="add-modal">
                <IconButton color="secondary" className="close-button" onClick={closeAddModal}>
                    <CloseButton color="secondary"/>
                </IconButton>
                <h5>{t('Add a purchase')}</h5>
                <TextInput value={location} onChange={handleTextChange(setLocation)} label={t("Location")} id="location-input"/>
                <TextInput value={name} onChange={handleTextChange(setName)} label={t("Drink Name")} id="name-input"/>
                <TextInput value={price} onChange={handlePriceChange} label={t("Price")} id="name-input" type="tel"/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        id="date-value"
                        className="add-input"
                        margin="dense"
                        format="M/d/yyyy h:mm a"
                        label={t("Date")}
                        value={date}
                        onChange={handleDateChange}
                        inputProps={{ maxLength: 100 }}
                    />
                </MuiPickersUtilsProvider>
                <TextInput value={description} onChange={handleTextChange(setDescription)} label={t("Description")} id="description-input"/>
                <div className="add-button-holder">
                    <button disabled={!canAdd} id="add-drink--button" onClick={addDrink} className="text">{t('ADD')}</button>
                </div>
            </div>
        </Modal>
    );
}

export default Add;