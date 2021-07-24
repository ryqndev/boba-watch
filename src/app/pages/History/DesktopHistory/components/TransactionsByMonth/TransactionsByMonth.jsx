import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../../../components';
import { Transaction } from '../';
import cn from './TransactionsByMonth.module.scss';

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const TransactionsByMonth = ({ drinks, detailed, setDetailed }) => {
	return (
		<div className={cn.container}>
			{drinks.length === 0 && (
				<Card className={cn.empty}>
					No drinks found. Let's get started by{' '}
					<Link to='/add'>adding</Link> a drink!
				</Card>
			)}
			{drinks.slice(0, 50).reduce((acc, drink) => {
				const date = new Date(drink.date);
				if (
					acc.length === 0 ||
					new Date(acc[acc.length - 1].props.date).getMonth() !==
						date.getMonth()
				)
					return [
						...acc,
						<div className={cn.month} key={date.toDateString()}>
							{MONTH_NAMES[date.getMonth()]}{' '}
							{new Date().getFullYear() !== date.getFullYear() &&
								date.getFullYear()}
						</div>,
						<Transaction
							key={drink.id}
							selected={detailed?.id}
							setDetailed={setDetailed}
							{...drink}
						/>,
					];
				return [
					...acc,
					<Transaction
						key={drink.id}
						selected={detailed?.id}
						setDetailed={setDetailed}
						{...drink}
					/>,
				];
			}, [])}
		</div>
	);
};

export default memo(TransactionsByMonth);
