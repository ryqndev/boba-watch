import React, { useState } from 'react';
import {useTranslation} from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandedDrinkDescription from './ExpandedDrinkDescription';
import {toMoney} from '../../components/textUtil.js';
import FirebaseUser from '../../controller/backend.js';
import stats from '../../controller/calculateStatistics';
import './DrinkPanel.scss';
import {isAfter} from 'date-fns'
import {database} from '../../libs/firestore';
import {withRouter} from 'react-router-dom';
import {alertDefaultError, alertPublishSuccess, alertRestriction} from '../../libs/swal.js';

const DrinkPanel = ({data, history, triggerUpdate}) => {
    const {t} = useTranslation();
    const [expanded, setExpanded] = useState(false);
    const [canPublish, setCanPublish] = useState(true);
    const remove = () => {FirebaseUser.drinks.delete(data.id, removeLocally)}
    const removeLocally = () => {
        stats.deleteDrink(data.id, FirebaseUser.get.currentUser.drinkids);
        localStorage.setItem('user', JSON.stringify(FirebaseUser.get.currentUser));
        FirebaseUser.user.updateStats();
        triggerUpdate([...FirebaseUser.get.currentUser.drinkids]);
    }
    const edit = () => { history.push('/edit/' + data.id) }
    const publish = async() => {
        setCanPublish(false);
        try{
            let allowed = await database.collection(`users/${FirebaseUser.get.currentUser.user.uid}/blog`).doc('user').get();
            allowed = allowed.data()?.restrictedUntil;
            if(allowed !== undefined && isAfter(new Date(allowed), new Date())){
                setCanPublish(true);
                return alertRestriction(new Date(allowed).toDateString());
            }
            await FirebaseUser.publish(data);
            alertPublishSuccess();
        }catch(err){
            setCanPublish(true);
            alertDefaultError(err);
        }
    }
    const drinkDate = (new Date(data.date)).toDateString();
    return (
        <div className="drink-panel">
            <div className="info" onClick={() => {setExpanded(!expanded)}}>
                <p className="place">
                    {data.location}
                </p>
                <p className="price">
                    {t('$')}{toMoney(data.price)}
                </p>
                <div className="expand-icon">
                    {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
                <p className="name">
                    {data.name}
                </p>
                <p className="time">
                    {drinkDate.substr(4)}
                </p>
            </div>
            <div className={'collapsed-info' + (expanded ? ' expanded' : '')}>
                <ExpandedDrinkDescription {...data} date={drinkDate}/>
                <div className="options">
                    <button className="text" onClick={publish} disabled={!canPublish}>{t('PUBLISH')}</button>
                    <button className="text" onClick={edit}>{t('EDIT')}</button>
                    <button className="text" onClick={remove}>{t('DELETE')}</button>
                </div>
            </div>
        </div>
    );

}

export default withRouter(DrinkPanel);
