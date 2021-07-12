import { memo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { UserLocationButton } from './components';
import 'leaflet/dist/leaflet.css';
import cn from './Map.module.scss';

const MIDDLE_OF_WORLD_COORDS = [40.4637, -3.7492];

const Map = ({ children=()=>{}, ...options }) => {
	const [position, setPosition] = useState(null);

	return (
		<MapContainer
			className={cn.wrapper}
			center={MIDDLE_OF_WORLD_COORDS}
			minZoom={2.5}
			attributionControl={false}
			{...options}
		>
			<UserLocationButton setPosition={setPosition} />
			{children(position)}
			<TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
		</MapContainer>
	);
};

export default memo(Map);
