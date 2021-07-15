import { memo, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { toMoney } from '../../../components/textUtil.js';
import { PurchaseTimeHeatMap } from '../DesktopDashboard/components/index.js';
import TimeBarGraphs from './graphs/TimeBarGraphs';
import UserSunburst from './graphs/UserSunburst';
import { Card } from '../../../components';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import useMetrics from '../../../controller/hooks/useMetrics';
import cn from './MobileDashboard.module.scss';
import 'react-vis/dist/style.css';

const MobileDashboard = () => {
	const { t } = useTranslation();
	const metrics = useMetrics();

	const [user] = useContext(AuthUserContext);

	const [hourlyMetric, setHourlyMetric] = useState(
		Array(7).fill(Array(24).fill(0))
	);
	const [width, setWidth] = useState(window.innerWidth - 40);

	const resize = () => {
		setWidth(window.innerWidth - 40);
	};

	useEffect(() => {
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
		};
	}, [setWidth]);

	useEffect(() => {
		if (!metrics?.d) return;
		setHourlyMetric(metrics.d);
	}, [metrics]);

	return (
		<div className={cn.scrollable}>
			<main className={cn.container}>
				<h4 className={clsx(cn.bw, cn.title)}>
					{t('Monthly Spending')}
				</h4>
				<Card id='chart-holder' className={cn['daily-chart']}>
					<div className={cn.description}>
						{t('MONTHLY LIMIT')}: {t('$')}
						{toMoney(
							user.profile.budget,
							user.profile.budget / 10000 > 1
						)}
						<br />
						<span>
							{t('$')}
							{toMoney(metrics.tc, metrics.tc / 10000 > 1)}
						</span>
						<br />
						{t('REMAINING')}: {t('$')}
						{toMoney(user.profile.budget - metrics.tc)}
					</div>
					<UserSunburst
						budget={user.profile.budget}
						spent={metrics.tc}
						width={width}
					/>
				</Card>
				<Card className={cn.budget}>
					<p>
						{t('This is how much you’ve spent on drinks so far')}:
					</p>
					<h2 className={cn.bw}>
						{t('$')}
						{toMoney(metrics.ctc, metrics.ctc / 10000 > 1)}
					</h2>
				</Card>
				<Card
					className={cn.limit}
					style={{
						backgroundPositionY:
							(100 -
								parseInt(
									(metrics.td / user.profile.limit) * 100
								)) *
							2.7,
					}}
				>
					<h3 className={cn.bw}>
						{parseInt((metrics.td / user.profile.limit) * 100)}%
					</h3>
					<p>{t('to your max number of drinks this month')}</p>
				</Card>
				<Card className={cn.total}>
					<h2 className={cn.bw}>{metrics.td}</h2>
					<p>{t('drinks this month')}</p>
				</Card>
				<Card className={cn.heatmap}>
					<h2>Drink Frequency</h2>
					<PurchaseTimeHeatMap data={metrics.d} />
				</Card>
				<TimeBarGraphs data={hourlyMetric} width={width} />
			</main>
		</div>
	);
};

export default memo(MobileDashboard);
