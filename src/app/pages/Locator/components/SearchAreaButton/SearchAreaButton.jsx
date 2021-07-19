import { memo, useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import useFoursquare from '../../../../controller/hooks/useFoursquare';
import cn from './SearchAreaButton.module.scss';

const SearchAreaButton = ({ position, setStores, filters }) => {
	const map = useMap();
	const { getLocationsNearby } = useFoursquare();

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
			};
			setStores(null);

			getLocationsNearby(
				query,
				res => {
					setStores(res.response.groups[0].items);
				},
				err => {
					console.error('ERROR:', err);
					setStores([]);
				}
			);
		},
		[map, position, setStores, filters, getLocationsNearby]
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
