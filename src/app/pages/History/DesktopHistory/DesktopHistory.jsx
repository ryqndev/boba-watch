import { memo, useState } from 'react';
import useDrinks from '../../../controller/hooks/useDrinks.js';
import { Card, Searchbar } from '../../../components';
import { DrinkPanel } from '../../../pages/Dashboard/DesktopDashboard/components';
import { Transaction, DrinkDetails } from './components';
import cn from './DesktopHistory.module.scss';

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

const DesktopHistory = () => {
	const { drinks } = useDrinks();
	const [detailed, setDetailed] = useState(null);

	return (
		<div className={cn.container}>
			<main>
				<header>
					<h1 className={cn.title}>History</h1>
				</header>
				<div className={cn.content}>
					<Transaction className={cn['table-header']} header name='drink name' location='location' />,
					<div className={cn.scrollable}>
						<div className={cn.transactions}>
							{drinks.reduce((acc, drink) => {
								const date = new Date(drink.date);
								if (
									acc.length === 0 ||
									new Date(
										acc[acc.length - 1].props.date
									).getMonth() !== date.getMonth()
								)
									return [
										...acc,
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
											{...drink}
										/>,
									];
								return [
									...acc,
									<Transaction key={drink.id} {...drink} />,
								];
							}, [])}
						</div>
					</div>
				</div>
			</main>
			<aside>
				<DrinkDetails data={detailed} />
				<Card className={cn.search}>
					<h2>Search</h2>
					<span>Search your past uploads</span>
					<Searchbar
						data={drinks}
						Result={({ item }) => <DrinkPanel data={item} />}
					/>
				</Card>
			</aside>
		</div>
	);
};

export default memo(DesktopHistory);
