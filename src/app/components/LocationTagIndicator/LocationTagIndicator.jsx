import { memo } from 'react';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
import cn from './LocationTagIndicator.module.scss';
import clsx from 'clsx';

const LocationTagIndicator = ({ className, address }) => {
	const hasCoordinates = () => address?.lat && address?.lng;

	return (
		<div className={clsx(className, cn.container)}>
			{hasCoordinates() && <PublicRoundedIcon className={cn.globe} />}
		</div>
	);
};

export default memo(LocationTagIndicator);
