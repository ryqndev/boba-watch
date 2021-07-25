import { memo } from 'react';

const Bin = ({ bin, handleMouseOver, hideTooltip }) => {
	return (
		<rect
			key={`heatmap-rect-${bin.row}-${bin.column}`}
			width={bin.width}
			height={bin.height}
			x={bin.x}
			y={bin.y}
			fill={bin.color}
			fillOpacity={bin.opacity}
			data-bin={JSON.stringify({
				row: bin.row,
				column: bin.column,
				count: bin.count,
			})}
			onMouseOver={handleMouseOver}
			onMouseOut={hideTooltip}
		/>
	);
};

export default memo(Bin);
