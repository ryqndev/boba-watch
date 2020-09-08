import React from 'react';
import {useTranslation} from 'react-i18next';
import {toMoney} from '../../components/textUtil';
import Text from '../../components/globals/styles/Text';
import './Stats.scss';

const Stats = ({totalDrinksPurchased, averageDrinkCost, totalSpent}) => {
    const {t} = useTranslation();
    return (
        <div className="blog-stats--wrapper">
            <label>DRINKS PURCHASED</label> <p className="value"><Text>{totalDrinksPurchased ?? '---'}</Text></p>
            <label>DRINK AVERAGE</label> <p className="value"><Text>{t('$')}{toMoney(averageDrinkCost) ?? '---'}</Text></p>
            <label>TOTAL SPENT</label> <p className="value"><Text>{t('$')}{toMoney(totalSpent) ?? '---'}</Text></p>
        </div>
    )
}

export default Stats;