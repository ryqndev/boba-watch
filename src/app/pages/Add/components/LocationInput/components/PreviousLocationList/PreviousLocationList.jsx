import { memo } from 'react';
import useDrinks from '../../../../../../controller/hooks/useDrinks.js';
import { useDrinkByLocation } from '../../../../../../components/Map/controllers';
import { Card } from '../../../../../../components';
import cn from './PreviousLocationList.module.scss';
import { useTranslation } from 'react-i18next';

const PreviousLocationList = ({ onChange }) => {
	const { t } = useTranslation();
	const { drinks } = useDrinks();
	const { locations } = useDrinkByLocation(drinks);

	const select = (name, location) => {
		onChange('location', name, 250);
		onChange('address', location, () => true);
	};

	return (
		<div className={cn.container}>
			<h3>{t('previously used')}</h3>
			<div className={cn.scrollable}>
				<div className={cn.list}>
					{locations &&
						locations.map(({ coordinates, location, address }) => (
							<Card
								key={
									JSON.stringify(coordinates) +
									JSON.stringify(location)
								}
								className={cn.listing}
								onClick={() => select(location, address)}
							>
								<h4>{location}</h4>
								{address.address ?? ''}
								{address.address && <br />}
								{address?.city ?? ''}, {address?.state ?? ''},{' '}
								{address?.country ?? ''}
							</Card>
						))}
					{locations.length === 0 && (
						<Card className={cn.empty}>
							{t('no saved drinks with tagged location')}
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(PreviousLocationList);
