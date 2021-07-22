import { useState, useEffect, useCallback } from 'react';

const useDrinks = () => {
    const [drinkids, setDrinksids] = useState([]);
    const [drinks, setDrinks] = useState([]);

    const update = useCallback(() => {
        setDrinksids(JSON.parse(localStorage.getItem('drinkids')));
    }, []);

    useEffect(update, [update]);

    useEffect(() => {
        setDrinks(drinkids.map(id => JSON.parse(localStorage.getItem(id))));
    }, [drinkids]);

    return {
        drinkids,
        drinks,
        update,
    };
}

export default useDrinks;
