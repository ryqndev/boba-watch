import { memo } from 'react';
import {
	Card,
	FirebaseStorageImage,
	MarkdownDisplay,
} from '../../../../../components';
import cn from './DrinkDetails.module.scss';

const DrinkDetails = ({ description, name, location, price, date, image }) => {
	return (
		<Card className={cn.container}>
			<h2>
				{name}
				<span> @ {location}</span>
			</h2>
			<h1>${(price / 100).toFixed(2)}</h1>
			<FirebaseStorageImage className={cn.image} image={image} />
			<MarkdownDisplay description={description} />
			<time>{new Date(date).toString()}</time>
		</Card>
	);
};

export default memo(DrinkDetails);
