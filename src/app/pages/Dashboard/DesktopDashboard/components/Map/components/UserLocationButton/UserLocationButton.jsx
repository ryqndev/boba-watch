import { memo, useEffect, useCallback } from 'react';
import { CircleMarker, useMap } from 'react-leaflet';
import useGeolocation from '../../../../../../../controller/hooks/useGeolocation';
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import cn from './UserLocationButton.module.scss';

const ZOOM_LEVEL_CITY = 13;

const UserLocationButton = () => {
	const position = useGeolocation();
	const map = useMap();

	const setView = useCallback(() => {
		if (!(position?.lat || position?.lng)) return null;
		map.setView([position.lat, position.lng], ZOOM_LEVEL_CITY);
	}, [position, map]);

	useEffect(setView, [setView]);

	return (
		<>
			{position?.lat && position?.lng && (
				<CircleMarker
					center={[position.lat, position.lng]}
					radius={5}
					fill={true}
					color={'#B64040'}
					fillColor={'#B64040'}
					fillOpacity={'1'}
				/>
			)}
			<button className={cn.button} onClick={setView}>
				<MyLocationRoundedIcon />
			</button>
		</>
	);
};

export default memo(UserLocationButton);
