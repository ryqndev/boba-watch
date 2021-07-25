import { memo, useState, useEffect, useContext } from 'react';
import { deleteBlogPost, publishGetUser } from '../../libs/firestore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FeedItem } from '../Feed';
import {
	alertDefaultError,
	alertBlogPostDeletedSuccess,
	confirmDelete,
} from '../../libs/swal';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import './Reviews.scss';

const Reviews = ({ ownerUID, initialDisplayCount = 2 }) => {
	const [authUser] = useContext(AuthUserContext);
	const [posts, setPosts] = useState(null);
	const [displayCount, setDisplayCount] = useState(initialDisplayCount);

	useEffect(() => {
		setPosts(null);
		let isMounted = true;
		let unsubscribe = publishGetUser(
			ownerUID,
			displayCount,
			snapshot => {
				if (isMounted)
					setPosts(
						snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data(),
						}))
					);
			},
			displayCount
		);

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, [ownerUID, displayCount]);

	const deletePost = postID => {
		confirmDelete().then(res => {
			if (res.value) {
				deleteBlogPost(postID)
					.then(async res => {
						alertBlogPostDeletedSuccess();
						setPosts(posts.filter(post => post.id !== postID));
					})
					.catch(alertDefaultError);
			}
		});
	};
	const displayMore = () => {
		setDisplayCount(displayCount + 5);
	};
	const ContentDisplay = posts => {
		if (!posts) return [];
		let content = posts.map((post, i) => (
			<CSSTransition
				mountOnEnter
				unmountOnExit
				timeout={350 + 50 * i}
				classNames='fade-left'
				key={post.id}
			>
				<FeedItem place={post.location} expandable={false} {...post}>
					{ownerUID === authUser.uid && (
						<div className='item-controls'>
							<button
								onClick={() => {
									deletePost(post.id);
								}}
							>
								DELETE
							</button>
						</div>
					)}
				</FeedItem>
			</CSSTransition>
		));
		return content;
	};

	return (
		<div className='blog-reviews--wrapper'>
			{posts === null ? (
				<h3 key='@ryqndev/loading'>Loading...</h3>
			) : (
				posts?.length === 0 && (
					<h3 key='@ryqndev/empty'>No Published Reviews</h3>
				)
			)}
			<TransitionGroup>{ContentDisplay(posts)}</TransitionGroup>

			{posts && posts.length >= displayCount ? (
				<div key='@ryqndev/show' className='more' onClick={displayMore}>
					Click to show more
				</div>
			) : (
				<div key='@ryqndev/end' className='end'>
					No more posts to show.
				</div>
			)}
		</div>
	);
};

export default memo(Reviews);
