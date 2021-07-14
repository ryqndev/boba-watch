import { memo, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { add, edit } from '../../../controller';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import 'date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {
	alertEmptyDrinkName,
	alertAutofillSuccess,
	alertDefaultError,
} from '../../../libs/swal';
import cn from './DesktopAdd.module.scss';

const defaultForm = {
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

	const editForm = (key, value) => {
		setForm(prev => ({ ...prev, [key]: value }));
	};

	const submit = async e => {
		e.preventDefault();
		setDisabled(false);

		if (!id) await add({ drink: form }, user.uid);
		else await edit({ drink: form }, id, user.uid);

		setForm(defaultForm);
		setDisabled(true);
		navigate('/history');
	};

	return (
		<div className={cn.wrapper}>
			<main>
				<header>
					<h1 className={cn.title}>
						{id ? 'EDIT' : 'ADD'} A PURCHASE
					</h1>
				</header>
				<form onSubmit={submit}>
					<fieldset disabled={disabled}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DateTimePicker
								id='date-value'
								className='add-input'
								format='M/d/yyyy h:mm'
								label={'Date'}
								value={form.date}
								onChange={(date) => editForm('date', date)}
								inputProps={{ maxLength: 100 }}
							/>
						</MuiPickersUtilsProvider>
						<button>{id ? 'UPDATE' : 'ADD'}</button>
					</fieldset>
				</form>
			</main>
		</div>
	);
};

export default memo(DesktopAdd);
