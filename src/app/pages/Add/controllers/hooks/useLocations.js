import { useState, useEffect } from 'react';

const useLocations = (drinks) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        
    }, [drinks]);



    return {
        locations,
    }
}

export default useLocations;
