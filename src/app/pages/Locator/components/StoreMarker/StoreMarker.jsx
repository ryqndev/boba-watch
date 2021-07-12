import { useMap, Popup, CircleMarker } from 'react-leaflet';
import cn from './StoreMarker.module.scss';

const StoreMarker = ({ data }) => {
	const position = data.venue.location;
	const map = useMap();

	const select = () => {
		map.flyTo([position.lat, position.lng], 17, {
			animate: true,
			duration: 1,
		});
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

export default StoreMarker;
