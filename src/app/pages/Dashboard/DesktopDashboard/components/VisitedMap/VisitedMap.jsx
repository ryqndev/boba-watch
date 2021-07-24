import { memo } from 'react';
import clsx from 'clsx';
import { CircleMarker, Popup } from 'react-leaflet';
import { Map } from '../../../../../components';
import { useDrinkByLocation } from './controller';
import cn from './VisitedMap.module.scss';

const VisitedMap = ({ className, theme, drinks }) => {
	const { locations } = useDrinkByLocation(drinks);

	return (
		<Map
			className={clsx(className)}
			scrollWheelZoom={false}
			zoom={2.5}
			theme={theme}
		>
			{position =>
				locations.map(({ coordinates, drinks, location }) => (
					<CircleMarker
						center={coordinates}
						radius={10}
						fill={true}
						weight={1}
						color={'#F68080'}
						fillColor={'#F68080'}
						fillOpacity={'0.5'}
					>
						<Popup>
							<div className={cn.popup}>
                                <h2>{location}</h2>
                                Visited {drinks.length} times
                                {drinks.splice(0,5).map(({date}) => (
                                    <div>{new Date(date).toString().substring(4, 21)}</div>
                                ))}
							</div>
						</Popup>
					</CircleMarker>
				))
			}
		</Map>
	);
};

export default memo(VisitedMap);
