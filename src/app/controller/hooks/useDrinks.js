import {useState, useEffect} from 'react';

const useDrinks = () => {
    const [drinkids, setDrinksids] = useState([]);
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        setDrinksids(JSON.parse(localStorage.get('drinkids')));
    }, []);

    useEffect(() => {
        setDrinks(drinkids.map(id => JSON.parse(localStorage(id))));
    }, [drinkids]);

    return {
        drinkids,
        drinks,
    };
}

export default useDrinks
