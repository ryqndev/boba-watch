import { memo, useState } from 'react';
import useDrinks from '../../../controller/hooks/useDrinks.js';
import { Card, Searchbar } from '../../../components';
import { DrinkPanel } from '../../../pages/Dashboard/DesktopDashboard/components';
import { Transaction, DrinkDetails, TransactionsByMonth } from './components';
import cn from './DesktopHistory.module.scss';

const DesktopHistory = () => {
	const { drinks, update } = useDrinks();
	const [detailed, setDetailed] = useState(null);

	return (
		<div className={cn.container}>
			<main>
				<header>
					<h1 className={cn.title}>History</h1>
				</header>
				<div className={cn.content}>
					<Transaction
						className={cn['table-header']}
						header
						name='drink name'
						location='location'
					/>
					<div className={cn.scrollable}>
						<TransactionsByMonth
							{...{ drinks, detailed, setDetailed }}
						/>
					</div>
				</div>
			</main>
			<aside>
				<Card className={cn.search}>
					<h2>Search</h2>
					<span>Search your past uploads</span>
					<Searchbar
						data={drinks}
						Result={({ item }) => <DrinkPanel data={item} />}
					/>
				</Card>
				{detailed && <DrinkDetails {...detailed} update={update} setDetailed={setDetailed} />}

			</aside>
		</div>
	);
};

export default memo(DesktopHistory);
