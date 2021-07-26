import { memo } from 'react';
import { Card } from '../../../../components';
import useAutofill from '../../controllers/hooks/useAutofill';
import { SavedItemCard } from './components';
import cn from './AutofillManager.module.scss';

const AutofillManager = ({ form, setForm }) => {
	const { autofill, add, remove } = useAutofill();

	const save = e => {
		e.preventDefault();
		const savedData = { ...form, price: form.price * 100 };
		delete savedData.id;
		delete savedData.date;
		delete savedData.edited;
		delete savedData.created;
		add(savedData);
	};

	const set = entry => e => {
		e.preventDefault();
		setForm(prevForm => ({
			...prevForm,
			...entry,
			price: entry?.price ? entry.price / 100 : prevForm.price,
		}));
	};

	return (
		<div className={cn.scrollable}>
			<div className={cn.container}>
				<div className={cn.create} onClick={save}>
					<h3>+ Create</h3>
					<p>Click here to save the current form for future use</p>
				</div>
				{autofill?.length === 0 && (
					<Card className={cn.empty}>No drinks currently saved</Card>
				)}
				{autofill.map(entry => (
					<SavedItemCard key={entry.value} entry={entry} set={set} remove={remove} />
				))}
			</div>
		</div>
	);
};

export default memo(AutofillManager);
