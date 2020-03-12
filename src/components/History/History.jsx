import React, {useState, useEffect} from 'react';
import DrinkPanel from './DrinkPanel';
import Utils from '../textUtil.js';
import Add from '../Add/Add';
import './History.css';

const LoadMore = ({click}) => {
    return (
        <div className="thaman-color">
            <div className="history-load-more" onClick={click}>
                • • •
            </div>
        </div>
    );
}
const NoDrinksLabel = ({label}) => {
    return (
        <div className="thaman-color">
            <h3 className="bw">
                {label}
            </h3>
        </div>
    );
}

const History = ({drinks}) => {
    const [monthly, setMonthly] = useState({drinks: [<NoDrinksLabel key={1} label="No drinks this month :(" />], sum: 0});
    const [complete, setComplete] = useState({drinks: [<NoDrinksLabel key={1} label="Add a drink to start!" />], sum: 0});
    const [monthlyDisplay, setMonthlyDisplay] = useState(7);
    const [completeDisplay, setCompleteDisplay] = useState(5);
    const [editDrinkDetails, setEditDrinkDetails] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(editDrinkDetails === null) return;
        setEdit(true);
    }, [editDrinkDetails]);

    useEffect(() => {
        update();
    }, [drinks]);

    const update = () => {
        if(!Array.isArray(drinks) || !drinks.length) return;
        let compiledDrinks = drinks.map(id => JSON.parse(localStorage.getItem(id)) );
        let monthly = {drinks: [], sum: 0},
            total = {drinks: [], sum: 0},
            today = new Date(),
            month = today.getMonth(),
            year = today.getFullYear(),
            displayedMonthly = monthlyDisplay,
            displayedOverall = completeDisplay;

        for(const drink of compiledDrinks){
            if(displayedMonthly <= 0 && displayedOverall <= 0) break;

            let ddate = new Date(drink.date),
                curDrink = <DrinkPanel key={drink.id} data={drink} update={update} setEditDetails={setEditDrinkDetails} />;
            
            if(ddate.getMonth() === month && ddate.getFullYear() === year){
                if(displayedMonthly > 0 ){
                    monthly.drinks.push(curDrink);
                    displayedMonthly -= 1;
                }
                monthly.sum += parseFloat(drink.price);
            }else{
                if(displayedOverall > 0 ){
                    total.drinks.push(curDrink);
                    displayedOverall -= 1;
                }
            }
            total.sum += parseFloat(drink.price);
        }
        if(displayedMonthly <= 0){
            monthly.drinks.push(<LoadMore click={() => {setMonthlyDisplay(monthlyDisplay + 8)}} />);
        }
        if(displayedOverall <= 0){
            total.drinks.push(<LoadMore click={() => {setCompleteDisplay(completeDisplay + 8)}} />);
        }
        setMonthly(monthly);
        setComplete(total);
    };

    return (
        <div className="history-page">
            <h3 className="bw"> Monthly Spending</h3>
            <div className="history-spending">
                {monthly.drinks}
            </div>
            <h3 className="bw history-total">
                <span>Monthly Total:</span> ${Utils.toMoney(monthly.sum)}
            </h3>
            <h3 className="bw"> Overall Spending</h3>
            <div className="history-spending">
                {complete.drinks}
            </div>
            <h3 className="bw history-total">
                <span>Complete Total:</span> ${Utils.toMoney(complete.sum)}
            </h3>
            <Add open={edit} setOpen={setEdit} edit={editDrinkDetails}/>
        </div>
    );
}

export default History;
