import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { getImageAttribute } from '../../../../../libs/cloud-storage.js';
import cn from './ExpandedDrinkDescription.module.scss';

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
		<div className={cn.container}>
			<p className={cn.title}>
				{name}
				<span> @ {location}</span>
			</p>
			{imageAttr && (
				<img
					src={imageAttr}
					className={cn['user-uploaded']}
					alt='user-upload'
				/>
			)}
			<br />
			<p className={cn.description}>
				{!description || description === '' ? (
					<span>[no description]</span>
				) : (
					<MdEditor
					id={cn.preview}
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
				)}
			</p>
			<br />
			<p className={cn.date}>
				<span>{t('on')}</span> {date.toString()}
			</p>
		</div>
	);
};

export default ExpandedDrinkDescription;
