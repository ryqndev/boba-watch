import React, {useState, useEffect} from 'react';
import FirebaseUser from '../../controller/backend';
import {publishGetFeed, getFaves, getBlogPost} from '../../libs/firestore';
import {FeedItemWithAvatar} from './FeedItem';
import {add} from '../../libs/dexie';

const Fave = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // (async() => {
        //     let entries = await getFaves(FirebaseUser.get.currentUser.user.uid);
        //     let allPosts = [];
        //     entries.forEach(entry => {
        //         allPosts.push(getBlogPost(entry.id));
        //     });
        //     Promise.all(allPosts).then(res => {
        //         setPosts(res.reduce((acc, e) => {
        //             if(e.data() !== null && e.data() !== undefined){
        //                 acc.push({id: e.id, ...e.data()});
        //             }
        //             return acc;
        //         }, []));
        //     })
        // })();

        // load all fave items from dexie db

        // check firebase for most recent updated liked
            //if found:
                // add it to dexie db
                // 
    }, []);
    return posts.map(feedContent => 
        <FeedItemWithAvatar 
            key={feedContent.id} 
            place={feedContent.location} 
            {...feedContent} 
        />
    );
}

export default Fave;
