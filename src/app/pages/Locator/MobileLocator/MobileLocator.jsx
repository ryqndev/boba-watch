import { memo, useState } from 'react';
import { Card, Map } from '../../../components';
import { SearchAreaButton, StoreMarker } from '../components';
import FilterIcon from '@material-ui/icons/TuneRounded';
import cn from './MobileLocator.module.scss';

const MobileLocator = ({ theme }) => {
	const [stores, setStores] = useState(null);
	const [selected, setSelected] = useState(null);
	const [center, setCenter] = useState(null);
	const [filters, setFilters] = useState({ openNow: false, coffee: false });

	return (
		<div className={cn.container}>
			<Map
				className={cn.map}
				zoom={12}
				center={center}
				setCenter={setCenter}
				theme={theme}
			>
				{position => (
					<>
                        <TuneRounded />
						<SearchAreaButton
							position={position}
							setStores={setStores}
							filters={filters}
						/>
						{stores &&
							stores.map(store => (
								<StoreMarker
									key={store.venue.id}
									data={store}
									setSelected={setSelected}
									setCenter={setCenter}
								/>
							))}
					</>
				)}
			</Map>
		</div>
	);
};

export default memo(MobileLocator);
