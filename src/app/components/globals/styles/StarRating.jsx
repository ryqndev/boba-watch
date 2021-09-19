import { memo } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { ReactComponent as StarEmptyIcon } from './star_empty.svg';
import { ReactComponent as StarFilledIcon } from './star_filled.svg';
import './StarRating.scss';

const StarRating = ({ rating, setRating, className }) => {
	const { t } = useTranslation();

	return (
		<div className='star-rating--wrapper'>
			<div className={clsx(className, 'rating-select')}>
				<p>{t('rating')} :</p>
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

export default memo(StarRating);
