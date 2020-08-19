import React from 'react';
import {useTranslation} from 'react-i18next';
import './ExpandedDrinkDescription.scss';

const ExpandedDrinkDescription = ({name, location, description, date}) => {
    const {t} = useTranslation();
    return (
        <div className="expanded-drink-description--wrapper">
            <p className="title">
                {name}
                <br />
                <span>@{location}</span>
            </p>
            <br />
            <p className="description">
                {description}
            </p>
            <br />
            <p className="date">
                <span>{t('on')}</span> {date}
            </p>
        </div>
    )
}

export default ExpandedDrinkDescription;