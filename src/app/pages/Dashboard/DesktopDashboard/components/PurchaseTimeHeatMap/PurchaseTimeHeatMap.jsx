import { memo } from 'react';
import { HeatmapRect } from '@visx/heatmap';
import { Group } from '@visx/group';
import { AxisTop, AxisLeft } from '@visx/axis';
import { scaleBand } from '@visx/scale';
import { Grid } from '@visx/grid';
import cn from './PurchaseTimeHeatMap.module.scss';
import { Translate } from '@material-ui/icons';

const DATE_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIME_LABELS = [
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM",
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"
];

const PurchaseTimeHeatMap = ({ data }) => {
	let max = 0;
	const binData = data.map((e, i) => ({
		bin: i + 1,
		bins: e.map((e, i) => {
			if(e > max) max = e;
			return {
				count: e,
				bin: i,
			};
		})
	}));
	const xScale = e => {
		return 26.5 * e + 4;
	};
	const yScale = e => {
		return 16 * e + 12;
	};

	const colorScale = count =>
		`rgba(246, 128, 128, ${count === 0 ? (max > 5 ? 0.01 : 0.1) : count / max})`;

	return (
		<svg className={cn.wrapper} viewBox='0 0 214 400'>
			<AxisTop
				scale={scaleBand({
					domain: DATE_LABELS,
					range: [24, 209]
				})}
				top={14}
				tickLength={4}
				tickClassName={cn.tick}
				tickStroke='grey'
				stroke={'#aaa'}
				tickLabelProps={() => ({
					className: cn['tick-label'],
					y: -7,
					textAnchor: 'middle',
				})}
			/>
			<AxisLeft
				scale={scaleBand({
					domain: TIME_LABELS,
					range: [13, 396]
				})}
				left={24}
				orientation="left"
				tickLength={4}
				tickClassName={cn.tick}
				tickStroke='grey'
				stroke={'#aaa'}
				numTicks={24}
				tickLabelProps={() => ({
					className: cn['tick-label'],
					transform: 'translate(0, 2)',
					x: -22,
					textAnchor: 'left',
				})}
			/>
			<Group left={20}>
				<HeatmapRect
					data={binData}
					xScale={xScale}
					yScale={yScale}
					colorScale={colorScale}
					binWidth={27.5}
					binHeight={17}
				></HeatmapRect>
			</Group>
		</svg>
	);
};

export default memo(PurchaseTimeHeatMap);
