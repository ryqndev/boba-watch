import { memo, useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { add, edit } from '../../../controller';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import 'date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ImageUpload } from '../components';
import { TextInput, Card, StarRating } from '../../../components';
import { alertAutofillSuccess, alertDefaultError } from '../../../libs/swal';
import cn from './DesktopAdd.module.scss';

const defaultForm = {
	image: '',
	price: 0,
	date: new Date().toISOString(),
};

/**
 * Component uses {id} variable passed in from parameter to distinguish
 * between edit and add pages
 */
const DesktopAdd = ({ editData }) => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [user] = useContext(AuthUserContext);
	const [form, setForm] = useState(defaultForm);
	const [disabled, setDisabled] = useState(false);

	const handleChange = (key, limit) => e => {
		e.preventDefault();
		editForm(key, e.target.value, limit);
	};

	const editForm = (key, value, limit = 80) => {
		if (typeof limit === 'function') {
			if (!limit(value)) return;
		} else {
			if (value.length >= limit) return;
		}
		setForm(prev => ({ ...prev, [key]: value }));
	};

	const submit = async e => {
		e.preventDefault();
		setDisabled(true);

		const data = { drink: form };
		data.drink.price = parseInt(parseFloat(form.price) * 100);

		if (!id) await add(data, user.uid);
		else await edit(data, id, user.uid);

		setForm(defaultForm);
		setDisabled(false);
		navigate('/history');
	};

	useEffect(() => {
		if (!id) return;
		const data = JSON.parse(localStorage.getItem(id));
		data.price = data.price / 100;
		setForm(data);
	}, [id]);

	return (
		<div className={cn.wrapper}>
			<main>
				<header>
					<h1 className={cn.title}>
						{id ? 'EDIT' : 'ADD'} A PURCHASE
					</h1>
				</header>
				<div className={cn['form-wrapper']}>
					<Card>
						<form onSubmit={submit}>
							<fieldset disabled={disabled}>
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
										onChange={date =>
											editForm('date', date, 30)
										}
										inputProps={{ maxLength: 100 }}
									/>
								</MuiPickersUtilsProvider>
								<ImageUpload
									className={cn['image-upload']}
									image={form.image}
									setImage={link => editForm('image', link)}
								/>
								<textarea
									className={cn.description}
									value={form.description ?? ''}
									rows={10}
									onChange={handleChange('description', 1000)}
									placeholder={'How was your drink?'}
								/>
								<button>{id ? 'UPDATE' : 'ADD'}</button>
							</fieldset>
						</form>
					</Card>
				</div>
			</main>
		</div>
	);
};

export default memo(DesktopAdd);
