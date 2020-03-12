import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Utils from '../textUtil.js';
import backend from '../firebaseCalls';
import stats from '../calculateStatistics';
import './DrinkPanel.scss';

const DrinkPanel = ({setEditDetails, data, update}) => {
    const [expanded, setExpanded] = useState(false);
    const remove = () => { backend.drinks.delete(data.id, removeLocally) }
    const removeLocally = () => {
        stats.deleteDrink(data.id);
        update();
        backend.user.updateStats();
    }
    const edit = () => {setEditDetails({...data, update: update})}
    const drinkDate = new Date(data.date);
    return (
        <div className="drink-panel">
            <div className="info" onClick={() => {setExpanded(!expanded)}}>
                <p className="place">
                    {data.location}
                </p>
                <p className="price">
                    ${Utils.toMoney(data.price)}
                </p>
                <div className="expand-icon">
                    {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
                <p className="name">
                    {data.name}
                </p>
                <p className="time">
                    {drinkDate.toDateString().substr(4)}
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
                    <span>on</span> {drinkDate.toDateString()}
                </p>

                <div className="options">
                    <button className="text" onClick={edit}>EDIT</button>
                    <button className="text" onClick={remove}>DELETE</button>
                </div>
            </div>
        </div>
    );

}

export default DrinkPanel;
