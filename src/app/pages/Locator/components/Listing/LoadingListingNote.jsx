import { memo } from 'react';
import { Card } from '../../../../components';
import cn from './Listing.module.scss';

const EmptyListingNote = () => {
	return (
		<Card className={cn.container}>
			<h3>Loading....</h3>
			<p className={cn.distance}>
				Trying to find places near you. If this is taking too long,
				check your internet and try again.
				<br />
				<br />
				Make sure you have your location enabled otherwise you will need
				to manually search
			</p>
		</Card>
	);
};

export default memo(EmptyListingNote);
