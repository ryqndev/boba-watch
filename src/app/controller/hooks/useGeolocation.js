import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    const onError = (error) => {
        setError(error.message);
    };

    const setPos = ({coords, timestamp}) => {
        setPosition({
            accuracy: coords.accuracy,
            alt: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            lat: coords.latitude,
            lng: coords.longitude,
            timestamp: timestamp,
        });
    }

    useEffect(() => {
        if (!navigator || !navigator.geolocation) {
            setError('Geolocation is not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(setPos, onError, {});

    }, []);

    return { ...position, error };
};


export default useGeolocation;
