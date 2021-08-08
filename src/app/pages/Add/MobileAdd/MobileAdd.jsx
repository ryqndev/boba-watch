import { memo, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import 'date-fns';
import Swal from 'sweetalert2';
import {
	alertEmptyDrinkName,
	alertAutofillAdd,
	alertDefaultError,
} from '../../../libs/swal';
import DateFnsUtils from '@date-io/date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { add, edit } from '../../../controller';
import { TextInput, Card, StarRating } from '../../../components';
import { database as db } from '../../../libs/firestore';
import Select from 'react-select';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import { ImageUpload } from '../components';
import { DescriptionEditor } from '../components';
import './MobileAdd.scss';

const defaultForm = {
	image: '',
	price: 0,
	date: new Date().toISOString(),
};

const MobileAdd = ({ pageTitle, buttonTitle }) => {
	const [user] = useContext(AuthUserContext);
	const { t } = useTranslation();
	const {id} = useParams();
	const [form, setForm] = useState(defaultForm);
	const [disabled, setDisabled] = useState(false);
	const [autofill, setAutofill] = useState([]);
	const [canSave, setCanSave] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setAutofill(JSON.parse(localStorage.getItem('autofill') ?? '[]'));
	}, []);

	useEffect(() => {
		if(id) setForm(JSON.parse(localStorage.getItem(id)));
	}, [id]);

	const handleChange = (key, limit) => e => {
		e.preventDefault();
		editForm(key, e.target.value, limit);
	};

	const editForm = (key, value, limit = 80) => {
		if(typeof limit === 'function'){
			if(!limit(value)) return;
		}else{
			if (value.length >= limit) return;
		}
		setForm(prev => ({ ...prev, [key]: value }));
	};

	const submit = async e => {
		e.preventDefault();
		setDisabled(true);

		if (!id) await add({ drink: form }, user.uid);
		else await edit({ drink: form }, id, user.uid);

		setForm(defaultForm);
		setDisabled(false);
		navigate('/history');
	};

	const saveDrink = e => {
		e.preventDefault();
		if (form.name === '') return alertEmptyDrinkName();
		if (!canSave) return;
		let data = [
			...autofill,
			{
				name: form.name,
				location: form.location,
				price: parseInt(parseFloat(form.price) * 100),
				description: form.description,
				rating: form.rating,
				label: form.name,
				value: form.name + new Date().toISOString(),
			},
		];
		setCanSave(false);
		db.collection(`users/${user.uid}/user`)
			.doc('autofill')
			.set({ data: JSON.stringify(data) })
			.then(() => {
				setAutofill(data);
				localStorage.setItem('autofill', JSON.stringify(data));
				alertAutofillAdd();
			})
			.catch(err => {
				setCanSave(true);
				alertDefaultError(err);
			});
	};
	const autofillSelect = data => {
		Swal.fire({
			showCancelButton: true,
			html: 'use or remove entry? <br />(click outside to cancel)',
			cancelButtonText: 'remove',
			confirmButtonText: 'autofill',
			cancelButtonColor: '#f44',
			reverseButtons: true,
		}).then(result => {
			if (result.value) {
				setForm(data);
			} else if (result.dismiss === 'cancel') {
				let updated = [...autofill];
				updated.splice(
					updated.findIndex(e => e.value === data.value),
					1
				);
				db.collection(`users/${user.uid}/user`)
					.doc('autofill')
					.set({ data: JSON.stringify(updated) })
					.then(() => {
						localStorage.setItem(
							'autofill',
							JSON.stringify(updated)
						);
						setAutofill(updated);
					})
					.catch(alertDefaultError);
			}
		});
	};

	return (
		<div className='page with-user'>
			<form className='add-modal' onSubmit={submit}>
				<h4 className='bw title'>{t(pageTitle ?? 'Add a Purchase')}</h4>
				<Card className='add-holder'>
					<h5>{t("WHAT'S THE TEA?")}</h5>
					<div className='content'>
						<label className='autofill-label'>
							Autofill with saved entry:
						</label>
						<Select
							options={autofill}
							name='autofill'
							onChange={autofillSelect}
							className='autofill-select'
						/>
						<div className='autofill-divider'>
							or add a new drink:
						</div>
						<TextInput
							value={form.location ?? ''}
							onChange={handleChange('location', 250)}
							label={'Location'}
						/>
						<TextInput
							value={form.name ?? ''}
							onChange={handleChange('name', 150)}
							label={'Drink Name'}
						/>
						<TextInput
							value={form.price ?? 0}
							onChange={handleChange('price', val => val.match(/^-?\d*\.?\d*$/) && val.length < 10)}
							label={'Price'}
							type='text'
						/>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DateTimePicker
								label={'Date'}
								value={form.date}
								onChange={date => editForm('date', date, 30)}
								inputProps={{ maxLength: 100 }}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<StarRating rating={form.rating} setRating={val => editForm('rating', val)} />
					<div className='content'>
						<ImageUpload
							image={form.image}
							setImage={link => editForm('image', link)}
						/>
						{/* <textarea
							id='description-input'
							value={form.description ?? ''}
							rows={10}
							onChange={handleChange('description', 1000)}
							placeholder={'How was your drink?'}
						/> */}
						<DescriptionEditor
							description={form.description ?? ''}
							setDescription={val =>
								editForm('description', val, 2500)
							}
						/>
						<div className='add-button-holder'>
							<button
								type='button'
								disabled={!canSave}
								onClick={saveDrink}
								className={`text save ${
									canSave ? '' : 'saved'
								}`}
							>
								{canSave ? t('SAVE') : t('SAVED')}
							</button>
							<div></div>
							<button
								type='submit'
								disabled={disabled}
								className='text'
							>
								{t(buttonTitle ?? 'ADD')}
							</button>
						</div>
					</div>
				</Card>
			</form>
		</div>
	);
};

export default memo(MobileAdd);
