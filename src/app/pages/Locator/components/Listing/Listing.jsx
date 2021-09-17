import { memo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components';
import cn from './Listing.module.scss';

const Listing = ({ data, selected, setCenter }) => {
	const { t } = useTranslation();
	const restaurantID = data.venue.id;
	const scrollToRef = useRef(null);

	const formatDistance = distanceInMeters => {
		if (distanceInMeters > 1000) {
			return (distanceInMeters / 1000).toFixed(2) + ' ' + t('km');
		}
		return distanceInMeters + ' ' + t('meters');
	};

	const viewOnMap = () => {
		setCenter([data.venue.location.lat, data.venue.location.lng]);
	};

	useEffect(() => {
		if (selected !== restaurantID) return;
		scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [selected, restaurantID]);

	return (
		<Card
			className={cn.container}
			forwardedref={scrollToRef}
		>
			<h3>{data.venue.name}</h3>
			<p className={cn.distance}>
				<span>{formatDistance(data.venue.location.distance)}</span> {t('from search pin')}
			</p>
			<p className={cn.address}>{data.venue.location.formattedAddress.join(', ')}</p>
			<span className={cn.center} onClick={viewOnMap}>{t('center on map')}</span>
		</Card>
	);
};

export default memo(Listing);
