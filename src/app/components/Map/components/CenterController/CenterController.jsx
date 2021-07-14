import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const CenterController = ({ center }) => {
	const map = useMap();

	useEffect(() => {
		map.flyTo(center, 13, {
			animate: true,
			duration: 0.5,
		});
	}, [center, map]);

	return <div></div>;
};

export default CenterController;
