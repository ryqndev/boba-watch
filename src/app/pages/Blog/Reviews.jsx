import React, {useState, useEffect} from 'react';
import {deleteBlogPost, publishGetUser} from '../../libs/firestore';
import {FeedItem} from '../Feed';
import {
    alertDefaultError,
    alertBlogPostDeletedSuccess,
    confirmBlogPostDelete
} from '../../libs/swal';

const Reviews = ({ownerUID, currentUID, initialDisplayCount=3}) => {
    const [posts, setPosts] = useState(null);
    
    useEffect(() => {
        setPosts(null);
        publishGetUser(ownerUID, initialDisplayCount).then(entries => {
            let posts = [];
            entries.forEach(entry => {
                posts.push({id: entry.id, ...entry.data()});
            });
            setPosts(posts);
        }).catch(err => {
            alertDefaultError(err);
            setPosts([]);
        });
    }, [ownerUID]);

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
    const ContentDisplay = (posts) => {
        if(!posts)              return (<h3 key="@ryqndev/loading">Loading...</h3>);
        if(posts.length === 0)  return (<h3 key="@ryqndev/empty">No Published Reviews</h3>);
        
        return posts.map(post => (
            <FeedItem key={post.id} place={post.location} {...post}>
                {(ownerUID === currentUID) && (
                    <div className="item-controls">
                        <button onClick={() => {deletePost(post.id)}}>DELETE</button>
                    </div>)
                }
            </FeedItem>));
    }

    return (
        <div className="content">
            {ContentDisplay(posts)}
        </div>
    )
}

export default Reviews;