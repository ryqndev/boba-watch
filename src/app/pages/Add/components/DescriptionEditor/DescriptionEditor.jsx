import { memo } from 'react';
import MDEditor from '@uiw/react-md-editor';
import cn from './DescriptionEditor.module.scss';

const DescriptionEditor = ({ description, setDescription }) => {


	return (
		<div className={cn.container}>
			<MDEditor value={description} onChange={setDescription} />
			<MDEditor.Markdown source={description} />
		</div>
	);
};

export default memo(DescriptionEditor);
