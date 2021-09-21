import { memo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import clsx from 'clsx';
import { Card } from '..';
import { UserLocationButton, CenterController } from './components';
import cn from './Map.module.scss';
import 'leaflet/dist/leaflet.css';

const MIDDLE_OF_WORLD_COORDS = [40.4637, -3.7492];

const Map = ({
	className,
	children = () => {},
	center,
	theme,
	hasCenterButton = true,
	...options
}) => {
	const [position, setPosition] = useState(null);

	return (
		<Card className={clsx(className)}>
			<MapContainer
				className={cn.container}
				center={center ?? MIDDLE_OF_WORLD_COORDS}
				minZoom={2.5}
				attributionControl={false}
				{...options}
			>
				{center && <CenterController center={center} />}
				{hasCenterButton && (
					<UserLocationButton setPosition={setPosition} />
				)}
				{children(position)}
				{theme === 'dark' && (
					<TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
				)}
				{theme === 'light' && (
					<TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' />
				)}
			</MapContainer>
		</Card>
	);
};

export default memo(Map);
