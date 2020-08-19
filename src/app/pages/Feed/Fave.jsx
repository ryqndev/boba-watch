import React, {useState, useEffect} from 'react';
import {FeedItemWithAvatar} from './FeedItem';
import {getFaves as getLocalDexieFaves} from '../../libs/dexie';

const Fave = ({expand}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let feedposts = [];
        getLocalDexieFaves().then(posts => {
            feedposts = feedposts.concat(posts);
            setPosts(feedposts);
        });
    }, []);
    return posts.map(feedContent => 
        <FeedItemWithAvatar 
            key={feedContent.id} 
            place={feedContent.location} 
            setExpand={expand}
            isLiked
            {...feedContent} 
        />
    );
}

export default Fave;
