import {
	AnimatedAxis,
	AnimatedGrid,
	AnimatedLineSeries,
	Tooltip,
	XYChart,
} from '@visx/xychart';
import cn from './SpendingXYChart.module.scss';


const SpendingXYChart = ({data=[{x: 20, y: 50}, {x: 30, y: 60}]}) => {
    const accessors = {
        xAccessor: d => d.x,
        yAccessor: d => d.y,
    };

	return (
		<div className={cn.container}>
			<XYChart
				xScale={{ type: 'band' }}
				yScale={{ type: 'linear' }}
			>
				<AnimatedAxis orientation='bottom' />
				<AnimatedGrid columns={false} numTicks={4} />
				<AnimatedLineSeries
					dataKey='Line 1'
					data={data}
                    {...accessors}
				/>
				{/* <AnimatedLineSeries
					dataKey='Line 2'
					data={data2}
					{...accessors}
				/>
				<Tooltip
					snapTooltipToDatumX
					snapTooltipToDatumY
					showVerticalCrosshair
					showSeriesGlyphs
					renderTooltip={({ tooltipData, colorScale }) => (
						<div>
							<div
								style={{
									color: colorScale(
										tooltipData.nearestDatum.key
									),
								}}
							>
								{tooltipData.nearestDatum.key}
							</div>
							{accessors.xAccessor(
								tooltipData.nearestDatum.datum
							)}
							{', '}
							{accessors.yAccessor(
								tooltipData.nearestDatum.datum
							)}
						</div>
					)}
				/> */}
			</XYChart>
		</div>
	);
};

export default SpendingXYChart;
