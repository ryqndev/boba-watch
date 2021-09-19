import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
	Card,
	FirebaseStorageImage,
	Map,
	MarkdownDisplay,
} from '../../../../../components';
import { CircleMarker } from 'react-leaflet';
import { confirmDelete } from '../../../../../libs/swal';
import { remove } from '../../../../../controller';
import AuthUserContext from '../../../../../controller/contexts/AuthUserContext';
import cn from './DrinkDetails.module.scss';

const DrinkDetails = ({
	description,
	name,
	location,
	price,
	date,
	image,
	id,
	update,
	address,
	setDetailed,
	theme,
}) => {
	const { t } = useTranslation();
	const [user] = useContext(AuthUserContext);

	const del = () => {
		confirmDelete().then(res => {
			if (res.value) {
				remove(id, user.uid, () => {
					update();
					setDetailed(null);
				});
			}
		});
	};

	return (
		<Card className={cn.container}>
			{address && (
				<Map
					className={cn.map}
					theme={theme}
					scrollWheelZoom={false}
					hasCenterButton={false}
					zoom={10}
					center={[address.lat, address.lng]}
				>
					{() => (
						<CircleMarker
							center={[address.lat, address.lng]}
							radius={10}
							fill={true}
							weight={1}
							color={'#F68080'}
							fillColor={'#F68080'}
							fillOpacity={'0.5'}
						></CircleMarker>
					)}
				</Map>
			)}

			<h2>
				{name}
				<span> @{location}</span>
			</h2>

			{image && (
				<FirebaseStorageImage className={cn.image} image={image} />
			)}

			<h1>${(price / 100).toFixed(2)}</h1>

			<MarkdownDisplay description={description} />

			<time>{format(new Date(date), 'ccc. LLL dd, yyyy h:mm a')}</time>

			<div className={cn.actions}>
				<Link to={'/edit/' + id}>
					<button>{t('edit')}</button>
				</Link>
				<button onClick={del}>{t('delete')}</button>
			</div>
		</Card>
	);
};

export default memo(DrinkDetails);
