import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import Utils from '../../components/textUtil';
import {FeedItem} from '../Feed';
import LocationIcon from '@material-ui/icons/LocationOnRounded';

import './Blog.scss';

const Blog = () => {
    const {t} = useTranslation();
    const stats = JSON.parse(localStorage.getItem('metrics'));
    return (
        <div className="blog-page">
            <h1>PUBLIC PROFILE PREVIEW</h1>
            <div className="user">
                <img src={FirebaseUser.get.currentUser.user.photoURL} alt="avatar" />
                <h2>{FirebaseUser.get.currentUser.user.displayName}</h2>
            </div>
            <div className="profile">
                <LocationIcon className="icon"/> ARCADIA
                <p>I'm just a boba girl in a big boba world</p>
            </div>
            <div className="stats">
                <p>DRINK AVERAGE</p> {t('$')}{Utils.toMoney(stats.ad)}
                <p>MONTHLY TOTAL</p> {t('$')}{Utils.toMoney(stats.tc)}
                <p>DRINKS THIS MONTH</p> {stats.td}
            </div>
            <div className="content">

            </div>
        </div>
    );
}

export default Blog;
