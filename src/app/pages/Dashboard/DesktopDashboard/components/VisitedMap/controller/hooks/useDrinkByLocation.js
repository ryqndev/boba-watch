import { useState, useEffect } from 'react';

const useDrinkByLocation = (drinks) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const locationMap = {};

        drinks.forEach(drink => {
            if (!drink?.address?.lat || !drink?.address?.lng) return;

            const coordinateKey = `${drink.address.lat}${drink.address.lng}${drink?.location}`;

            if (locationMap.hasOwnProperty(coordinateKey)) {
                locationMap[coordinateKey].drinks = [...locationMap[coordinateKey].drinks, {
                    id: drink.id,
                    date: drink?.date,
                },]
            } else {
                locationMap[coordinateKey] = {
                    coordinates: [drink.address.lat, drink.address.lng],
                    location: drink?.location,
                    drinks: [
                        {
                            id: drink.id,
                            date: drink?.date,
                        },
                    ]
                };
            }
        });

        setLocations(Object.values(locationMap));
    }, [drinks]);

    return {
        locations,
    }
}

export default useDrinkByLocation
