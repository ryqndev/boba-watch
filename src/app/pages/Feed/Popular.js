import React, {useState, useEffect} from 'react';
import {publishGetFeed, getFaves as getCloudFirebaseFaves} from '../../libs/firestore';
import FirebaseUser from '../../controller/backend';
import {FeedItemWithAvatar} from './FeedItem';
import {add, exists} from '../../libs/dexie';
import './Feed.scss';

const Popular = ({displayCount}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let unsubscribe = publishGetFeed(snapshot => {
            let feedposts = [];
            snapshot.docChanges().forEach(change => {
                feedposts.push({id: change.doc.id, ...change.doc.data()});
            });
            setPosts([...feedposts]);
        }, displayCount);

        const recursivelyUpdate = (startAfter) => {
            getCloudFirebaseFaves(FirebaseUser.get.currentUser.user.uid, 1, startAfter).then(docSnap => {
                let cursor = docSnap.docs[0];
                if(cursor === undefined) return;
                exists(cursor.id).catch(err => {    
                    add({id: cursor.id, ...cursor.data()});
                    recursivelyUpdate(cursor);
                })
            });
        }
        recursivelyUpdate(0);

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