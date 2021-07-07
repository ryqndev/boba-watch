import { memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cn from './Map.module.scss';
import { UserLocationButton } from './components';

const MIDDLE_OF_WORLD_COORDS = [40.4637, -3.7492];
const ZOOM_LEVEL_WORLD = 2;

const Map = () => {
	return (
		<MapContainer
			className={cn.wrapper}
			zoom={ZOOM_LEVEL_WORLD}
			minZoom={2}
			center={MIDDLE_OF_WORLD_COORDS}
			scrollWheelZoom={false}
			attributionControl={false}
		>
			<UserLocationButton />
			<TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
			{/* {data.map( e => <InformationPopup key={e.id} {...e}/> )} */}
		</MapContainer>
	);
};

export default memo(Map);
