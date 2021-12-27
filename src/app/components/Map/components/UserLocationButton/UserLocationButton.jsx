import clsx from 'clsx';
import { memo, useEffect, useCallback } from 'react';
import { CircleMarker, useMap } from 'react-leaflet';
import useGeolocation from '../../../../controller/hooks/useGeolocation.js';
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import cn from './UserLocationButton.module.scss';

const ZOOM_LEVEL_CITY = 13;

const UserLocationButton = ({ setPosition }) => {
	const geolocation = useGeolocation();
	const map = useMap();

	const setView = useCallback(() => {
		if (!(geolocation?.lat || geolocation?.lng)) return null;
		setPosition([geolocation.lat, geolocation.lng]);
		map.flyTo([geolocation.lat, geolocation.lng], ZOOM_LEVEL_CITY, {
			animate: true,
			duration: 1,
		});
	}, [geolocation, map, setPosition]);

	useEffect(setView, [setView]);

	return (
		<>
			{geolocation?.lat && geolocation?.lng && (
				<CircleMarker
					center={[geolocation.lat, geolocation.lng]}
					radius={5}
					fill={true}
					color={'#B64040'}
					fillColor={'#B64040'}
					fillOpacity={'1'}
				/>
			)}
			<button className={clsx(cn.button, cn.center)} onClick={setView}>
				<MyLocationRoundedIcon />
			</button>
		</>
	);
};

export default memo(UserLocationButton);
