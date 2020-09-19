import React, {useState, useEffect, Fragment} from 'react';
import {publishGetFeed} from '../../libs/firestore';
import {FeedItemWithAvatar} from './FeedItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './Feed.scss';

const Popular = ({displayCount, setDisplayCount, expand}) => {
    const [posts, setPosts] = useState([]);
    const [newOrPopular, setNewOrPopular] = useState('published');
    const [timeframe, setTimeframe] = useState('all');
    useEffect(() => publishGetFeed(displayCount, newOrPopular, timeframe, snapshot => {
        let feedposts = [];
        snapshot.forEach(doc => {feedposts.push({id: doc.id, ...doc.data()})});
        setPosts([...feedposts]);
    }), [displayCount, newOrPopular, timeframe]);

    return (
        <Fragment>
            <div className="info-card">
                <h1>EXPLORE</h1>
                Check out what other users around the world are drinking right now or publish your own.

                <div className="filter-split">
                    <div className="filter-border">
                        currently showing:
                    </div>
                    <div className="new-popular--toggle toggle">
                        <div className={`left ${newOrPopular === 'published' && 'selected'}`} onClick={() => {setNewOrPopular('published')}}>new</div>
                        <div className={`right ${newOrPopular === 'likes' && 'selected'}`} onClick={() => {setNewOrPopular('likes')}}>top</div>
                    </div>
                    <div className="time-length--toggle toggle">
                        <div className={`left ${timeframe === 'week' && 'selected'}`} onClick={() => {setTimeframe('week')}}>week</div>
                        <div className={timeframe === 'month' ? 'selected' : ''} onClick={() => {setTimeframe('month')}}>month</div>
                        <div className={`right ${timeframe === 'all' && 'selected'}`} onClick={() => {setTimeframe('all')}}>all</div>
                    </div>
                </div>
            </div>
            <TransitionGroup>
                {
                    posts.map((feedContent, i) =>
                        <CSSTransition timeout={250 + (50 * i)} classNames="fade-left" key={feedContent.id}>
                            <FeedItemWithAvatar
                                key={feedContent.id}
                                place={feedContent.location}
                                isLiked={feedContent?.fave ?? false}
                                setExpand={expand}
                                {...feedContent}
                            />
                        </CSSTransition>
                    )
                } 
            </TransitionGroup>
            {posts.length >= displayCount && <div className="show-more" onClick={() => {setDisplayCount(c => c + 8)}}>Show more</div>}
        </Fragment>
    );
}

export default Popular;