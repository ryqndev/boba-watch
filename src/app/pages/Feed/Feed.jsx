import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import {FeedItemWithAvatar} from './FeedItem';
import './Feed.scss';

const Feed = () => {
    const {t} = useTranslation();
    const [posts, setPosts] = useState(null);
    const [faves, setFaves] = useState(null);
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
    useEffect(() => {
        if(faves === null && isFave){
            (async() => {
                let entries = await FirebaseUser.blog.faves(FirebaseUser.get.currentUser.user.uid);
                let allPosts = [];
                entries.forEach(entry => {
                    allPosts.push(FirebaseUser.blog.get(entry.id));
                });
                Promise.all(allPosts).then(res => {
                    setFaves(res.reduce((acc, e) => {
                        if(e.data() !== null && e.data() !== undefined){
                            acc.push({id: e.id, ...e.data()});
                        }
                        return acc;
                    }, []));
                })
            })();
        }
    }, [isFave, faves]);
    return (
        <div className="feed-page">
            <div className="feed-header">
                <div className="icon"></div>
                {t("EXPLORE")}
                <div className={isFave ? "" : "selected"} onClick={setIsFave.bind(null, false)}>{t("PUBLIC")}</div>
                <div className={!isFave ? "" : "selected"} onClick={setIsFave.bind(null, true)}>{t("FAVES")}</div>
            </div>
            <div className="content">
                {isFave 
                    ? (faves ?? []).map(feedContent => <FeedItemWithAvatar key={feedContent.id} place={feedContent.location} {...feedContent} />)
                    : (posts ?? []).map(feedContent => <FeedItemWithAvatar key={feedContent.id} place={feedContent.location} {...feedContent} />)
                }
                <div className="feed-end">No more posts to show.</div>
            </div>
        </div>
    );
}

export default Feed;
