import { memo } from 'react';
import FilterIcon from '@material-ui/icons/TuneRounded';
import cn from './Filter.module.scss';

const Filter = () => {
	return (
		<button className={cn.container}>
			<FilterIcon />
		</button>
	);
};

export default memo(Filter);
