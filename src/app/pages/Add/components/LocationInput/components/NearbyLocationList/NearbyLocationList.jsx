import { memo, useState, useEffect } from 'react';
import useGeolocation from '../../../../../../controller/hooks/useGeolocation';
import { Card, TextInput } from '../../../../../../components';
import useFoursquare from '../../../../../../controller/hooks/useFoursquare';
import clsx from 'clsx';
import cn from './NearbyLocationList.module.scss';

const NearbyLocationList = ({ onChange }) => {
	const position = useGeolocation();
	const [listings, setListings] = useState(null);
	const [search, setSearch] = useState('');

	const { getLocationsByText } = useFoursquare();

	// useEffect(() => {
	// 	if (!position.lat || !position.lng) return;
	// 	const query = {
	// 		lat: position.lat,
	// 		lng: position.lng,
	// 		input: search,
	// 	};
	// 	getLocationsNearby(query, res => {

	// 	});
	// }, [getLocationsNearby]);

	useEffect(() => {
		if (!position.lat || !position.lng || listings) return;

		if (search.length < 3) {
			return;
		}

		const query = {
			lat: position.lat,
			lng: position.lng,
			input: search,
		};
		setListings(null);

		getLocationsByText(
			query,
			res => {
				setListings(res.response.minivenues);
			},
			err => {
				console.error('ERROR:', err);
				setListings([]);
			}
		);
	}, [position, search, getLocationsByText, listings]);

	const select = (name, location) => {
		onChange('location', name, 250);
		onChange('address', location, () => true);
	};

	const handleChange = e => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	return (
		<div className={cn.container}>
			<h3>Nearby Locations</h3>
			<div className={cn.search}>
				<TextInput
					label='Search'
					value={search}
					onChange={handleChange}
				/>
			</div>

			<div className={cn.scrollable}>
				<div className={cn.list}>
					{listings &&
						listings.map(({ name, location }) => (
							<Card
								key={name + JSON.stringify(location)}
								className={cn.listing}
								onClick={() => select(name, location)}
							>
								<h4>{name}</h4>
								{location?.address ?? ''}
								{location?.address && <br />}
								{location?.city ?? ''}, {location?.state ?? ''},{' '}
								{location?.country ?? ''}
							</Card>
						))}

					{!listings && (
						<Card
							className={clsx(
								cn.listing,
								cn['awaiting-location']
							)}
						>
							Allow location access to get nearby locations
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(NearbyLocationList);
