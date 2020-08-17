import React from 'react';
import {useTranslation} from 'react-i18next';
import Utils from '../../components/textUtil';
import './Stats.scss';

const Stats = ({totalDrinksPurchased, averageDrinkCost, totalSpent}) => {
    const {t} = useTranslation();
    return (
        <div className="blog-stats--wrapper">
            <label>DRINKS PURCHASED</label> <p className="value">{totalDrinksPurchased ?? '---'}</p>
            <label>DRINK AVERAGE</label> <p className="value">{t('$')}{Utils.toMoney(averageDrinkCost) ?? '---'}</p>
            <label>TOTAL SPENT</label> <p className="value">{t('$')}{Utils.toMoney(totalSpent) ?? '---'}</p>
        </div>
    )
}

export default Stats;