import { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Add from './Add';

const Edit = () => {
	const [data, setData] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		if (!id) return;
		setData(JSON.parse(localStorage.getItem(id)));
	}, [id]);
	
	return <Add editData={data} />;
};

export default memo(Edit);
