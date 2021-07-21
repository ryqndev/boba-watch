import { memo } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import cn from './MarkdownDisplay.module.scss';

const MarkdownDisplay = ({description}) => {
    const mdParser = new MarkdownIt();

	return (
		<div className={cn.container}>
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
		</div>
	);
};

export default memo(MarkdownDisplay);
