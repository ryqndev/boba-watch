import React, {useState, useEffect} from 'react';
import {publishGetFeed} from '../../libs/firestore';
import {FeedItemWithAvatar} from './FeedItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './Feed.scss';

const Popular = ({displayCount, expand}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => publishGetFeed(displayCount, snapshot => {
        let feedposts = [];
        snapshot.forEach(doc => {feedposts.push({id: doc.id, ...doc.data()})});
        setPosts([...feedposts]);
    }), [displayCount]);

    return (
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
    );
}

export default Popular;