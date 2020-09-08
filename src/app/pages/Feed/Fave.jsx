import React, {useState, useEffect} from 'react';
import {FeedItemWithAvatar} from './FeedItem';
import {getFaves as getLocalDexieFaves} from '../../libs/dexie';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Fave = ({expand}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let feedposts = [];
        getLocalDexieFaves().then(posts => {
            feedposts = feedposts.concat(posts);
            setPosts(feedposts);
        });
    }, []);
    return (
        <TransitionGroup>
            {
                posts.map((feedContent, i) =>
                    <CSSTransition mountOnEnter unmountOnExit timeout={350 + (50 * i)} classNames="fade-left" key={feedContent.id}>
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
    )
}

export default Fave;
