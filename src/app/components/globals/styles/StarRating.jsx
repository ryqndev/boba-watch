import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import clsx from 'clsx';
import { ReactComponent as StarEmptyIcon } from './star_empty.svg';
import { ReactComponent as StarFilledIcon } from './star_filled.svg';
import './StarRating.scss';

const StarRating = ({ rating, setRating, className }) => {
	return (
		<div className='star-rating--wrapper'>
			<div className={clsx(className, 'rating-select')}>
				<p>RATING :</p>
				<StarRatingComponent
					name='rating'
					starCount={5}
					value={rating}
					renderStarIcon={(i, v) =>
						i <= v ? <StarFilledIcon /> : <StarEmptyIcon />
					}
					onStarClick={v => {
						setRating(v);
					}}
					onStarHover={v => {
						setRating(v);
					}}
				/>
			</div>
		</div>
	);
};

export default StarRating;
