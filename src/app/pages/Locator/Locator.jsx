import clsx from 'clsx';
import { useState } from 'react';
import { Card } from '../../components';
import Map from '../../components/Map';
import {
	Listing,
	EmptyListingNote,
	LoadingListingNote,
	SearchAreaButton,
	StoreMarker,
} from './components';
import cn from './Locator.module.scss';

const Locator = ({ theme }) => {
	const [stores, setStores] = useState(null);
	const [selected, setSelected] = useState(null);
	const [center, setCenter] = useState(null);
	const [filters, setFilters] = useState({ openNow: false, coffee: false });

	const toggleFilterValue = (filterName, value) => {
		setFilters(prev => ({
			...prev,
			[filterName]: value !== undefined ? value : !prev[filterName],
		}));
	};

	return (
		<main className={cn.container}>
			<header>
				<h1 className={cn.title}>Boba Locator</h1>
			</header>
			<Card className={cn.map}>
				<Map
					zoom={12}
					center={center}
					setCenter={setCenter}
					theme={theme}
				>
					{position => (
						<>
							<SearchAreaButton
								position={position}
								setStores={setStores}
								filters={filters}
							/>
							{stores && stores.map(store => (
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
			</Card>
			<div className={cn.details}>
				<Card className={cn.filters}>
					<h3>Locations</h3>
					<button
						className={clsx(filters.openNow && cn.selected)}
						onClick={() => {
							toggleFilterValue('openNow');
						}}
					>
						OPEN NOW
					</button>
					<div className={cn.toggle}>
						<button
							className={clsx(!filters.coffee && cn.selected)}
							onClick={() => toggleFilterValue('coffee', false)}
						>
							BOBA
						</button>
						<button
							className={clsx(filters.coffee && cn.selected)}
							onClick={() => toggleFilterValue('coffee', true)}
						>
							COFFEE
						</button>
					</div>
				</Card>
				<div className={cn['list-holder']}>
					<div className={cn.list}>
						{!stores && <LoadingListingNote />}
						{stores && stores.length === 0 && <EmptyListingNote />}
						{stores && stores.map(store => (
							<Listing
								key={store.venue.id}
								data={store}
								selected={selected}
								setCenter={setCenter}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Locator;
