import { memo } from 'react';
import { Card } from '../../../../components';
import cn from './Listing.module.scss';

const Listing = ({ data }) => {
	const restaurantID = data.venue.id;

	const formatDistance = distanceInMeters => {
		if (distanceInMeters > 1000) {
			return (distanceInMeters / 1000).toFixed(2) + ' km';
		}
		return distanceInMeters + ' m';
	};

	return (
		<Card className={cn.wrapper}>
			<h3>{data.venue.name}</h3>
			{data.venue.location.formattedAddress.map(address => (
				<>
					{address}
					<br />
				</>
			))}

			{formatDistance(data.venue.location.distance)}
		</Card>
	);
};

export default memo(Listing);
