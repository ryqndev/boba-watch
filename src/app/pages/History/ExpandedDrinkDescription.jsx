import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getImageAttribute } from '../../libs/cloud-storage';
import './ExpandedDrinkDescription.scss';

const ExpandedDrinkDescription = ({
	name,
	location,
	description,
	expanded,
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
			<p className='description'>{description}</p>
			<br />
			<p className='date'>
				<span>{t('on')}</span> {date.toString()}
			</p>
		</div>
	);
};

export default memo(ExpandedDrinkDescription);
