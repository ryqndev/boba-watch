import { memo } from 'react';
import clsx from 'clsx';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIosRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { Card } from '../../../../../components';
import cn from './Transaction.module.scss';

const Transaction = ({
	className,
	price,
	name,
	location,
	rating,
	date,
	header = false,
}) => {
	return (
		<Card className={clsx(className, cn.container)}>
			<div className={cn.date}>
				{!header ? new Date(date).toString() : 'date'}
			</div>
			<div className={cn.location}>{location}</div>
			<div className={cn.name}>{name}</div>
			<div className={cn.rating}>
				{rating ?? '-'} <StarRateRoundedIcon />
			</div>
			<div className={cn.price}>
				{!header && '$'}{!header ? (price / 100).toFixed(2) : 'price'}
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
