import { memo, useContext } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
	Card,
	FirebaseStorageImage,
	MarkdownDisplay,
} from '../../../../../components';
import { confirmDelete } from '../../../../../libs/swal';
import { remove } from '../../../../../controller';
import AuthUserContext from '../../../../../controller/contexts/AuthUserContext';
import cn from './DrinkDetails.module.scss';

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
		confirmDelete().then(res => {
			if (res.value) {
				remove(id, user.uid, () => {
					update();
					setDetailed(null);
				});
			}
		});
	};

	return (
		<Card className={cn.container}>
			{image && (
				<FirebaseStorageImage className={cn.image} image={image} />
			)}
			<h2>
				{name}
				<span> @{location}</span>
			</h2>

			<h1>${(price / 100).toFixed(2)}</h1>

			<MarkdownDisplay description={description} />

			<time>{format(new Date(date), 'ccc. LLL dd, yyyy h:mm a')}</time>

			<div className={cn.actions}>
				<Link to={'/edit/' + id}>
					<button>EDIT</button>
				</Link>
				<button onClick={del}>DELETE</button>
			</div>
		</Card>
	);
};

export default memo(DrinkDetails);
