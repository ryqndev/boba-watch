import { memo } from 'react';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { Card } from '../../../../components';
import cn from './DescriptionEditor.module.scss';

const DescriptionEditor = ({ description, setDescription }) => {
	const mdParser = new MarkdownIt();
	const handleChange = ({ html, text }) => {
		setDescription(text);
	};

	MdEditor.unuse(Plugins.Image);
	MdEditor.unuse(Plugins.Link);
	MdEditor.unuse(Plugins.Clear);
	MdEditor.unuse(Plugins.ModeToggle);
	MdEditor.unuse(Plugins.BlockCodeBlock);
	MdEditor.unuse(Plugins.BlockCodeInline);
	MdEditor.unuse(Plugins.FontUnderline);

	return (
		<div className={cn.container}>
			<Card>
				<MdEditor
					id={cn.editor}
					renderHTML={text => text}
					view={{
						html: false,
					}}
					table={{ maxRow: 12, maxCol: 8 }}
					canView={{
						hideMenu: false,
					}}
					value={description}
					onChange={handleChange}
					placeholder={'How was your drink?'}
				/>
			</Card>
			<h2>preview</h2>
			<Card className={cn.preview}>
				<MdEditor
					id={cn.preview}
					view={{
						menu: false,
						md: false,
					}}
					readOnly
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
			</Card>
		</div>
	);
};

export default memo(DescriptionEditor);
