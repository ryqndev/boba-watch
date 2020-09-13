import React, {useState, useEffect} from 'react';
import {deleteBlogPost, publishGetUser} from '../../libs/firestore';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {FeedItem} from '../Feed';
import {
    alertDefaultError,
    alertBlogPostDeletedSuccess,
    confirmBlogPostDelete
} from '../../libs/swal';
import './Reviews.scss';

const Reviews = ({ownerUID, currentUID, initialDisplayCount=5}) => {
    const [posts, setPosts] = useState(null);
    const [displayCount, setDisplayCount] = useState(initialDisplayCount);

    useEffect(() => {
        setPosts(null);
        let unsubscribe = publishGetUser(ownerUID, displayCount, snapshot => {
            let feedposts = [];
            snapshot.forEach(doc => {
                feedposts.push({id: doc.id, ...doc.data()});
            });
            setPosts([...feedposts]);
        }, displayCount);

        return () => {
            unsubscribe();
        }
    }, [ownerUID, displayCount]);

    const deletePost = (postID) => {
        confirmBlogPostDelete().then((res) => {
            if(res.value){
                deleteBlogPost(postID).then(async(res) => {
                    alertBlogPostDeletedSuccess();
                    setPosts(posts.filter(post => post.id !== postID));
                }).catch(alertDefaultError);
            }
        })
    }
    const displayMore = () => { setDisplayCount(displayCount + 5) }
    const ContentDisplay = (posts) => {
        if (!posts) return [];
        let content = posts.map((post, i) => (
            <CSSTransition mountOnEnter unmountOnExit timeout={350 + (50 * i)} classNames="fade-left" key={post.id}>
                <FeedItem place={post.location} expandable={false} {...post}>
                    {(ownerUID === currentUID) && (
                        <div className="item-controls">
                            <button onClick={() => {deletePost(post.id)}}>DELETE</button>
                        </div>)
                    }
                </FeedItem>
            </CSSTransition>
        ));
        return content;
    }

    return (
        <div className="blog-reviews--wrapper">
            {
                posts === null 
                ? <h3 key="@ryqndev/loading">Loading...</h3>
                : posts?.length === 0 && <h3 key="@ryqndev/empty">No Published Reviews</h3>
            }
            <TransitionGroup>
                {ContentDisplay(posts)}
            </TransitionGroup>
            {posts && (posts.length >= displayCount) 
            ? <div key="@ryqndev/show" className="more" onClick={displayMore}>Click to show more</div>
            : <div key="@ryqndev/end"className="end">No more posts to show.</div>}
        </div>
    )
}

export default Reviews;