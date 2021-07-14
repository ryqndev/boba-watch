import React, { useState, useEffect, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import 'date-fns';
import Swal from 'sweetalert2';
import {
	alertInvalidDrinkPrice,
	alertEmptyDrinkName,
	alertAutofillSuccess,
	alertDefaultError,
} from '../../../libs/swal';
import DateFnsUtils from '@date-io/date-fns';
import { useNavigate } from 'react-router-dom';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { add, edit } from '../../../controller';
import { TextInput, Card, StarRating } from '../../../components';
import { database as db, firebase } from '../../../libs/firestore';
import Select from 'react-select';
import './MobileAdd.scss';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import { onError } from '../../../libs/analytics';
import { deleteImage } from '../../../libs/cloud-storage';

const MobileAdd = ({ pageTitle, buttonTitle, editData }) => {
	const [user] = useContext(AuthUserContext);
	const { t } = useTranslation();
	const [name, setName] = useState(editData?.name ?? '');
	const [image, setImage] = useState(editData?.image ?? '');
	const [imagePreview, setImagePreview] = useState('');
	const [location, setLocation] = useState(editData?.location ?? '');
	const [price, setPrice] = useState(editData?.price ?? '');
	const [date, setDate] = useState(editData?.date ?? new Date());
	const [rating, setRating] = useState(editData?.rating ?? 0);
	const [description, setDescription] = useState(editData?.description ?? '');
	const upload = useRef(null);
	const [uploadProgress, setUploadProgress] = useState(-1);
	const [autofill, setAutofill] = useState([]);
	const [canAdd, setCanAdd] = useState(true);
	const [canSave, setCanSave] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setAutofill(JSON.parse(localStorage.getItem('autofill') ?? '[]'));
	}, []);
	useEffect(() => {
		setName(editData?.name ?? '');
		setLocation(editData?.location ?? '');
		setPrice(editData?.price == null ? '' : editData.price / 100);
		setDate(editData?.date ?? new Date());
		setImage(editData?.image ?? '');
		setRating(editData?.rating ?? 0);
		setDescription(editData?.description ?? '');
	}, [editData]);
	const handleTextChange = setInput => e => {
		e.preventDefault();
		if (e.target.value.length >= 80) return;
		setInput(e.target.value);
	};
	const handleTextChangeDescription = setInput => e => {
		e.preventDefault();
		if (e.target.value.length >= 300) return;
		setInput(e.target.value);
	};
	const handlePriceChange = e => {
		if (e.target.value.match(/^-?\d*\.?\d*$/) && e.target.value.length < 10)
			setPrice(e.target.value);
	};
	const handleDateChange = date => {
		setDate(date);
	};
	const addDrink = async e => {
		e.preventDefault();
		setCanAdd(false);
		let data = {
			drink: {
				name: name,
				location: location,
				price: parseInt(parseFloat(price) * 100),
				date: new Date(date).toISOString(),
				image: image,
				description: description,
				rating: rating,
			},
		};
		if (isNaN(data.drink.price)) {
			alertInvalidDrinkPrice();
			return setCanAdd(true);
		}
		if (editData?.id === undefined || editData?.id === null)
			await add(data, user.uid);
		else await edit(data, editData.id, user.uid);

		setName('');
		setLocation('');
		setPrice('');
		setDate(new Date());
		setRating(0);
		setDescription('');
		setImage('');
		setUploadProgress(-1);
		setCanSave(true);
		setCanAdd(true);
		navigate('/history');
	};
	const saveDrink = e => {
		e.preventDefault();
		if (name === '') return alertEmptyDrinkName();
		if (!canSave) return;
		let data = [
			...autofill,
			{
				name: name,
				location: location,
				price: parseInt(parseFloat(price) * 100),
				description: description,
				rating: rating,
				label: name,
				value: name + new Date().toISOString(),
			},
		];
		setCanSave(false);
		db.collection(`users/${user.uid}/user`)
			.doc('autofill')
			.set({ data: JSON.stringify(data) })
			.then(() => {
				setAutofill(data);
				localStorage.setItem('autofill', JSON.stringify(data));
				alertAutofillSuccess();
			})
			.catch(err => {
				setCanSave(true);
				alertDefaultError(err);
			});
	};
	const imageUpload = async e => {
		let file = upload?.current?.files?.[0];
		if (file.size > 5000000) {
			Swal.fire(
				'File too large',
				'Try a smaller image less than 5MB. Appreciate the high quality images but to keep Boba Watch free, we gotta do it like this. :(',
				'error'
			);
			upload.current.value = '';
			return;
		}
		if (imagePreview !== '') deleteImage(image);

		const serverFilePath = `drinks/${
			user.uid
		}/post-${new Date().valueOf()}`;
		let uploadTask = firebase
			.storage()
			.ref()
			.child(serverFilePath)
			.put(file);

		uploadTask.on(
			'state_changed',
			snapshot => {
				setUploadProgress(
					parseInt(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					)
				);
			},
			error => {
				error.code === 'storage/canceled'
					? setUploadProgress(-1)
					: onError(JSON.stringify(error));
			},
			() => {
				setImage(serverFilePath);
				uploadTask.snapshot.ref
					.getDownloadURL()
					.then(function (downloadURL) {
						setImagePreview(downloadURL);
					});
			}
		);
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
				setName(data.name);
				setLocation(data.location);
				setPrice(data.price / 100);
				setRating(data.rating);
				setDescription(data.description);
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
	
	const uploadStatus = (
		startState = '',
		progressState = '',
		finishedState = ''
	) => {
		if (uploadProgress < 0) return startState;
		if (uploadProgress < 100) return progressState;
		return finishedState;
	};

	return (
		<div className='page with-user'>
			<form className='add-modal' onSubmit={addDrink}>
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
							value={location}
							onChange={handleTextChange(setLocation)}
							label={t('Location')}
							id='location-input'
						/>
						<TextInput
							value={name}
							onChange={handleTextChange(setName)}
							label={t('Drink Name')}
							id='name-input'
						/>
						<TextInput
							value={price}
							onChange={handlePriceChange}
							label={t('Price')}
							id='price-input'
							type='text'
						/>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DateTimePicker
								id='date-value'
								className='add-input'
								format='M/d/yyyy h:mm'
								label={t('Date')}
								value={date}
								onChange={handleDateChange}
								inputProps={{ maxLength: 100 }}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<StarRating rating={rating} setRating={setRating} />
					<div className='content'>
						<label
							className={`upload-image ${uploadStatus(
								'',
								'uploading',
								'uploaded'
							)}`}
						>
							{imagePreview !== '' && (
								<img
									className='upload-preview'
									src={imagePreview}
									alt='upload-preview'
								/>
							)}
							{uploadStatus('UPLOAD AN IMAGE', 'UPLOADING...')}
							<input
								type='file'
								ref={upload}
								onChange={imageUpload}
								accept='image/png,image/jpeg'
							/>
							<br />
							{uploadStatus(
								'',
								<progress
									max='100'
									value={uploadStatus(0, uploadProgress, 100)}
								></progress>,
								''
							)}
						</label>
						<textarea
							value={description}
							rows={10}
							onChange={handleTextChangeDescription(
								setDescription
							)}
							id='description-input'
							placeholder={t('How was your drink?')}
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
								disabled={!canAdd}
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

export default MobileAdd;
