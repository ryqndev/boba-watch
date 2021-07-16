import { memo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { UserLocationButton, CenterController } from './components';
import 'leaflet/dist/leaflet.css';
import cn from './Map.module.scss';
import Card from '../globals/styles/Card';
import clsx from 'clsx';

const MIDDLE_OF_WORLD_COORDS = [40.4637, -3.7492];

const Map = ({ className, children = () => {}, center, theme, ...options }) => {
	const [position, setPosition] = useState(null);

	return (
		<Card className={clsx(className)}>
			<MapContainer
				className={cn.container}
				center={MIDDLE_OF_WORLD_COORDS}
				minZoom={2.5}
				attributionControl={false}
				{...options}
			>
				{center && <CenterController center={center} />}
				<UserLocationButton setPosition={setPosition} />
				{children(position)}
				{theme === 'dark' && (
					<TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
				)}
				{theme === 'default' && (
					<TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' />
				)}
			</MapContainer>
		</Card>
	);
};

export default memo(Map);
