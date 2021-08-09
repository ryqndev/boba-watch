import { memo, useState } from 'react';
import FilterIcon from '@material-ui/icons/TuneRounded';
import cn from './Filter.module.scss';
import { Modal } from '../../../../../components';

const Filter = () => {
	const [open, setOpen] = useState(false);

	return (
		<button className={cn.container}>
			<FilterIcon />
			<Modal open={open} setOpen={setOpen}>
				Filter options
			</Modal>
		</button>
	);
};

export default memo(Filter);
