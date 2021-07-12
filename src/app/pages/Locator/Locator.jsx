import { useState } from 'react';
import { Card } from '../../components';
import Map from '../../components/Map';
import { Listing, SearchAreaButton, StoreMarker } from './components';
import cn from './Locator.module.scss';

const Locator = () => {
	const [stores, setStores] = useState([]);

	return (
		<main className={cn.wrapper}>
            <header>
                <h1 className={cn.title}>Boba Locator</h1>
            </header>
			<Card className={cn.map}>
				<Map zoom={12}>
					{position => (
						<>
							<SearchAreaButton
								position={position}
								setStores={setStores}
							/>
							{stores.map(store => (
								<StoreMarker
									key={store.venue.id}
									data={store}
								/>
							))}
						</>
					)}
				</Map>
			</Card>
			<div className={cn.details}>
				<div className={cn['list-holder']}>
					<div className={cn.list}>
						{stores.map(store => (<Listing key={store.venue.id} data={store} />))}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Locator;
