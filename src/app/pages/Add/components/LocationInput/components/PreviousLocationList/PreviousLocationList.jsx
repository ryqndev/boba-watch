import { memo, useState } from 'react';
import useDrinks from '../../../../../../controller/hooks/useDrinks.js';
import { useDrinkByLocation } from '../../../../../Dashboard/DesktopDashboard/components/VisitedMap/controller/hooks';
import cn from './PreviousLocationList.module.scss';

const PreviousLocationList = () => {
	const { drinks } = useDrinks();
	const { locations } = useDrinkByLocation(drinks);
	const [listings, setListings] = useState(null);

	return (
		<div className={cn.container}>
			<h3>Previously Used</h3>
			{/* <div className={cn.search}>
				<Searchbar data={[{ description: 'syes' }]} Result={Result} />
			</div> */}
			{JSON.stringify(locations)}
		</div>
	);
};

const Result = () => {
	return <div>hey</div>;
};

export default memo(PreviousLocationList);
