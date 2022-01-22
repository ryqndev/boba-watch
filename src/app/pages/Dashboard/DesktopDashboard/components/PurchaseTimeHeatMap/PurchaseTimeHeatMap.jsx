import { memo } from 'react';
import { HeatmapRect } from '@visx/heatmap';
import { Group } from '@visx/group';
import { AxisTop, AxisLeft } from '@visx/axis';
import { scaleBand } from '@visx/scale';
import { useTranslation } from 'react-i18next';
import cn from './PurchaseTimeHeatMap.module.scss';

import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import Bin from './Bin/Bin';

const DATE_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIME_LABELS = [
	'1 AM',
	'2 AM',
	'3 AM',
	'4 AM',
	'5 AM',
	'6 AM',
	'7 AM',
	'8 AM',
	'9 AM',
	'10 AM',
	'11 AM',
	'12 PM',
	'1 PM',
	'2 PM',
	'3 PM',
	'4 PM',
	'5 PM',
	'6 PM',
	'7 PM',
	'8 PM',
	'9 PM',
	'10 PM',
	'11 PM',
	'12 AM',
];

const PurchaseTimeHeatMap = ({ data }) => {
	const { t } = useTranslation();
	const {
		tooltipData,
		tooltipLeft,
		tooltipTop,
		tooltipOpen,
		showTooltip,
		hideTooltip,
	} = useTooltip();

	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		detectBounds: true,
		scroll: true,
	});

	const handleMouseOver = event => {
		const coords = localPoint(event.target.ownerSVGElement, event);
		showTooltip({
			tooltipLeft: coords.x,
			tooltipTop: coords.y,
			tooltipData: JSON.parse(event.target.dataset['bin']),
		});
	};

	let max = 0;
	const binData = data.map((e, i) => ({
		bin: i + 1,
		bins: e.map((e, i) => {
			if (e > max) max = e;
			return {
				count: e,
				bin: i,
			};
		}),
	}));
	const xScale = e => 26.5 * e + 4;
	const yScale = e => 16 * e + 12;

	const colorScale = count =>
		`rgba(246, 128, 128, ${
			count === 0 ? (max > 5 ? 0.01 : 0.1) : count / max
		})`;

	return (
		<svg ref={containerRef} className={cn.container} viewBox='0 0 214 400'>
			<AxisTop
				scale={scaleBand({
					domain: DATE_LABELS.map(date => t(date)),
					range: [24, 209],
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
					domain: TIME_LABELS.map(time => t(time)),
					range: [13, 396],
				})}
				left={24}
				orientation='left'
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
				>
					{heatmap =>
						heatmap.map(heatmapBins =>
							heatmapBins.map(bin => (
								<Bin
									key={`heatmap-rect-${bin.row}-${bin.column}`}
									{...{ bin, handleMouseOver, hideTooltip }}
								/>
							))
						)
					}
				</HeatmapRect>
			</Group>
			{tooltipOpen && (
				<TooltipInPortal
					key={Math.random()}
					top={tooltipTop}
					left={tooltipLeft}
				>
					<div className={cn.tooltip}>
						<time>
							{t(DATE_LABELS[tooltipData.column])}
							{' | '}
							{t(TIME_LABELS[tooltipData.row])}
						</time>
						<p>
							<strong>{tooltipData.count} </strong>
							{t('drinks purchased', { count: tooltipData.count })}
						</p>
					</div>
				</TooltipInPortal>
			)}
		</svg>
	);
};

export default memo(PurchaseTimeHeatMap);
