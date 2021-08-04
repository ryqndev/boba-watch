import { memo, useState } from 'react';
import cn from './PreviousLocationList.module.scss';

const PreviousLocationList = () => {
	const [listings, setListings] = useState(null);
	const [search, setSearch] = useState('');

	return <div className={cn.container}>
        <h3>Previously Used</h3>
			<div className={cn.search}>
			</div>

    </div>;
};

export default memo(PreviousLocationList);
