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

    const monthSum = Number(JSON.parse(localStorage.getItem('metrics')).tc);
    const totalSum = Number(JSON.parse(localStorage.getItem('completeMetrics')).tc);

    useEffect(() => {
        if(editDrinkDetails === null) return;
        setEdit(true);
    }, [editDrinkDetails]);

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
                monthly.push(drink);
            }else if(ddate.getMonth() !== month && ddate.getFullYear() !== year && displayedOverall > 0){
                total.push(drink);
            }
        });
        setMonthly(monthly);
        setComplete(total);
    }, [drinkids, completeDisplay, monthlyDisplay]);
    return (
        <div className="history-page">
            <h3 className="bw">{t('Monthly Spending')}</h3>
            <div className="history-spending">
                {monthly.map(e => <DrinkPanel key={e.id} data={e} setDrinkids={setDrinkids} setEditDetails={setEditDrinkDetails} />)}
            </div>
            <h3 className="bw history-total">
                <span>{t('Monthly Total')}:</span> {t('$')}{Utils.toMoney(monthSum)}
            </h3>
            <h3 className="bw">{t('Overall Spending')}</h3>
            <div className="history-spending">
                {complete.map(e => <DrinkPanel key={e.id} data={e} setDrinkids={setDrinkids} setEditDetails={setEditDrinkDetails} />)}
            </div>
            <h3 className="bw history-total">
                <span>{t('Complete Total')}:</span> {t('$')}{Utils.toMoney(totalSum)}
            </h3>
            <Edit open={edit} setOpen={setEdit} drinkData={editDrinkDetails} setDrinkids={setDrinkids}/>
        </div>
    );
}

export default History;
