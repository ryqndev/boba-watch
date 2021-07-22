import { memo, useContext } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
	Card,
	FirebaseStorageImage,
	MarkdownDisplay,
} from '../../../../../components';
import cn from './DrinkDetails.module.scss';
import { remove } from '../../../../../controller';
import AuthUserContext from '../../../../../controller/contexts/AuthUserContext';

const DrinkDetails = ({
	description,
	name,
	location,
	price,
	date,
	image,
	id,
	update,
	setDetailed,
}) => {
	const [user] = useContext(AuthUserContext);
	
	const del = () => {
		// TODO prompt user for delete confirmation
		remove(id, user.uid, () => {
			update();
			setDetailed(null);
		});
	};

	return (
		<Card className={cn.container}>
			<h2>
				{name}
				<span> @{location}</span>
			</h2>
			<time>{format(new Date(date), 'ccc. LLL dd, yyyy h:mm a')}</time>
			<h1>${(price / 100).toFixed(2)}</h1>
			{image && (
				<FirebaseStorageImage className={cn.image} image={image} />
			)}
			<MarkdownDisplay description={description} />
			<div className={cn.actions}>
				<Link to={'/edit/' + id}><button>EDIT</button></Link>
				<button onClick={del}>DELETE</button>
			</div>
		</Card>
	);
};

export default memo(DrinkDetails);
