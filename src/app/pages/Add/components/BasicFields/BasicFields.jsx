import { memo } from 'react';
import 'date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { TextInput, StarRating, LocationTagIndicator } from '../../../../components';
import { LocationInput } from '../';
import cn from './BasicFields.module.scss';
import { enUS, zhCN } from 'date-fns/locale';
  

const BasicFields = ({ form, setForm, handleChange, editForm }) => {
	const { t, i18n } = useTranslation();
	

	return (
		<div className={cn.container}>
			<LocationTagIndicator className={cn.tag} address={form?.address} />
			<LocationInput form={form} onChange={editForm} setForm={setForm} />
			<TextInput
				value={form.name ?? ''}
				onChange={handleChange('name', 150)}
				label={t('drink name')}
			/>
			<TextInput
				value={form.price ?? 0}
				onChange={handleChange(
					'price',
					val => val.match(/^-?\d*\.?\d*$/) && val.length < 10
				)}
				label={t('price')}
				type='text'
			/>
			
			<div className={cn.divider}>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={i18n.language === 'zh' ? zhCN : enUS}>
					<DateTimePicker
						label={t('date')}
						value={form.date}
						format="M/dd/yy - h:mm a"
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
