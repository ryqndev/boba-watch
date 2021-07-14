import { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Add from './Add';

const Edit = () => {
	const [data, setData] = useState(null);
	const { drinkid } = useParams();

	useEffect(() => {
		if (!drinkid) return;
		setData(JSON.parse(localStorage.getItem(drinkid)));
	}, [drinkid]);
	return <Add editData={data} />;
};

export default memo(Edit);
