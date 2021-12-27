import { memo } from 'react';
import clsx from 'clsx';
import Map from '../../../../../components/Map';
import { VisitedLocations } from '../../../../../components/Map/components';
import cn from './VisitedMap.module.scss';

const VisitedMap = ({ className, theme, drinks }) => {
	return (
		<Map
			className={clsx(className, cn.container)}
			scrollWheelZoom={false}
			touchZoom={true}
			dragging={true}
			zoom={2.5}
			theme={theme}
		>
			<VisitedLocations drinks={drinks}/>
		</Map>
	);
};

export default memo(VisitedMap);
