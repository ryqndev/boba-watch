import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { toMoney } from '../../../components/textUtil.js';
import {
	PurchaseTimeHeatMap,
	BudgetPieChart,
} from '../DesktopDashboard/components';
import { Card } from '../../../components';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import useMetrics from '../../../controller/hooks/useMetrics';
import cn from './MobileDashboard.module.scss';

const MobileDashboard = () => {
	const { t } = useTranslation();
	const metrics = useMetrics();

	const [user] = useContext(AuthUserContext);

	return (
		<div className={cn.scrollable}>
			<main className={cn.container}>
				<h4 className={clsx(cn.bw, cn.title)}>
					{t('Monthly Spending')}
				</h4>
				<Card id='chart-holder' className={cn['daily-chart']}>
					<BudgetPieChart
						budget={user.profile.budget}
						spent={metrics.tc}
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
			</main>
		</div>
	);
};

export default memo(MobileDashboard);
