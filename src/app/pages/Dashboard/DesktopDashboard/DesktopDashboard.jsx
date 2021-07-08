import { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import useDrinks from '../../../controller/hooks/useDrinks.js';
import { Card, Searchbar } from '../../../components';
import { Map, BudgetPieChart, PurchaseTimeHeatMap } from './components';
import DrinkPanel from '../../History/DrinkPanel';
import cn from './DesktopDashboard.module.scss';

const DesktopDashboard = () => {
	const { t } = useTranslation();
	const { drinks } = useDrinks();
	const [user] = useContext(AuthUserContext);
	const [metrics, setMetrics] = useState(
		JSON.parse(localStorage.getItem('metrics'))
	);

	return (
		<div className={cn.wrapper}>
			<main>
				<header>
					<h1 className={cn.title}>{t('dashboard')}</h1>
				</header>
				<div className={cn.content}>
					<Card className={cn.map}>
						<Map />
					</Card>
					<Card className={cn.heatmap}>
						<h2>Drink Frequency</h2>
						<PurchaseTimeHeatMap data={metrics.d} />
					</Card>
					<div></div>
					<div></div>
				</div>
			</main>
			<aside className={cn.sidebar}>
				<div className={cn.container}>
					<Card className={cn.search}>
						<h2>Monthly Budget</h2>
						<BudgetPieChart
							budget={user.profile.budget}
							spent={metrics.tc}
						/>
					</Card>
					<Card className={cn.search}>
						<h2>Search</h2>
						<span>Search your past uploads</span>
						<Searchbar
							data={drinks}
							Result={({ item }) => (
								<DrinkPanel
									triggerUpdate={() => {}}
									data={item}
								/>
							)}
						/>
					</Card>
					<Card className={cn.recent}>
						<h2>Recent Purchases</h2>
						{drinks.slice(0, 5).map(drink => (
							<DrinkPanel
								key={drink.id}
								data={drink}
								expandable={false}
							/>
						))}
					</Card>
				</div>
			</aside>
		</div>
	);
};

export default memo(DesktopDashboard);
