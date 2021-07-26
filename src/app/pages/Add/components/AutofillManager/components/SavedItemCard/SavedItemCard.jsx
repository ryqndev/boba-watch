import { memo, useState } from 'react';
import clsx from 'clsx';
import { Card, LocationTagIndicator } from '../../../../../../components';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import cn from './SavedItemCard.module.scss';

const SavedItemCard = ({ entry, set, remove }) => {
	const [showActions, setShowActions] = useState(false);

	return (
		<Card className={cn.container}>
			{entry.name && (
				<p>
					<span>name </span> {entry.name}
				</p>
			)}
			{entry.location && (
				<p>
					<span>location </span>{' '}
					<LocationTagIndicator className={cn.tag} address={entry?.address} />
					{entry.location}
				</p>
			)}
			{(entry.price === 0 || entry.price) && (
				<p>
					<span>price </span> ${(entry.price / 100).toFixed(2)}
				</p>
			)}
			{(entry.rating === 0 || entry.rating) && (
				<p>
					<span>rating </span> {entry.rating}
					<StarRateRoundedIcon className={cn.star} />
				</p>
			)}
			{/* {entry.description && (
				<p>
					<span>description </span> {entry.description}
				</p>
			)} */}
			<div
				className={clsx(cn.actions, showActions && cn.show)}
				onMouseEnter={() => setShowActions(true)}
				onMouseLeave={() => setShowActions(false)}
			>
				<button className={cn.fill} onClick={set(entry)}>
					<DoneRoundedIcon />
				</button>
				<button
					className={cn.delete}
					onClick={() => remove(entry.value)}
				>
					<DeleteRoundedIcon />
				</button>
			</div>
		</Card>
	);
};

export default memo(SavedItemCard);
