import React from 'react'
import {Card} from '../../../../components';
import cn from './Listing.module.scss';

const EmptyListingNote = () => {
    return (
		<Card
			className={cn.container}
		>
			<h3>no places nearby :(</h3>
			<p className={cn.distance}>
                We can't seem to find any boba places near you. Try searching a different part of the map.
			</p>
		</Card>
    );
}

export default EmptyListingNote;
