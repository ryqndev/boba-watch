import { memo, useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import SAMPLE_ARCADIA_SHOPS from './TestData.json';
import cn from './SearchAreaButton.module.scss';

const SERVER_ENDPOINT =
	'https://us-central1-boba-watch-firebase.cloudfunctions.net/locator';

const SearchAreaButton = ({ position, setStores }) => {
	const map = useMap();

	const search = useCallback(
		(location = 'map') => {
			let center;
			switch (location) {
				case 'user':
					center = { lat: position[0], lng: position[1] };
					break;
				case 'map':
				default:
					center = map.getCenter();
					break;
			}
			fetch(SERVER_ENDPOINT + '?lat=' + center.lat + '&lng=' + center.lng)
			.then(res => res.json())
			.then(res => {
			    setStores(res.response.groups[0].items);
			});
			// setTimeout(() => {
			// 	setStores(SAMPLE_ARCADIA_SHOPS);
			// }, [800]);
		},
		[map, position, setStores]
	);

	useEffect(() => {
		position && search('user');
	}, [position, search]);

	return (
		<button className={cn.button} onClick={search}>
			Search this area
		</button>
	);
};

export default memo(SearchAreaButton);
