import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Card, Map } from '../../../components';
import {
	Listing,
	EmptyListingNote,
	LoadingListingNote,
	SearchAreaButton,
	StoreMarker,
} from '../components';
import cn from './DesktopLocator.module.scss';

const DesktopLocator = ({ theme }) => {
	const { t } = useTranslation();
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
				<h1 className={cn.title}>{t('boba locator')}</h1>
			</header>
			<Map
				className={cn.map}
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
			<div className={cn.details}>
				<Card className={cn.filters} title={t('locations')}>
					<button
						className={clsx(filters.openNow && cn.selected)}
						onClick={() => {
							toggleFilterValue('openNow');
						}}
					>
						{t('open now')}
					</button>
					<div className={cn.toggle}>
						<button
							className={clsx(!filters.coffee && cn.selected)}
							onClick={() => toggleFilterValue('coffee', false)}
						>
							{t('boba')}
						</button>
						<button
							className={clsx(filters.coffee && cn.selected)}
							onClick={() => toggleFilterValue('coffee', true)}
						>
							{t('coffee')}
						</button>
					</div>
				</Card>
				<div className={cn['list-holder']}>
					<div className={cn.list}>
						{!stores && <LoadingListingNote />}
						{stores && stores.length === 0 && <EmptyListingNote />}
						{stores &&
							stores.map(store => (
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

export default memo(DesktopLocator);
