import { useState, useEffect } from 'react';

const useDrinkByLocation = drinks => {
	const [locations, setLocations] = useState([]);
	// Rounding coordinates to 6 decimals to fix different listings for same location by minute coordinate differences
	useEffect(() => {
		setLocations(
			Object.values(
				drinks.reduce(
					(locations, { location, id, address, date, ...drink }) => {
						if (!address?.lat || !address?.lng)
							return locations;

						const lat = Number(address.lat).toFixed(6);
						const lng = Number(address.lng).toFixed(6);
						const key = `${lat},${lng}${location}`;

						if (isNaN(lat) || isNaN(lng)) return locations;

						if (!locations.hasOwnProperty(key)) {
							locations[key] = {
								coordinates: [lat, lng],
								location,
								address,
								drinks: [{ id, date }],
							};
						} else {
							locations[key].drinks.push({ id, date });
						}

						return locations;
					},
					{}
				)
			)
		);
	}, [drinks]);

	return {
		locations,
	};
};

export default useDrinkByLocation;
