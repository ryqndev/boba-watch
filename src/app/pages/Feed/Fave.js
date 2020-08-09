import React, {useState, useEffect} from 'react';
import FirebaseUser from '../../controller/backend';
import {publishGetFeed, getBlogPost} from '../../libs/firestore';
import {FeedItemWithAvatar} from './FeedItem';
import {add, getFaves} from '../../libs/dexie';

const Fave = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // let data = {id: change.doc.id, ...change.doc.data()}
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

        let feedposts = [];
        getFaves(posts => {
            feedposts = feedposts.concat(posts);
            setPosts(feedposts);
        });
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
