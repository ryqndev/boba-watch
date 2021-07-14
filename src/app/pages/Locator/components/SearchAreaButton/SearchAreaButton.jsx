import { memo, useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import cn from './SearchAreaButton.module.scss';

const SERVER_ENDPOINT =
	'https://us-central1-boba-watch-firebase.cloudfunctions.net/locator';

const SearchAreaButton = ({ position, setStores, filters }) => {
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
			const query = {
				lat: center.lat,
				lng: center.lng,
				open: filters.openNow ? 'true' : 'false',
				coffee: filters.coffee ? 'true' : 'false',
			}
			setStores(null);

			fetch(SERVER_ENDPOINT + '?' + new URLSearchParams(query).toString())
			.then(res => res.json())
			.then(res => {
			    setStores(res.response.groups[0].items);
			})
			.catch(err => {
				console.error('ERROR:', err);
				setStores([]);
			});
		},
		[map, position, setStores, filters]
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
