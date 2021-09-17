import { memo } from 'react';
import { Card } from '../../../../components';
import useAutofill from '../../controllers/hooks/useAutofill';
import { SavedItemCard } from './components';
import cn from './AutofillManager.module.scss';
import { useTranslation } from 'react-i18next';

const AutofillManager = ({ form, setForm }) => {
	const { t } = useTranslation();
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
					<h3>+ {t('create')}</h3>
					<p>{t('create button description')}</p>
				</div>
				{autofill?.length === 0 && (
					<Card className={cn.empty}>{t('no drinks saved')}</Card>
				)}
				{autofill.map(entry => (
					<SavedItemCard
						key={entry.value}
						entry={entry}
						set={set}
						remove={remove}
					/>
				))}
			</div>
		</div>
	);
};

export default memo(AutofillManager);
