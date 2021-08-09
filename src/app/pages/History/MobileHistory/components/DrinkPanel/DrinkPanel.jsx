import { memo, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { ExpandedDrinkDescription } from '../';
import { toMoney } from '../../../../../components/textUtil.js';
import { deleteDrink } from '../../../../../controller/calculateStatistics';
import { database } from '../../../../../libs/firestore';
import { useNavigate } from 'react-router-dom';
import {
	alertDrinkDeletedSuccess,
	alertDrinkNotDeleted,
} from '../../../../../libs/swal.js';
import AuthUserContext from '../../../../../controller/contexts/AuthUserContext';
import './DrinkPanel.scss';

const DrinkPanel = ({ data, triggerUpdate, expandable = true }) => {
	const [authUser] = useContext(AuthUserContext);
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);
	const navigate = useNavigate();

	const remove = () => {
		database
			.collection(`users/${authUser.uid}/drinks`)
			.doc(data.id)
			.delete()
			.then(() => {
				let metrics = deleteDrink(data.id);
				metrics.d = JSON.stringify(metrics.d);
				database
					.collection(`users/${authUser.uid}/user`)
					.doc('stats')
					.set(metrics)
					.finally(() => {
						alertDrinkDeletedSuccess();
						triggerUpdate(
							JSON.parse(localStorage.getItem('drinkids'))
						);
					});
			})
			.catch(err => {
				alertDrinkNotDeleted(err);
			});
	};
	const edit = () => {
		navigate('/edit/' + data.id);
	};
	const drinkDate = new Date(data.date);
	return (
		<div className='drink-panel'>
			<div
				className='info'
				onClick={() => {
					setExpanded(!expanded);
				}}
			>
				<p className='place'>{data.location}</p>
				<p className='price'>
					{t('$')}
					{toMoney(data.price)}
				</p>

				<div className='expand-icon'>
					{expandable &&
						(expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />)}
				</div>
				<p className='name'>{data.name}</p>
				<p className='time'>{drinkDate.toDateString().substr(4)}</p>
			</div>
			<div className={'collapsed-info' + (expanded ? ' expanded' : '')}>
				<ExpandedDrinkDescription
					{...data}
					expanded={expanded}
					date={drinkDate}
				/>
				<div className='options'>
					<button className='text' onClick={edit}>
						{t('EDIT')}
					</button>
					<button className='text' onClick={remove}>
						{t('DELETE')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default memo(DrinkPanel);
