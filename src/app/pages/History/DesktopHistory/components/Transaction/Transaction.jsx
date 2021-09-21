import { memo } from 'react';
import clsx from 'clsx';
import {format} from 'date-fns';
import { useTranslation } from 'react-i18next';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIosRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { Card, LocationTagIndicator } from '../../../../../components';
import cn from './Transaction.module.scss';
import { enUS, zhTW } from 'date-fns/locale'

const Transaction = ({
	className,
	selected,
	setDetailed,
	header = false,
	...drink
}) => {
	const { date, location, name, rating, price } = drink;
	const { t, i18n } = useTranslation();

	const view = () => {
		if (header) return;
		setDetailed(drink);
	};

	return (
		<Card
			className={clsx(
				className,
				cn.container,
				selected === drink.id && cn.selected
			)}
			onClick={view}
		>
			<div className={cn.date}>
				{!header ? format(new Date(date), 'ccc M/dd h:mm a', {locale: i18n.language === 'zh-TW' ? zhTW : enUS}) : t('date')}
			</div>
			<div className={cn.location}>
				<LocationTagIndicator className={cn.tag} address={drink?.address}/>
				{location}
			</div>
			<div className={cn.name}>{name}</div>
			<div className={cn.rating}>
				{rating ?? '-'} <StarRateRoundedIcon />
			</div>
			<div className={cn.price}>
				{!header && '$'}
				{!header ? (price / 100).toFixed(2) : t('price')}
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
