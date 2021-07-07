import { memo } from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';
import cn from './BudgetPieChart.module.scss';

const BudgetPieChart = ({ spent = 0, budget = 1 }) => {
	return (
		<div className={cn.wrapper}>
			<div className={cn.description}>
				MONTHLY LIMIT: ${budget / 100}
				<br />
				<span>${(spent / 100).toFixed(2)}</span>
				<br />
				REMAINING: ${(budget - spent) / 100}
			</div>
			<svg className={cn.chart} viewBox='0 0 100 100'>
				<Group className={cn.full} left={50} top={50}>
					<Pie
						data={[
							{ label: 'spent', value: spent },
							{ label: 'unspent', value: budget - spent },
						]}
						pieSortValues={() => -1}
						pieValue={e => e.value}
						fill={({ data }) =>
							data.label === 'spent' ? '#14e33a' : '#aaa'
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
