import { memo } from 'react';
import 'date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { TextInput, StarRating, LocationTagIndicator } from '../../../../components';
import { LocationInput } from '../';
import cn from './BasicFields.module.scss';

const BasicFields = ({ form, handleChange, editForm }) => {
	return (
		<div className={cn.container}>
			<LocationTagIndicator className={cn.tag} address={form?.address} />
			<LocationInput value={form.location ?? ''} onChange={editForm} />
			<TextInput
				value={form.name ?? ''}
				onChange={handleChange('name', 150)}
				label={'Drink Name'}
			/>
			<TextInput
				value={form.price ?? 0}
				onChange={handleChange(
					'price',
					val => val.match(/^-?\d*\.?\d*$/) && val.length < 10
				)}
				label={'Price'}
				type='text'
			/>
			<div className={cn.divider}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DateTimePicker
						label={'Date'}
						value={form.date}
						onChange={date => editForm('date', date, 30)}
						inputProps={{ maxLength: 100 }}
					/>
				</MuiPickersUtilsProvider>
				<StarRating
					className={cn.rating}
					rating={form.rating}
					setRating={val => editForm('rating', val)}
				/>
			</div>
		</div>
	);
};

export default memo(BasicFields);
