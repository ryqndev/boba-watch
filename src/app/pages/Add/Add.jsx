import React, {useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import 'date-fns'; 
import Swal from 'sweetalert2';
import {alertInvalidDrinkPrice, alertEmptyDrinkName, alertAutofillSuccess, alertDefaultError} from '../../libs/swal';
import DateFnsUtils from '@date-io/date-fns';
import {withRouter} from 'react-router-dom';
import {MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import {add, edit} from '../../controller';
import {TextInput, Card, StarRating} from '../../components';
import {database as db} from '../../libs/firestore';
import Select from 'react-select';
import './Add.scss';
import AuthUserContext from '../../controller/contexts/AuthUserContext';

const Add = ({pageTitle, buttonTitle, editData, history}) => {
    const [authUser] = useContext(AuthUserContext);
    const {t} = useTranslation();
    const [name, setName] = useState(editData?.name ?? '');
    const [location, setLocation] = useState(editData?.location ?? '');
    const [price, setPrice] = useState(editData?.price ?? '');
    const [date, setDate] = useState(editData?.date ?? new Date());
    const [rating, setRating] = useState(editData?.rating ?? 0);
    const [description, setDescription] = useState(editData?.description ?? '');
    const [autofill, setAutofill] = useState([]);
    const [canAdd, setCanAdd] = useState(true);
    const [canSave, setCanSave] = useState(true);

    useEffect(() => {
        setAutofill(JSON.parse(localStorage.getItem('autofill') ?? '[]'));
    }, []);

    useEffect(() => {
        setName(editData?.name ?? '');
        setLocation(editData?.location ?? '');
        setPrice(editData?.price == null ? '' : (editData.price / 100));
        setDate(editData?.date ?? new Date());
        setRating(editData?.rating ?? 0);
        setDescription(editData?.description ?? '');
    }, [editData]);

    const clearForm = () => {
        setName('');
        setLocation('');
        setPrice('');
        setDate(new Date());
        setRating(0);
        setDescription('');
    }

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
    const handlePriceChange = e => {if((e.target.value).match(/^-?\d*\.?\d*$/) && e.target.value.length < 8) setPrice(e.target.value)}
    const handleDateChange = (date) => {setDate(date)}

    const addDrink = async(e) => {
        e.preventDefault();
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
            alertInvalidDrinkPrice();
            return setCanAdd(true);
        }
        if(editData?.id === undefined || editData?.id === null) await add(data, authUser.uid);
        else await edit(data, editData.id, authUser.uid);

        clearForm();
        setCanSave(true);
        setCanAdd(true);
        history.push('/history');
    };

    const saveDrink = (e) => {
        e.preventDefault();
        if(name === '') return alertEmptyDrinkName();
        if(!canSave)    return;
        let data = [
            ...autofill,
            {
                name: name,
                location: location,
                price: parseInt(parseFloat(price) * 100),
                description: description,
                rating: rating,
                label: name,
                value: name + new Date().toISOString()
            }
        ];
        setCanSave(false);
        db.collection(`users/${authUser.uid}/user`).doc('autofill').set({data: JSON.stringify(data)}).then(() => {
            setAutofill(data);
            localStorage.setItem('autofill', JSON.stringify(data));
            alertAutofillSuccess();
        }).catch((err) => {
            setCanSave(true);
            alertDefaultError(err);
        });
    }
    const autofillSelect = (data) => {
        Swal.fire({
            showCancelButton: true,
            html: 'use or remove entry? <br />(click outside to cancel)',
            cancelButtonText: 'remove',
            confirmButtonText: 'autofill',
            cancelButtonColor: '#f44',
            reverseButtons: true,
        }).then((result) => {
            if(result.value){
                setName(data.name);
                setLocation(data.location);
                setPrice(data.price/100);
                setRating(data.rating);
                setDescription(data.description);
            }else if(result.dismiss === 'cancel'){
                let updated = [...autofill];
                updated.splice(updated.findIndex(e => e.value === data.value), 1);
                db.collection(`users/${authUser.uid}/user`).doc('autofill').set({data: JSON.stringify(updated)}).then(() => {
                    localStorage.setItem('autofill', JSON.stringify(updated));
                    setAutofill(updated);
                }).catch(alertDefaultError);
            }
        })
    }
    
    return (
        <form className="add-modal">
            <h4 className="bw title">{t(pageTitle ?? 'Add a Purchase')}</h4>
            <Card className="add-holder">
                <h5>{t("WHAT'S THE TEA?")}</h5>
                <div className="content">
                    <label className="autofill-label">Autofill with saved entry:</label>
                    <Select 
                        options={autofill}
                        name='autofill'
                        onChange={autofillSelect}
                        className='autofill-select'
                    />
                    <div className="autofill-divider">or add a new drink:</div>
                    <TextInput value={location} onChange={handleTextChange(setLocation)} label={t("Location")} id="location-input"/>
                    <TextInput value={name} onChange={handleTextChange(setName)} label={t("Drink Name")} id="name-input"/>
                    <TextInput value={price} onChange={handlePriceChange} label={t("Price")} id="price-input" type="text"/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            id="date-value"
                            className="add-input"
                            format="M/d/yyyy h:mm"
                            label={t("Date")}
                            value={date}
                            onChange={handleDateChange}
                            inputProps={{ maxLength: 100 }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <StarRating rating={rating} setRating={setRating} />
                <div className="content">
                    <textarea
                        value={description}
                        rows={10}
                        onChange={handleTextChangeDescription(setDescription)}
                        id="description-input"
                        placeholder={t("How was your drink?")}
                    />
                    <div className="add-button-holder">
                        <button disabled={!canSave} onClick={saveDrink} className={`text save ${canSave ? '' : 'saved'}`}>
                            {canSave ? t('SAVE') : t('SAVED')}
                        </button>
                        <div></div>
                        <button disabled={!canAdd} onClick={addDrink} className="text">
                            {t(buttonTitle ?? 'ADD')}
                        </button>
                    </div>
                </div>
            </Card>
        </form>
    );
}

export default withRouter(Add);