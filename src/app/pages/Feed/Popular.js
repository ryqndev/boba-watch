import React, {useState, useEffect} from 'react';
import {publishGetFeed} from '../../libs/firestore';
import {FeedItemWithAvatar} from './FeedItem';
import './Feed.scss';

const Popular = ({displayCount}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let unsubscribe = publishGetFeed(snapshot => {
            let feedposts = [];
            snapshot.forEach(doc => {
                feedposts.push({id: doc.id, ...doc.data()});
            });
            setPosts([...feedposts]);
        }, displayCount);

        return () => {
            unsubscribe();
        }
    }, [displayCount]);

    return posts.map(feedContent => 
        <FeedItemWithAvatar 
            key={feedContent.id} 
            place={feedContent.location} 
            isLiked={feedContent?.fave ?? false}
            {...feedContent} 
        />
    );
}

export default Popular;