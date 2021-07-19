import { memo } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import cn from './LocationPreview.module.scss';

const LocationPreview = ({value}) => {
	return (
		<div className={cn.wrapper}>
			<div className={cn.name}>{value ?? 'hey'}</div>
			<div className={cn.actions}>
				<button className={cn.cancel}>
					<CloseRoundedIcon />
				</button>
				<button className={cn.confirm}>
					<DoneRoundedIcon />
				</button>
			</div>
		</div>
	);
};

export default memo(LocationPreview);
