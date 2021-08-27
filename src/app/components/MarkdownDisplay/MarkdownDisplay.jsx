import { memo, Suspense, lazy } from 'react';
import MarkdownIt from 'markdown-it';
import cn from './MarkdownDisplay.module.scss';
import clsx from 'clsx';

const MdEditor = lazy(() => import('react-markdown-editor-lite'));

const MarkdownDisplay = ({description, card=true}) => {
    const mdParser = new MarkdownIt();

	return (
		<div className={clsx(cn.container, card && cn.card)}>
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
