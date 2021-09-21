import { memo } from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';
import { useTranslation } from 'react-i18next';
import cn from './BudgetPieChart.module.scss';

const BudgetPieChart = ({ spent = 0, budget = 1, theme }) => {
	const { t } = useTranslation();
	
	return (
		<div className={cn.container}>
			<div className={cn.description}>
				<p>{t('monthly limit')}: ${budget / 100}</p>
				<span>${(spent / 100).toFixed(2)}</span>
				<p>{t('remaining')}: ${(budget - spent) / 100}</p>
			</div>
			<svg className={cn.chart} viewBox='0 0 100 100'>
				<Group className={cn.full} left={50} top={50}>
					<Pie
						data={[
							{ label: 'spent', value: spent },
							{ label: 'unspent', value: budget - spent },
						]}
						pieSortValues={() => 1}
						pieValue={e => e.value}
						fill={({ data }) =>
							data.label === 'spent'
								? '#14e33a'
								: theme !== 'dark'
									? '#d8d8d8'
									: '#223242'
						}
						outerRadius={48}
						innerRadius={32}
						cornerRadius={2}
						padAngle={0.1}
					/>
				</Group>
			</svg>
		</div>
	);
};

export default memo(BudgetPieChart);
