import { memo } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import cn from './DescriptionEditor.module.scss';
import 'react-markdown-editor-lite/lib/index.css';

const DescriptionEditor = ({ description, setDescription }) => {
	const mdParser = new MarkdownIt();
	const handleChange = ({ html, text }) => {
		setDescription(text);
	};

	return (
		<div className={cn.container}>
			<MdEditor
				id={cn.editor}
				renderHTML={text => text}
				view={{
					html: false,
				}}
				canView={{
					hideMenu: false,
				}}
				value={description}
				onChange={handleChange}
			/>
			<h2>preview</h2>
			<div className={cn.preview}>
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
			</div>
		</div>
	);
};

export default memo(DescriptionEditor);
