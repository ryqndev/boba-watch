import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { useAddForm, useAutofill } from '../controllers';
import {
	TextInput,
	Card,
	StarRating,
	LocationTagIndicator,
} from '../../../components';

import { ImageUpload, LocationInput } from '../components';
import { DescriptionEditor } from '../components';
import cn from './MobileAdd.module.scss';
import clsx from 'clsx';

const MobileAdd = () => {
	const { t } = useTranslation();
	const {
		disabled,
		form,
		id,

		setForm,
		editForm,
		handleChange,
		submit,
	} = useAddForm();

	const { autofill, add, remove } = useAutofill();

	const [labelledAutofill, setLabelledAutofill] = useState([]);

	useEffect(() => {
		setLabelledAutofill(
			autofill.map(entry => ({
				label: (entry?.name ?? '[NO DRINK NAME]') + ' @ ' + (entry?.location ?? '[NO DRINK LOCATION]'),
				...entry,
			}))
		);
	}, [autofill]);

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
				setForm(prevForm => ({
					...prevForm,
					...data,
					price: data?.price ? data.price / 100 : prevForm.price,
				}));
			} else if (result.dismiss === 'cancel') {
				remove(data.value);
			}
		});
	};

	const save = e => {
		e.preventDefault();
		const savedData = { ...form, price: form.price * 100 };
		delete savedData.id;
		delete savedData.date;
		delete savedData.edited;
		delete savedData.created;
		add(savedData);
	};

	return (
		<div className='page with-user'>
			<form className={cn.container} onSubmit={submit}>
				<h4 className='bw title'>
					{t(`${id ? 'EDIT' : 'ADD'} A PURCHASE`)}
				</h4>
				<Card className={cn['add-holder']}>
					<h5>{t("WHAT'S THE TEA?")}</h5>
					<div className={cn.content}>
						<label className={cn['autofill-label']}>
							Autofill with saved entry:
						</label>
						<Select
							options={labelledAutofill}
							name='autofill'
							onChange={autofillSelect}
							className={cn['autofill-select']}
						/>
						<div className={cn['autofill-divider']}>
							or add a new drink:
						</div>
						<div className='holder'>
							<LocationTagIndicator
								className={cn.tag}
								address={form?.address}
							/>
							<LocationInput
								form={form}
								onChange={editForm}
								setForm={setForm}
							/>
						</div>
						<TextInput
							value={form.name ?? ''}
							onChange={handleChange('name', 150)}
							label={'Drink Name'}
						/>
						<TextInput
							value={form.price ?? 0}
							onChange={handleChange(
								'price',
								val =>
									val.match(/^-?\d*\.?\d*$/) &&
									val.length < 10
							)}
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
					<StarRating
						rating={form.rating}
						setRating={val => editForm('rating', val)}
					/>
					<div className={cn.content}>
						<ImageUpload
							image={form.image}
							setImage={link => editForm('image', link)}
						/>
						<DescriptionEditor
							description={form.description ?? ''}
							setDescription={val =>
								editForm('description', val, 2500)
							}
						/>
						<div className={cn['add-button-holder']}>
							<button
								type='button'
								onClick={save}
								className={clsx(cn.save, 'text')}
							>
								{t('SAVE')}
							</button>
							<div></div>
							<button
								type='submit'
								disabled={disabled}
								className={cn['text']}
							>
								{t(id ? 'EDIT' : 'ADD')}
							</button>
						</div>
					</div>
				</Card>
			</form>
		</div>
	);
};

export default memo(MobileAdd);
