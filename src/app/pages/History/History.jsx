import React, {useState, useEffect} from 'react';
import DrinkPanel from './DrinkPanel';
import Utils from '../../components/textUtil.js';
import {Edit} from '../Add';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import './History.scss';

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
    const [monthly, setMonthly] = useState([<NoDrinksLabel key={1} label="No drinks this month" />]);
    const [complete, setComplete] = useState([<NoDrinksLabel key={1} label="Add a drink to start!" />]);
    const [monthlyDisplay, setMonthlyDisplay] = useState(7);
    const [completeDisplay, setCompleteDisplay] = useState(5);

    const monthSum = Number(JSON.parse(localStorage.getItem('metrics')).tc);
    const totalSum = Number(JSON.parse(localStorage.getItem('completeMetrics')).tc);

    useEffect(() => {
        let monthly = [],
            total = [],
            today = new Date(),
            month = today.getMonth(),
            year = today.getFullYear(),
            displayedMonthly = monthlyDisplay,
            displayedOverall = completeDisplay;
        drinkids.forEach((drinkid, i) => {
            let drink = JSON.parse(localStorage.getItem(drinkid));
            let ddate = new Date(drink.date);

            if(ddate.getMonth() === month && ddate.getFullYear() === year && displayedMonthly > 0){
                monthly.push(<DrinkPanel key={drink.id} data={drink}/>);
                displayedMonthly--;
            }else if(ddate.getMonth() !== month && ddate.getFullYear() === year && displayedOverall > 0){
                total.push(<DrinkPanel key={drink.id} data={drink}/>);
                displayedOverall--;
            }
        });
        if(displayedMonthly <= 0) monthly.push(<LoadMore click={() => {setMonthlyDisplay(monthlyDisplay + 10)}}/>);
        if(displayedOverall <= 0) total.push(<LoadMore click={() => {setCompleteDisplay(completeDisplay + 10)}}/>);
        setMonthly(monthly);
        setComplete(total);

    }, [drinkids, completeDisplay, monthlyDisplay]);
    return (
        <div className="history-page">
            <h3 className="bw">{t('Monthly Spending')}</h3>
            <div className="history-spending">
                {monthly}
            </div>
            <h3 className="bw history-total">
                <span>{t('Monthly Total')}:</span> {t('$')}{Utils.toMoney(monthSum)}
            </h3>
            <h3 className="bw">{t('Overall Spending')}</h3>
            <div className="history-spending">
                {complete}
            </div>
            <h3 className="bw history-total">
                <span>{t('Complete Total')}:</span> {t('$')}{Utils.toMoney(totalSum)}
            </h3>
        </div>
    );
}

export default History;
