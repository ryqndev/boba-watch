import { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import useDrinks from '../../../controller/hooks/useDrinks.js';
import { Card, Searchbar } from '../../../components';
import {
	DrinkPanel,
	BudgetPieChart,
	PurchaseTimeHeatMap,
	VisitedMap,
} from './components';
import cn from './DesktopDashboard.module.scss';

const DesktopDashboard = ({ theme }) => {
	const { t } = useTranslation();
	const { drinks } = useDrinks();
	const [user] = useContext(AuthUserContext);
	const [metrics] = useState(JSON.parse(localStorage.getItem('metrics')));

	return (
		<div className={cn.container}>
			<main>
				<header>
					<h1 className={cn.title}>{t('dashboard')}</h1>
				</header>
				<div className={cn.content}>
					<VisitedMap
						className={cn.map}
						theme={theme}
						drinks={drinks}
					/>
					<Card className={cn.heatmap} title={t('drink frequency')}>
						<PurchaseTimeHeatMap data={metrics.d} />
					</Card>
					<div className={cn.stats}>
						<Card className={cn.budget}>
							<p>
								{t(
									'this is how much you’ve spent on drinks so far'
								)}
								:
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
							<p>
								{t('drinks this month', { count: metrics.td })}
							</p>
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
							{t('coming soon')}
						</h3>
					</Card>
				</div>
			</main>
			<aside className={cn.sidebar}>
				<div className={cn['aside-container']}>
					<Card className={cn.search} title={t('monthly budget')}>
						<BudgetPieChart
							budget={user.profile.budget}
							spent={metrics.tc}
							theme={theme}
						/>
					</Card>
					<Card className={cn.search}>
						<h2>{t('search')}</h2>
						<span>{t('search your past uploads')}</span>
						<Searchbar
							data={drinks}
							Result={({ item }) => <DrinkPanel data={item} />}
						/>
					</Card>
					<Card className={cn.recent} title={t('recent purchases')}>
						{drinks.slice(0, 5).map(drink => (
							<DrinkPanel key={drink.id} data={drink} />
						))}
						{drinks.length === 0 && (
							<div className={cn['empty-recent-purchases']}>
								{t("no drinks recorded")}
							</div>
						)}
					</Card>
				</div>
			</aside>
		</div>
	);
};

export default memo(DesktopDashboard);
