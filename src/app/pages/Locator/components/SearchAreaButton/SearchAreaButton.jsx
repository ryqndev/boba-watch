import { memo, useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import clsx from 'clsx';
import { useFoursquare } from '../../../../controller/hooks';
import cn from './SearchAreaButton.module.scss';

const SearchAreaButton = ({ className, position, setStores, filters }) => {
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
		<button className={clsx(cn.button, className)} onClick={search}>
			Search this area
		</button>
	);
};

export default memo(SearchAreaButton);
