import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import 'date-fns'; 
import Swal from 'sweetalert2';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DateTimePicker} from 'material-ui-pickers';
import {add, edit} from '../../controller';
import {TextInput, Card} from '../../components';
import StarRatingComponent from 'react-star-rating-component';
import {ReactComponent as StarEmptyIcon} from './star_empty.svg';
import {ReactComponent as StarFilledIcon} from './star_filled.svg';
import './Add.scss';

const Add = ({pageTitle, buttonTitle, editData}) => {
    const {t} = useTranslation();
    const [name, setName] = useState(editData?.name ?? '');
    const [location, setLocation] = useState(editData?.location ?? '');
    const [price, setPrice] = useState(editData?.price ?? '');
    const [date, setDate] = useState(editData?.date ?? new Date());
    const [rating, setRating] = useState(editData?.rating ?? 0);
    const [description, setDescription] = useState(editData?.description ?? '');
    const [canAdd, setCanAdd] = useState(true);

    useEffect(() => {
        setName(editData?.name ?? '');
        setLocation(editData?.location ?? '');
        setPrice(editData?.price == null ? '' : (editData.price / 100));
        setDate(editData?.date ?? new Date());
        setRating(editData?.rating ?? 0);
        setDescription(editData?.description ?? '');
    }, [editData]);

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
    const clearForm = () => {
        setName('');
        setLocation('');
        setPrice('');
        setDate(new Date());
        setRating(0);
        setDescription('');
    }

    const addDrink = async() => {
        setCanAdd(false);
        let data = {drink: {
            name: name,
            location: location,
            price: parseInt(parseFloat(price) * 100),
            date: new Date(date).toISOString(),
            description: description,
            rating: rating
        }} 
        if (isNaN(data.drink.price)){
            Swal.fire('Oops...', t('Please enter a valid price to add drink'), 'error');
            setCanAdd(true);
            return;
        }
        if(editData?.id === undefined || editData?.id === null) await add(data);
        else await edit(data, editData.id);

        clearForm();
        setCanAdd(true);
    };
    
    return (
        <div className="add-modal">
            <h4 className="bw title">{t(pageTitle ?? 'Add a Purchase')}</h4>
            <Card className="add-holder">
                <h5>{t("WHAT'S THE TEA?")}</h5>
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
                        <StarRatingComponent 
                            name="rating" 
                            starCount={5}
                            value={rating}
                            renderStarIcon={(i, v) => (i <= v ? <StarFilledIcon /> : <StarEmptyIcon />)}
                            onStarClick={(v) => {setRating(v)}}
                            onStarHover={(v) => {setRating(v)}}
                        />
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
                        <button disabled={!canAdd} id="add-drink--button" onClick={addDrink} className="text">{t(buttonTitle ?? 'ADD')}</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Add;