import { memo } from 'react';
import useDrinks from '../../../../../../controller/hooks/useDrinks.js';
import { useDrinkByLocation } from '../../../../../Dashboard/DesktopDashboard/components/VisitedMap/controller/hooks';
import { Card } from '../../../../../../components';
import cn from './PreviousLocationList.module.scss';

const PreviousLocationList = ({ onChange }) => {
	const { drinks } = useDrinks();
	const { locations } = useDrinkByLocation(drinks);

	const select = (name, location) => {
		onChange('location', name, 250);
		onChange('address', location, () => true);
	};

	return (
		<div className={cn.container}>
			<h3>Previously Used</h3>
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
				</div>
			</div>
		</div>
	);
};

export default memo(PreviousLocationList);
