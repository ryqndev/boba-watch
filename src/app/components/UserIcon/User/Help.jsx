import React, {useState} from 'react';
import {Modal} from '../../../components';
import Carousel, {Dots} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import data from '../../../../assets/data/help.json';
import {useTranslation} from 'react-i18next';
import './Help.scss';

const number = data.data.length;

const Help = ({open, setOpen}) => {
    const [value, setValue] = useState(0);
    const {t} = useTranslation();
    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="help-content">
                <h2>{t("What's New?")}</h2>
                <Carousel 
                    slides={data.data.map(e => <HelpSlide key={e.title} {...e} />)}
                    value={value}
                    onChange={setValue} 
                    animationSpeed={250}
                />
                <Dots value={value} number={number} onChange={setValue}></Dots>
            </div>
        </Modal>
    )
}

const HelpSlide = ({img, title, path, desc}) => {
    return (
        <div className="slide">
            {img === undefined ? '' : <img alt="" src={require('../../../../assets/help/' + img)} />}
            <h3>{title}</h3>
            <span>{(path ?? []).join(' > ')}</span>
            <p>{desc}</p>
        </div>
    );
}

export default Help;
