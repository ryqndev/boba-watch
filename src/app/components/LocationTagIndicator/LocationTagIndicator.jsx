import { memo, useState } from 'react';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
import cn from './LocationTagIndicator.module.scss';
import clsx from 'clsx';
import ToolTip from '../Tooltip';

const LocationTagIndicator = ({ className, address }) => {
	const [show, setShow] = useState(false);

	const hasCoordinates = () => address?.lat && address?.lng;

	return (
		<div className={clsx(className, cn.container)}>
			<ToolTip show={show}>This location is tagged. Its address is saved and will show on the map.</ToolTip>
			{hasCoordinates() && <PublicRoundedIcon onMouseEnter={()=>{setShow(true)}} onMouseLeave={() => setShow(false)} className={cn.globe} />}
		</div>
	);
};

export default memo(LocationTagIndicator);
