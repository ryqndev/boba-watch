import { memo, useState, useEffect } from 'react';
import { Map } from '../../../components';
import { VisitedLocations } from '../../../components/Map/components';
import { useDrinks } from '../../../controller/hooks';
import { SearchAreaButton, StoreMarker } from '../components';
import Swal from 'sweetalert2';
import { MapActions } from './components';
import { useTranslation } from 'react-i18next';
import cn from './MobileLocator.module.scss';

const MobileLocator = ({ theme }) => {
	const { t } = useTranslation();
	const [stores, setStores] = useState(null);
	const [selected, setSelected] = useState(null);
	const [localOnly, setLocalOnly] = useState(true);
	const [center, setCenter] = useState(null);
	const { drinks } = useDrinks();
	const [filters, setFilters] = useState({ openNow: false, coffee: false });

	useEffect(() => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});

		Toast.fire({
			icon: 'success',
			text: localOnly
				? t('Showing visited places')
				: t('Finding nearby places'),
		});
	}, [localOnly, t]);

	return (
		<div className={cn.container}>
			<Map
				className={cn.map}
				zoom={11}
				center={center}
				setCenter={setCenter}
				theme={theme}
				zoomControl={false}
			>
				<>
					<MapActions
						localOnly={localOnly}
						setLocalOnly={setLocalOnly}
					/>
					{localOnly ? (
						<VisitedLocations drinks={drinks} />
					) : (
						<>
							<SearchAreaButton
								className={cn['search-area--btn']}
								setStores={setStores}
								position={center}
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
				</>
			</Map>
		</div>
	);
};

export default memo(MobileLocator);
