import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import 'date-fns'; 
import Swal from 'sweetalert2';
import DateFnsUtils from '@date-io/date-fns';
import {withRouter} from 'react-router-dom';
import {MuiPickersUtilsProvider, DateTimePicker} from 'material-ui-pickers';
import {add, edit} from '../../controller';
import {TextInput, Card} from '../../components';
import FirebaseUser from '../../controller/backend';
import StarRatingComponent from 'react-star-rating-component';
import {ReactComponent as StarEmptyIcon} from './star_empty.svg';
import {ReactComponent as StarFilledIcon} from './star_filled.svg';
import Select from 'react-select';
import backend from '../../controller/backend';
import './Add.scss';

const Add = ({pageTitle, buttonTitle, editData, history}) => {
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
    const handlePriceChange = e => {if((e.target.value).match(/^-?\d*\.?\d*$/)) setPrice(e.target.value)}
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
            Swal.fire('Oops...', t('Please enter a valid price to add drink'), 'error');
            setCanAdd(true);
            return;
        }
        if(editData?.id === undefined || editData?.id === null) await add(data);
        else await edit(data, editData.id);

        clearForm();
        setCanSave(true);
        setCanAdd(true);
        history.push('/dash');
    };

    const saveDrink = (e) => {
        e.preventDefault();
        if(name === ''){
            Swal.fire('Can\'t save drink without name', 'Please add a name to save to the autofill list', 'error');
            return;
        }
        if(!canSave) return;
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
        FirebaseUser.user.setAutofill(data).then(() => {
            setAutofill(data);
            localStorage.setItem('autofill', JSON.stringify(data));
            Swal.fire('Saved!', 'You can now autofill your next purchase with these drink details.', 'success');
        }).catch((err) => {
            setCanSave(true);
            console.log(err);
            Swal.fire('Whoops!', 'Something went wrong...', 'error');
        });
    }
    const autofillSelect = (data) => {
        Swal.fire({
            showCancelButton: true,
            html: 'use or remove entry? <br />(click outside to cancel)',
            cancelButtonText: '🗑️',
            confirmButtonText: 'fill',
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
                backend.user.setAutofill(updated).then(() => {
                    localStorage.setItem('autofill', JSON.stringify(updated));
                    setAutofill(updated);
                }).catch((err) => {
                    console.log(err);
                    Swal.fire('Ooops', 'Something went wrong...', 'error');
                });
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

                    <TextInput value={location} onChange={handleTextChange(setLocation)} autofocus label={t("Location")} id="location-input"/>
                    <TextInput value={name} onChange={handleTextChange(setName)} label={t("Drink Name")} id="name-input"/>
                    <TextInput value={price} onChange={handlePriceChange} label={t("Price")} id="name-input" type="text"/>
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
                        <button
                            disabled={!canSave}
                            id="save-drink--button"
                            onClick={saveDrink}
                            className={`text ${canSave ? '' : 'saved'}`}
                        >
                            {canSave ? t('SAVE') : t('SAVED')}
                        </button>
                        <div></div>
                        <button
                            disabled={!canAdd}
                            id="add-drink--button"
                            onClick={addDrink}
                            className="text"
                        >
                            {t(buttonTitle ?? 'ADD')}
                        </button>
                    </div>
                </div>
            </Card>
        </form>
    );
}

export default withRouter(Add);