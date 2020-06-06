import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'date-fns'; 
import Swal from 'sweetalert2';
import { IconButton } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import { add } from '../../controller';
import {TextInput, Card} from '../../components';
import './Add.scss';

const Add = () => {
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
    const handleTextChangeDescription = setInput => e => {
        e.preventDefault();
        if(e.target.value.length >= 300) return;
        setInput(e.target.value);
    }
    const handlePriceChange = e => {if((e.target.value).match(/^-?\d*\.?\d*$/)) setPrice(e.target.value)}
    const handleDateChange = (date) => {setDate(date)}

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
        await add(data);
    };
    return (
        <div className="add-modal">
            <h4 className="bw title">{t('Add a Purchase')}</h4>
            <Card className="add-holder">
                <h5>{t("What's the tea?")}</h5>
                <div className="content">
                    <TextInput value={location} onChange={handleTextChange(setLocation)} label={t("Location")} id="location-input"/>
                    <TextInput value={name} onChange={handleTextChange(setName)} label={t("Drink Name")} id="name-input"/>
                    <TextInput value={price} onChange={handlePriceChange} label={t("Price")} id="name-input" type="text"/>
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
                </div>
                <div className="rating-holder">
                    <div className="rating-select">
                        <p>
                            RATING :
                        </p>
                        <div style={{textAlign: "right"}}>⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <div className="content">
                    <textarea
                        value={description}
                        rows={10}
                        onChange={handleTextChangeDescription(setDescription)}
                        id="description-input"
                        placeholder={t("How was your drink?")}
                    />
                    <div className="add-button-holder">
                        <button disabled={!canAdd} id="add-drink--button" onClick={addDrink} className="text">{t('ADD')}</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Add;