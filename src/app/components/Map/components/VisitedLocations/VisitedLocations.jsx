import { CircleMarker, Popup } from 'react-leaflet';
import { useDrinkByLocation } from '../../controllers';
import { format } from 'date-fns';
import cn from './VisitedLocations.module.scss';

const VisitedLocations = ({ drinks }) => {
	const { locations } = useDrinkByLocation(drinks);
	return (
		<>
			{locations.map(({ coordinates, drinks, location }) => (
				<CircleMarker
					key={JSON.stringify(coordinates) + location}
					center={coordinates}
					radius={10}
					fill={true}
					weight={1}
					color={'#F68080'}
					fillColor={'#F68080'}
					fillOpacity={'0.5'}
				>
					<Popup>
						<div className={cn.container}>
							<h2>{location}</h2>
							<p>
								Visited <span>{drinks.length}</span> times
							</p>
							<p>Recent visits:</p>
							{drinks.slice(0, 5).map(({ date }) => (
								<div key={date}>
									{format(
										new Date(date),
										'MMM d, yyyy h:mm a'
									)}
								</div>
							))}
						</div>
					</Popup>
				</CircleMarker>
			))}
		</>
	);
};

export default VisitedLocations;
