import { memo } from 'react';
import { Popup, CircleMarker } from 'react-leaflet';
import cn from './StoreMarker.module.scss';

const StoreMarker = ({ data, setCenter, setSelected }) => {
	const position = data.venue.location;

	const select = () => {
		setCenter([position.lat, position.lng]);
		setSelected(data.venue.id);
	};

	return (
		<CircleMarker
			center={[position.lat, position.lng]}
			radius={10}
			fill={true}
			weight={1}
			color={'#F68080'}
			fillColor={'#F68080'}
			fillOpacity={'0.5'}
			eventHandlers={{
				click: select,
			}}
		>
			<Popup>
				<div className={cn.popup}>
					<h3>{data.venue.name}</h3>
					<span>{data.venue.location.address}</span>
				</div>
			</Popup>
		</CircleMarker>
	);
};

export default memo(StoreMarker);
