import React, {useState, useEffect} from 'react';
import {publishGetFeed, getFeed as getCloudFirebaseFeed} from '../../libs/firestore';
import {add, exists, getFeed as getLocalDexieFeed} from '../../libs/dexie';
import {FeedItemWithAvatar} from './FeedItem';
import './Feed.scss';

const Popular = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let feedposts = [], offsetLimit = 0;
        getLocalDexieFeed().then(posts => {
            feedposts = feedposts.concat(posts);
            setPosts([...feedposts]);
        });
        const recursivelyUpdate = (startAfter) => {
            if(offsetLimit >= 10) return;
            getCloudFirebaseFeed(1, startAfter).then(docSnap => {
                offsetLimit++;
                let cursor = docSnap.docs[0];
                if(cursor === undefined) return;
                exists(cursor.id).then().catch(err => {    
                    add({id: cursor.id, fave: 1, ...cursor.data()});
                    feedposts.unshift({id: cursor.id, ...cursor.data()});
                    setPosts([...feedposts]);
                    recursivelyUpdate(cursor);
                })
            });
        }
        recursivelyUpdate(0);

        let unsubscribe = publishGetFeed(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    if(feedposts.findIndex(post => post.id === change.doc.id) !== -1) return;

                    let data = {id: change.doc.id, ...change.doc.data()}
                    feedposts.unshift(data);
                    setPosts([...feedposts]);
                    exists(data.id).catch(() => { add(data) });
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