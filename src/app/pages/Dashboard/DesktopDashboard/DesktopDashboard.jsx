import { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import useDrinks from '../../../controller/hooks/useDrinks.js';
import { Card, Searchbar } from '../../../components';
import { DrinkPanel, BudgetPieChart, PurchaseTimeHeatMap, VisitedMap } from './components';
import cn from './DesktopDashboard.module.scss';

const DesktopDashboard = ({ theme }) => {
	const { t } = useTranslation();
	const { drinks } = useDrinks();
	const [user] = useContext(AuthUserContext);
	const [metrics, setMetrics] = useState(
		JSON.parse(localStorage.getItem('metrics'))
	);

	return (
		<div className={cn.container}>
			<main>
				<header>
					<h1 className={cn.title}>{t('dashboard')}</h1>
				</header>
				<div className={cn.content}>
					<VisitedMap className={cn.map} theme={theme} drinks={drinks}/>
					<Card className={cn.heatmap} title='drink frequency'>
						<PurchaseTimeHeatMap data={metrics.d} />
					</Card>
					<div className={cn.stats}>
						<Card className={cn.budget}>
							<p>
								This is how much you’ve spent on drinks so far:
							</p>
							<h2 className={cn.bw}>
								$
								{metrics.ctc >= 100
									? (metrics.ctc / 100).toFixed(2)
									: parseInt(metrics.ctc / 100)}
							</h2>
						</Card>
						<Card className={cn.total}>
							<h2 className={cn.bw}>{metrics.td}</h2>
							<p>drink{metrics.td === 1 ? '' : 's'} this month</p>
						</Card>
					</div>
					<Card className={cn.xy}>
						<h3
							style={{
								display: 'grid',
								color: 'var(--text-secondary)',
								fontSize: '3em',
								textAlign: 'center',
							}}
						>
							COMING SOON
						</h3>
					</Card>
				</div>
			</main>
			<aside className={cn.sidebar}>
				<div className={cn['aside-container']}>
					<Card className={cn.search} title='monthly budget'>
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
							Result={({ item }) => <DrinkPanel data={item} />}
						/>
					</Card>
					<Card className={cn.recent} title='recent purchases'>
						{drinks.slice(0, 5).map(drink => (
							<DrinkPanel key={drink.id} data={drink} />
						))}
					</Card>
				</div>
			</aside>
		</div>
	);
};

export default memo(DesktopDashboard);
