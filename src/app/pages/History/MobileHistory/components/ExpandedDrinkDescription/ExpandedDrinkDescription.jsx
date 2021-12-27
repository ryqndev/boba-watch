import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getImageAttribute } from '../../../../../libs/cloud-storage';
import { Map, MarkdownDisplay } from '../../../../../components';
import { CircleMarker } from 'react-leaflet';
import './ExpandedDrinkDescription.scss';

const ExpandedDrinkDescription = ({
	name,
	location,
	description,
	theme,
	expanded,
	address,
	image,
	date,
}) => {
	const { t } = useTranslation();
	const [imageAttr, setImageAttr] = useState(false);

	useEffect(() => {
		if (!expanded || !image) return;
		(async () => {
			setImageAttr(await getImageAttribute(image));
		})();
	}, [image, expanded]);

	return (
		<div className='expanded-drink-description--wrapper'>
			{address && (
				<Map
					className='map'
					theme={theme}
					scrollWheelZoom={false}
					hasCenterButton={false}
					zoom={10}
					center={[address.lat, address.lng]}
				>
						<CircleMarker
							center={[address.lat, address.lng]}
							radius={10}
							fill={true}
							weight={1}
							color={'#F68080'}
							fillColor={'#F68080'}
							fillOpacity={'0.5'}
						></CircleMarker>
				</Map>
			)}
			<p className='title'>
				{name}
				<br />
				<span>@{location}</span>
			</p>
			{imageAttr && (
				<img
					src={imageAttr}
					className='user-uploaded'
					alt='user-upload'
				/>
			)}
			<br />
			<div className='description'>
				<MarkdownDisplay card={false} description={description} />
			</div>
			<br />
			<p className='date'>
				<span>{t('on')}</span> {date.toString()}
			</p>
		</div>
	);
};

export default memo(ExpandedDrinkDescription);
