import {useState, useEffect} from 'react';

const useDrinks = () => {
    const [drinkids, setDrinksids] = useState([]);
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        setDrinksids(JSON.parse(localStorage.getItem('drinkids')));
    }, []);

    useEffect(() => {
        setDrinks(drinkids.map(id => JSON.parse(localStorage.getItem(id))));
    }, [drinkids]);

    return {
        drinkids,
        drinks,
    };
}

export default useDrinks
