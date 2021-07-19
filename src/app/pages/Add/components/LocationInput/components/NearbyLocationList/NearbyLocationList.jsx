import { memo, useState, useEffect } from 'react';
import useGeolocation from '../../../../../../controller/hooks/useGeolocation';
import { Card } from '../../../../../../components';
import cn from './NearbyLocationList.module.scss';



const NearbyLocationList = () => {
	const position = useGeolocation();
	const [listings, setListings] = useState(null);
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (!position.lat || !position.lng) return;

		

		if (search.length < 3) {
			return;
		}

		const query = {
			lat: position.lat,
			lng: position.lng,
			input: search,
		};
		setListings(null);

		fetch(SERVER_ENDPOINT + '?' + new URLSearchParams(query).toString())
			.then(res => res.json())
			.then(res => {
				setListings(res.response.minivenues);
			})
			.catch(err => {
				console.error('ERROR:', err);
				setListings([]);
			});

	}, [position, listings, search]);

	const handleChange = e => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	return (
		<div className={cn.wrapper}>
			<input type='text' value={search} onChange={handleChange} />
			<div className={cn.scrollable}>
				<div className={cn.list}>
				{listings &&
					listings.map(({ name, location }) => (
						<Card key={name+JSON.stringify(location)} className={cn.listing}>
							<h4>{name}</h4>
							{location?.address ?? ''}
							{location?.address && <br />}
							{location?.city ?? ''} 
							, {location?.state ?? ''}
							, {location?.country ?? ''}
						</Card>
					))}

				{!listings && (
					<Card className={cn['awaiting-location']}>
						Allow location access to get nearby locations
					</Card>
				)}
				</div>
			</div>
		</div>
	);
};

export default memo(NearbyLocationList);
