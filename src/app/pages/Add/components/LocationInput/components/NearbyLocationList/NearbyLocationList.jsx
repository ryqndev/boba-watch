import { memo, useState, useEffect } from 'react';
import useGeolocation from '../../../../../../controller/hooks/useGeolocation';
import { Card, TextInput } from '../../../../../../components';
import useFoursquare from '../../../../../../controller/hooks/useFoursquare';
import clsx from 'clsx';
import cn from './NearbyLocationList.module.scss';

const NearbyLocationList = ({ onChange }) => {
	const position = useGeolocation();
	const [listings, setListings] = useState(null);
	const [searching, setSearching] = useState(false);
	const [search, setSearch] = useState('');

	const { getLocationsByText, getLocationsNearby } = useFoursquare();

	useEffect(() => {
		if (!position.lat || !position.lng || listings) return;
		const query = {
			lat: position.lat,
			lng: position.lng,
			coffee: true,
		};
		getLocationsNearby(query, res => {
			setListings(res.response.groups[0].items.map(e => e.venue));
		});
	}, [getLocationsNearby, position, listings, search]);

	useEffect(() => {
		if (!position.lat || !position.lng) return;

		if (!searching && listings) {
			const query = {
				lat: position.lat,
				lng: position.lng,
				input: search,
			};
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
			setSearching(true);
			return;
		}
	}, [position, search, listings, getLocationsByText, searching]);

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
					label='Search by name'
					value={search}
					onChange={handleChange}
				/>
			</div>

			<div className={cn.scrollable}>
				<div className={cn.list}>
					{listings &&
						listings.map(({ name, location }) => (
							<Card
								key={
									JSON.stringify(name) +
									JSON.stringify(location)
								}
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
