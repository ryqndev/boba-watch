import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandedDrinkDescription from './ExpandedDrinkDescription.jsx';
import { toMoney } from '../../../../../components/textUtil.js';
import clsx from 'clsx';
import cn from './DrinkPanel.module.scss';

const DrinkPanel = ({ data }) => {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);

	const drinkDate = new Date(data.date);

	return (
		<div className={cn.container}>
			<div
				className={cn['basic-details']}
				onClick={() => {
					setExpanded(!expanded);
				}}
			>
				<p className={cn.place}>{data.location}</p>
				<p className={cn.price}>
					{t('$')}{toMoney(data.price)}
				</p>
				<div className={cn['expand-icon']}>
					{expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				</div>
				<p className={cn.name}>{data.name}</p>
				<p className={cn.time}>{drinkDate.toDateString().substr(4)}</p>
			</div>
			<div
				className={clsx(cn['collapsed-info'], expanded && cn.expanded)}
			>
				<ExpandedDrinkDescription
					{...data}
					expanded={expanded}
					date={drinkDate}
				/>
			</div>
		</div>
	);
};

export default memo(DrinkPanel);
