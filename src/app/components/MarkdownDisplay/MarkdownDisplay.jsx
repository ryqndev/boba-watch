import { memo, Suspense, lazy } from 'react';
import MarkdownIt from 'markdown-it';
import cn from './MarkdownDisplay.module.scss';

const MdEditor = lazy(() => import('react-markdown-editor-lite'));

const MarkdownDisplay = ({description}) => {
    const mdParser = new MarkdownIt();

	return (
		<div className={cn.container}>
			{!description || description === '' ? (
				<span>[no description]</span>
			) : (
				<Suspense fallback={<div></div>}>
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
				</Suspense>
			)}
		</div>
	);
};

export default memo(MarkdownDisplay);
