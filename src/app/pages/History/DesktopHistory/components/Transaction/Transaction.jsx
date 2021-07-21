import { memo } from 'react';
import clsx from 'clsx';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIosRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { Card } from '../../../../../components';
import cn from './Transaction.module.scss';

const Transaction = ({ className, selected, setDetailed, header = false, ...drink }) => {
	const { date, location, name, rating, price } = drink;

	const view = () => {
		if (header) return;
		setDetailed(drink);
	};

	return (
		<Card className={clsx(className, cn.container, selected === drink.id && cn.selected)} onClick={view}>
			<div className={cn.date}>
				{!header ? new Date(date).toString() : 'date'}
			</div>
			<div className={cn.location}>{location}</div>
			<div className={cn.name}>{name}</div>
			<div className={cn.rating}>
				{rating ?? '-'} <StarRateRoundedIcon />
			</div>
			<div className={cn.price}>
				{!header && '$'}
				{!header ? (price / 100).toFixed(2) : 'price'}
			</div>
			{!header && (
				<div className={cn['expand-icon']}>
					<ArrowRightIcon />
				</div>
			)}
		</Card>
	);
};

export default memo(Transaction);
