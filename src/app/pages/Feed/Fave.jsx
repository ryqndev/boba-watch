import React, {useState, useEffect, Fragment} from 'react';
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
        <Fragment>
            <div className="info-card">
                <h1>FAVES</h1>
                Look back at some of your favorite posts! Everytime you like a post, they'll show up here until you unlike them.
            </div>
            <TransitionGroup>
                {
                    posts.map((feedContent, i) =>
                        <CSSTransition mountOnEnter unmountOnExit timeout={350 + (50 * i)} classNames="fade-left" key={feedContent.id}>
                            <FeedItemWithAvatar
                                key={feedContent.id}
                                place={feedContent.location}
                                isLiked
                                setExpand={expand}
                                {...feedContent}
                            />
                        </CSSTransition>
                    )
                } 
            </TransitionGroup>
        </Fragment>
    )
}

export default Fave;
