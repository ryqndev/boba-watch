import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	const [itemsToDisplay, setItemsToDisplay] = useState(30);

	return (
		<div className={cn.container}>
			{drinks.length === 0 && (
				<Card className={cn.empty}>
					No drinks found. Let's get started by{' '}
					<Link to='/add'>adding</Link> a drink!
				</Card>
			)}
			{
				drinks.slice(0, itemsToDisplay).reduce(
					(acc, drink) => {
						const date = new Date(drink.date);
						if (
							acc.display.length === 0 ||
							acc.currentPeriod.month !== date.getMonth() ||
							acc.currentPeriod.year !== date.getFullYear()
						)
							return {
								display: [
									...acc.display,
									acc.display.length !== 0 && (
										<div
											className={cn['monthly-total']}
											key={date.toDateString() + 'total'}
										>
											Monthly Total:{' '}
											<span>
												$
												{(
													acc.monthlyTotal / 100
												).toFixed(2)}
											</span>
										</div>
									),
									<div
										className={cn.month}
										key={date.toDateString()}
									>
										{MONTH_NAMES[date.getMonth()]}{' '}
										{new Date().getFullYear() !==
											date.getFullYear() &&
											date.getFullYear()}
									</div>,
									<Transaction
										key={drink.id}
										selected={detailed?.id}
										setDetailed={setDetailed}
										{...drink}
									/>,
								],
								monthlyTotal: drink.price,
								currentPeriod: {
									month: date.getMonth(),
									year: date.getFullYear(),
								},
							};
						return {
							display: [
								...acc.display,
								<Transaction
									key={drink.id}
									selected={detailed?.id}
									setDetailed={setDetailed}
									{...drink}
								/>,
							],
							monthlyTotal: acc.monthlyTotal + drink.price,
							currentPeriod: acc.currentPeriod,
						};
					},
					{
						display: [],
						monthlyTotal: 0,
						currentPeriod: { month: -1, year: -1 },
					}
				).display
			}
			{itemsToDisplay < drinks.length && (
				<div
					className={cn['see-more']}
					onClick={() => {
						setItemsToDisplay(prev => prev + 50);
					}}
				>
					{t('show more')}
				</div>
			)}
		</div>
	);
};

export default memo(TransactionsByMonth);
