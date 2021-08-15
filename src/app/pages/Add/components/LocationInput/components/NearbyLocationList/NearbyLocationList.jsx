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
	const [searchable, setSearchable] = useState(false);

	const { getLocationsByText, getLocationsNearby } = useFoursquare();

	useEffect(() => {
		const wait = setTimeout(() => setSearchable(true), 400);
		return () => clearTimeout(wait);
	}, [search]);

	useEffect(() => {
		if (!searchable || !position.lat || !position.lng) return;
		const query = { lat: position.lat, lng: position.lng };
		setSearchable(false);

		if (search.length === 0)
			getLocationsNearby(
				{ coffee: true, ...query },
				res =>
					setListings(res.response.groups[0].items.map(e => e.venue)),
				() => setListings([])
			);
		else
			getLocationsByText(
				{ input: search, ...query },
				res => setListings(res.response.minivenues),
				() => setListings([])
			);
	}, [search, searchable, position, getLocationsByText, getLocationsNearby]);

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

					{(!listings || !listings.length) && (
						<Card
							className={clsx(
								cn.listing,
								cn['awaiting-location']
							)}
						>
							{!listings
								? 'Allow location access to get nearby locations.'
								: 'Nothing found matching your search'}
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(NearbyLocationList);
