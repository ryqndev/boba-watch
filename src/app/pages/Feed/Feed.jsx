import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import {FeedItemWithAvatar} from './FeedItem';
import './Feed.scss';

const Feed = () => {
    const {t} = useTranslation();
    const [posts, setPosts] = useState([]);
    const [isFave, setIsFave] = useState(false);
    useEffect(() => {
        (async() => {
            let entries = await FirebaseUser.publish.get.feed(FirebaseUser.get.currentUser.user.uid);
            let allPosts = [];
            entries.forEach(entry => {
                let data = {id: entry.id, ...entry.data()}
                allPosts.push(data);
            });
            setPosts(allPosts);
        })();
    }, []);
    return (
        <div className="feed-page">
            <div className="feed-header">
                <div className="icon"></div>
                EXPLORE
                <div className={isFave ? "" : "selected"} onClick={setIsFave.bind(null, false)}>PUBLIC</div>
                <div className={!isFave ? "" : "selected"} onClick={setIsFave.bind(null, true)}>FAVES</div>
            </div>
            <div className="content">
                {posts.map(feedContent => <FeedItemWithAvatar key={feedContent.id} place={feedContent.location} {...feedContent} />)}
            </div>
        </div>
    );
}

export default Feed;
