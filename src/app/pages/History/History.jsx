import React, {useState, useEffect} from 'react';
import DrinkPanel from './DrinkPanel';
import Utils from '../../components/textUtil.js';
import {useTranslation} from 'react-i18next';
import {Searchbar} from '../../components';
import {user} from '../../controller';
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
        <div className="thaman-color none-label">
            <h3 className="bw none-label">
                {t(label)}
            </h3>
        </div>
    );
}

const History = () => {
    const {t} = useTranslation();
    const [monthly, setMonthly] = useState([]);
    const [total, setTotal] = useState([]);
    const [show, setShow] = useState({'complete': 5, 'recent': 7});
    const [expandedDrinklistData, setExpandedDrinklistData] = useState([]);
    const [drinkidsCopy, setDrinkidsCopy] = useState(user().drinkids);

    const monthSum = Number(JSON.parse(localStorage.getItem('metrics')).tc);
    const totalSum = Number(JSON.parse(localStorage.getItem('completeMetrics')).tc);
    useEffect(() => {
        let monthly = [], total = [], tempExpandedDrinkListData = [],
            d = new Date(), m = d.getMonth(), y = d.getFullYear(),
            {complete: com, recent: rec} = show;

        drinkidsCopy.forEach((drinkid) => {
            let drink = JSON.parse(localStorage.getItem(drinkid));
            tempExpandedDrinkListData.push(drink);
            let d = new Date(drink.date), recent = (d.getMonth() === m && d.getFullYear() === y);

            if(recent && rec > 0){
                monthly.push(<DrinkPanel triggerUpdate={setDrinkidsCopy} key={drink.id} data={drink}/>);
                rec--;
            }else if(!recent && com > 0){
                total.push(<DrinkPanel triggerUpdate={setDrinkidsCopy} key={drink.id} data={drink}/>);
                com--;
            }
        });
        if(monthly.length === 0){
            monthly.push(<NoDrinksLabel key='@ryqndev/empty' label="no drinks this month ...yet" />);
            if(total.length === 0) total.push(<NoDrinksLabel key='@ryqndev/empty' label="Add a drink to start!" />);
        }
        if(rec <= 0) monthly.push(<LoadMore key='@ryqndev/load' click={() => {setShow({...show, 'recent': show.recent + 10})}}/>);
        if(com <= 0) total.push(<LoadMore key='@ryqndev/load' click={() => {setShow({...show, 'complete': show.complete + 10})}}/>);

        setMonthly([...monthly]);
        setTotal([...total]);

        setExpandedDrinklistData(tempExpandedDrinkListData);

    }, [drinkidsCopy.length, drinkidsCopy, show, show.recent, show.complete]);

    const DrinkSearchResult = ({item, matches}) => {
        return (
            <DrinkPanel triggerUpdate={setDrinkidsCopy} data={item}/>
        );
    }

    return (
        <div className="history-page">
            <h3 className="bw">{t('Drink History')}</h3>
            <Searchbar 
                placeholder={t('Search your history...')}
                data={expandedDrinklistData}
                keys={['description', 'location', 'name', 'price']}
                Result={DrinkSearchResult}
            />
            <h3 className="bw">{t('Monthly Spending')}</h3>
            <div className="history-spending">
                {monthly}
            </div>
            <h3 className="bw history-total">
                <span>{t('Monthly Total')}:</span> {t('$')}{Utils.toMoney(monthSum)}
            </h3>
            <h3 className="bw">{t('Overall Spending')}</h3>
            <div className="history-spending">
                {total}
            </div>
            <h3 className="bw history-total">
                <span>{t('Complete Total')}:</span> {t('$')}{Utils.toMoney(totalSum)}
            </h3>
        </div>
    );
}

export default History;
