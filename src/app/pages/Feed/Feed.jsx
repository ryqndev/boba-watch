import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import {FeedItemWithAvatar} from './FeedItem';
import './Feed.scss';

const Feed = () => {
    const {t} = useTranslation();
    const data = [{
        'user': 'ucVi4HfTVKNThYl4ppTPJN5F6AE3',
        'name': 'jasmine milk tea',
        'location': 'Half & Half',
        'price': 300,
        'date': '2020-03-28T08:50:18.548Z',
        'likes': 0,
        'description': 'Half & Half has REALLY big cups that don\'t fit in my cupholder which is sometimesw more provblematic than I would like it to be. The drink was GREAT though.'
    },
    {
        'user': 'ucVi4HfTVKNThYl4ppTPJN5F6AE3',
        'name': 'some drink',
        'location': 'currently hardcoded',
        'price': 300,
        'date': '2020-03-28T08:50:18.548Z',
        'likes': 0,
        'description': 'short ddescription. hardcoded data - not yet connected to db'
    }];
    return (
        <div className="feed-page">
            <h1>EXPLORE</h1>
            <div className="content">
                {data.map(feedContent => <FeedItemWithAvatar {...feedContent} />)}
            </div>
        </div>
    );
}

export default Feed;
