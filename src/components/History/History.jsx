import React, { useState, useEffect } from 'react';
import DrinkPanel from './DrinkPanel';
import Utils from '../textUtil.js';
import Add from '../Add/Add';
import './History.css';

const History = () => {
    const [monthly, setMonthly] = useState({
        drinks: [(<div className="thaman-color" key={1}><h3>No drinks this month :(</h3></div>)],
        sum: 0
    });
    const [complete, setComplete] = useState({
        drinks: [<div className="thaman-color" key={1}><h3>Add a drink to start!</h3></div>],
        sum: 0
    });
    const [monthlyDisplay, setMonthlyDisplay] = useState(7);
    const [completeDisplay, setCompleteDisplay] = useState(5);
    const [editDrinkDetails, setEditDrinkDetails] = useState(null);
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        if(editDrinkDetails === null) return;
        setEdit(true);
    }, [editDrinkDetails, setEdit])
    useEffect(() => {
        update();
    }, [monthlyDisplay, completeDisplay]);
    const update = () => {
        let drinks = JSON.parse(localStorage.getItem('drinkids'));
        if(!Array.isArray(drinks) || !drinks.length) return;
        drinks = drinks.map(id => JSON.parse(localStorage.getItem(id)) );
        let monthlyDrinks = [],
            totalDrinks = [],
            monthlySum = 0,
            totalSum = 0,
            today = new Date(),
            todayMonth = today.getMonth(),
            todayYear = today.getFullYear(),
            displayedMonthly = monthlyDisplay,
            displayedOverall = completeDisplay;
        
        drinks.forEach( ( e, i ) => {
            let drinkDate = new Date(e.date);
            if(drinkDate.getMonth() === todayMonth && drinkDate.getFullYear() === todayYear){
                if(displayedMonthly > 0 ){
                    monthlyDrinks.push((<DrinkPanel key={e.id} data={e} update={update} setEditDetails={setEditDrinkDetails} />));
                    displayedMonthly = displayedMonthly - 1;
                }
                monthlySum += parseFloat(e.price);
            }else{
                if(displayedOverall > 0 ){
                    totalDrinks.push((<DrinkPanel key={e.id} data={e} update={update} setEditDetails={setEditDrinkDetails} />));
                    displayedOverall = displayedOverall - 1;
                }
            }
            totalSum += parseFloat(e.price);
        });
        if( displayedMonthly <= 0 ){
            monthlyDrinks.push(
                <div className="thaman-color">
                <div className="history-load-more" onClick={displayMoreMonthly}>
                    • • •
                </div>
            </div>
            );
        }
        if( displayedOverall <= 0 ){
            totalDrinks.push(
                <div className="thaman-color">
                <div className="history-load-more" onClick={displayMoreOverall}>
                    • • •
                </div>
            </div>
            );
        }
        setMonthly({
            drinks: monthlyDrinks,
            sum: monthlySum
        });
        setComplete({
            drinks: totalDrinks,
            sum: totalSum
        });
    };
    const displayMoreMonthly = () => {
        setMonthlyDisplay(monthlyDisplay + 8);
    }
    const displayMoreOverall = () => {
        setCompleteDisplay(completeDisplay + 8);
    }
    return (
        <div className="history-page">
            <h3> Monthly Spending</h3>
            <div className="history-spending">
                {monthly.drinks}
            </div>
            <h3 className="history-total">
                <span>Monthly Total:</span> ${Utils.toMoney(monthly.sum)}
            </h3>
            <br />
            <br />
            <h3> Overall Spending</h3>
            <div className="history-spending">
                {complete.drinks}
            </div>
            <h3 className="history-total">
                <span>Complete Total:</span> ${Utils.toMoney(complete.sum)}
            </h3>
            <Add open={edit} setOpen={setEdit} edit={editDrinkDetails}/>
        </div>
    );
}

export default History;
