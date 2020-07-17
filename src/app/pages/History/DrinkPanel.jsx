import React, { useState } from 'react';
import {useTranslation} from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Utils from '../../components/textUtil.js';
import FirebaseUser from '../../controller/backend.js';
import stats from '../../controller/calculateStatistics';
import './DrinkPanel.scss';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';

const DrinkPanel = ({data, history}) => {
    const {t} = useTranslation();
    const [expanded, setExpanded] = useState(false);
    const [canPublish, setCanPublish] = useState(true);
    const remove = () => {FirebaseUser.drinks.delete(data.id, removeLocally)}
    const removeLocally = () => {
        stats.deleteDrink(data.id, FirebaseUser.get.currentUser.drinkids);
        localStorage.setItem('user', JSON.stringify(FirebaseUser.get.currentUser));
        FirebaseUser.user.updateStats();
    }
    const edit = () => {
        history.push('/edit/' + data.id);
    }
    const publish = async() => {
        setCanPublish(false);
        try{
            await FirebaseUser.publish.add(data);
            Swal.fire('Success!', 'Drink published on your blog!', 'success');
        }catch(err){
            setCanPublish(true);
            Swal.fire('Error!', err+'', 'error');
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
                    {t('$')}{Utils.toMoney(data.price)}
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
                <p className="label">
                    {data.name} 
                    <br />
                    <span>@{data.location}</span>
                </p>
                <p className="description">
                    {data.description}
                </p>
                <p className="date">
                    <span>{t('on')}</span> {drinkDate}
                </p>

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
