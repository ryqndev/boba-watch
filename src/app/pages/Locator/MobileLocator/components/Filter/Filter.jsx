import { memo } from 'react';
import cn from './Filter.module.scss';

const Filter = () => {
	return <button className={cn.container}></button>;
};

export default memo(Filter);
