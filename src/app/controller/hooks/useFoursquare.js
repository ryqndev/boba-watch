import { useCallback } from 'react';

const useFoursquare = () => {

    const getLocationsNearby = useCallback((query, callback, error = () => { }) => {
        const SERVER_ENDPOINT = 'https://us-central1-boba-watch-firebase.cloudfunctions.net/locator';

        fetch(SERVER_ENDPOINT + '?' + new URLSearchParams(query).toString())
            .then(res => res.json())
            .then(callback)
            .catch(error);
    }, []);
    const getLocationsByText = useCallback((query, callback, error = () => { }) => {
        const SERVER_ENDPOINT = 'https://us-central1-boba-watch-firebase.cloudfunctions.net/nearbyLocations';

        fetch(SERVER_ENDPOINT + '?' + new URLSearchParams(query).toString())
            .then(res => res.json())
            .then(callback)
            .catch(error);
    }, []);

    return {
        getLocationsNearby,
        getLocationsByText,
    };
}

export default useFoursquare;
