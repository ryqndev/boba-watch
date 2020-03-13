import React, {useState, useEffect} from 'react';
import DrinkPanel from './DrinkPanel';
import Utils from '../../components/textUtil.js';
import {Edit} from '../Add';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
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
    const {t} = useTranslation();
    return (
        <div className="thaman-color">
            <h3 className="bw">
                {t(label)}
            </h3>
        </div>
    );
}

const History = ({drinkids, setDrinkids}) => {
    const {t} = useTranslation();
    // const [monthly, setMonthly] = useState({drinks: [<NoDrinksLabel key={1} label="No drinks this month" />], sum: 0});
    // const [complete, setComplete] = useState({drinks: [<NoDrinksLabel key={1} label="Add a drink to start!" />], sum: 0});
    const [monthly, setMonthly] = useState([]);
    const [complete, setComplete] = useState([]);
    const [monthlyDisplay, setMonthlyDisplay] = useState(7);
    const [completeDisplay, setCompleteDisplay] = useState(5);
    const [editDrinkDetails, setEditDrinkDetails] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(editDrinkDetails === null) return;
        setEdit(true);
    }, [editDrinkDetails]);

    useEffect(() => {
        // console.log(drinkids);
        // update();
        // drinkids.forEach()
        let monthly = [],
            total = [],
            today = new Date(),
            month = today.getMonth(),
            year = today.getFullYear(),
            displayedMonthly = monthlyDisplay,
            displayedOverall = completeDisplay;
        FirebaseUser.get.currentUser.drinklist.forEach(drink => {
            let ddate = new Date(drink.date);
            if(ddate.getMonth() === month && ddate.getFullYear() === year && monthlyDisplay > 0){
                monthly.push(drink);
            }else if(ddate.getMonth() !== month && ddate.getFullYear() !== year && completeDisplay > 0){
                total.push(drink);
            }
        });
        setMonthly(monthly);
        setComplete(total);
    }, [drinkids]);

    // const update = () => {
        // console.log("update", drinkids);
        // let drinks = drinkids;
        // if(!Array.isArray(drinkids) || !drinkids.length) return;
        // let compiledDrinks = drinks.map(id => JSON.parse(localStorage.getItem(id)) );
        // let monthly = [],
        //     total = [],
        //     today = new Date(),
        //     month = today.getMonth(),
        //     year = today.getFullYear(),
        //     displayedMonthly = monthlyDisplay,
        //     displayedOverall = completeDisplay;

        // for(const drink of compiledDrinks){
        //     if(displayedMonthly <= 0 && displayedOverall <= 0) break;

        //     let ddate = new Date(drink.date),
        //         curDrink = <DrinkPanel key={drink.id} data={drink} update={setDrinkids} setEditDetails={setEditDrinkDetails} />;
            
        //     if(ddate.getMonth() === month && ddate.getFullYear() === year){
        //         if(displayedMonthly > 0 ){
        //             monthly.drinks.push(curDrink);
        //             displayedMonthly -= 1;
        //         }
        //         monthly.sum += parseFloat(drink.price);
        //     }else{
        //         if(displayedOverall > 0 ){
        //             total.drinks.push(curDrink);
        //             displayedOverall -= 1;
        //         }
        //     }
        // }
        // if(displayedMonthly <= 0){
        //     monthly.drinks.push(<LoadMore click={() => {setMonthlyDisplay(monthlyDisplay + 8)}} />);
        // }
        // if(displayedOverall <= 0){
        //     total.drinks.push(<LoadMore click={() => {setCompleteDisplay(completeDisplay + 8)}} />);
        // }
        // setMonthly(monthly);
        // setComplete(total);
    // };
    // const update = () => {
    //     console.log("update", drinkids);
    //     let drinks = drinkids;
    //     if(!Array.isArray(drinks) || !drinks.length) return;
    //     let compiledDrinks = drinks.map(id => JSON.parse(localStorage.getItem(id)) );
    //     let monthly = {drinks: [], sum: 0},
    //         total = {drinks: [], sum: 0},
    //         today = new Date(),
    //         month = today.getMonth(),
    //         year = today.getFullYear(),
    //         displayedMonthly = monthlyDisplay,
    //         displayedOverall = completeDisplay;

    //     for(const drink of compiledDrinks){
    //         if(displayedMonthly <= 0 && displayedOverall <= 0) break;

    //         let ddate = new Date(drink.date),
    //             curDrink = <DrinkPanel key={drink.id} data={drink} update={setDrinkids} setEditDetails={setEditDrinkDetails} />;
            
    //         if(ddate.getMonth() === month && ddate.getFullYear() === year){
    //             if(displayedMonthly > 0 ){
    //                 monthly.drinks.push(curDrink);
    //                 displayedMonthly -= 1;
    //             }
    //             monthly.sum += parseFloat(drink.price);
    //         }else{
    //             if(displayedOverall > 0 ){
    //                 total.drinks.push(curDrink);
    //                 displayedOverall -= 1;
    //             }
    //         }
    //         total.sum += parseFloat(drink.price);
    //     }
    //     if(displayedMonthly <= 0){
    //         monthly.drinks.push(<LoadMore click={() => {setMonthlyDisplay(monthlyDisplay + 8)}} />);
    //     }
    //     if(displayedOverall <= 0){
    //         total.drinks.push(<LoadMore click={() => {setCompleteDisplay(completeDisplay + 8)}} />);
    //     }
    //     setMonthly(monthly);
    //     setComplete(total);
    // };

    return (
        <div className="history-page">
            <h3 className="bw">{t('Monthly Spending')}</h3>
            <div className="history-spending">
                {/* {monthly.drinks} */}
                {monthly.map(e => <DrinkPanel key={e.id} data={e} update={setDrinkids} setEditDetails={setEditDrinkDetails} />)}
            </div>
            <h3 className="bw history-total">
                <span>{t('Monthly Total')}:</span> {t('$')}{Utils.toMoney(monthly.sum)}
            </h3>
            <h3 className="bw">{t('Overall Spending')}</h3>
            <div className="history-spending">
                {/* {complete.drinks} */}
                {complete.map(e => <DrinkPanel key={e.id} data={e} update={setDrinkids} setEditDetails={setEditDrinkDetails} />)}
            </div>
            <h3 className="bw history-total">
                <span>{t('Complete Total')}:</span> {t('$')}{Utils.toMoney(complete.sum)}
            </h3>
            <Edit open={edit} setOpen={setEdit} edit={editDrinkDetails} setDrinkids={setDrinkids}/>
        </div>
    );
}

export default History;
