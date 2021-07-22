import { memo } from 'react';
import { Card } from '../../../../components';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import useAutofill from '../../controllers/hooks/useAutofill';
import cn from './AutofillManager.module.scss';

const AutofillManager = ({ form, setForm }) => {
	const { autofill, add } = useAutofill();

	const save = e => {
		e.preventDefault();
		const savedData = { ...form, price: form.price * 100 };
		delete savedData.date;
		add(savedData);
	};

	const set = entry => e => {
		e.preventDefault();
		setForm(prevForm => ({ ...prevForm, ...entry, price: entry.price / 100 }));
	};

	return (
		<div className={cn.container}>
			<div className={cn.create} onClick={save}>
				Click here to save current form
			</div>
			{autofill.map(entry => (
				<Card
					key={entry.value}
					className={cn.item}
					onClick={set(entry)}
				>
					{entry.name && (
						<p>
							<span>name </span> {entry.name}
						</p>
					)}
					{entry.location && (
						<p>
							<span>location </span> {entry.location}
						</p>
					)}
					{entry.price && (
						<p>
							<span>price </span> $
							{(entry.price / 100).toFixed(2)}
						</p>
					)}
					{(entry.rating === 0 || entry.rating) && (
						<p>
							<span>rating </span> {entry.rating}
							<StarRateRoundedIcon className={cn.star} />
						</p>
					)}
					{entry.description && (
						<p>
							<span>description </span> {entry.description}
						</p>
					)}
				</Card>
			))}
		</div>
	);
};

export default memo(AutofillManager);
