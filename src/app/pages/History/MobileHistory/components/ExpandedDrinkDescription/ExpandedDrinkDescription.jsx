import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { getImageAttribute } from '../../../../../libs/cloud-storage';
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
	const mdParser = new MarkdownIt(/* Markdown-it options */);

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
			<div className='description'>
				<MdEditor
					id="preview"
					view={{
						menu: false,
						md: false,
					}}
					readOnly={true}
					renderHTML={text => mdParser.render(text)}
					canView={{
						menu: false,
						md: false,
						html: false,
						fullScreen: false,
						hideMenu: false,
					}}
					value={description}
				/>
			</div>
			<br />
			<p className='date'>
				<span>{t('on')}</span> {date.toString()}
			</p>
		</div>
	);
};

export default memo(ExpandedDrinkDescription);
