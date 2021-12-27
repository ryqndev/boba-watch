import clsx from 'clsx';
import { memo, useState } from 'react';
import FilterIcon from '@material-ui/icons/TuneRounded';
import ExploreEmptyIcon from '@material-ui/icons/ExploreOutlined';
import ExploreFilledIcon from '@material-ui/icons/ExploreRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import cn from './MapActions.module.scss';

const MapActions = ({ localOnly, setLocalOnly }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className={cn.container}>
			{open && (
				<>
					{/* <button>
						<FilterIcon />
					</button> */}
					<button onClick={() => setLocalOnly(prev => !prev)}>
						{localOnly ? (
							<ExploreEmptyIcon />
						) : (
							<ExploreFilledIcon />
						)}
					</button>
				</>
			)}
			<button
				onClick={() => setOpen(prev => !prev)}
				className={clsx(cn.expand, open && cn.open)}
			>
				<ExpandMoreIcon />
			</button>
		</div>
	);
};

export default memo(MapActions);
