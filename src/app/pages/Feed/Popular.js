import React, {useState, useEffect} from 'react';
import {publishGetFeed} from '../../libs/firestore';
import {add} from '../../libs/dexie';
import {FeedItemWithAvatar} from './FeedItem';
import './Feed.scss';

const Popular = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let feedposts = [], unsubscribe = publishGetFeed(snapshot => {
            snapshot.docChanges().forEach(change => {
                console.log('snapshot update');
                if(change.type === 'added'){
                    let data = {id: change.doc.id, ...change.doc.data()}
                    feedposts.unshift(data);
                    setPosts([...feedposts]);
                    add(data);
                }
            });
        });
        return () => {
            console.log('snapshot unsubscribed');
            unsubscribe();
        }
    }, []);
    return posts.map(feedContent => 
        <FeedItemWithAvatar 
            key={feedContent.id} 
            place={feedContent.location} 
            {...feedContent} 
        />
    );
}

export default Popular;