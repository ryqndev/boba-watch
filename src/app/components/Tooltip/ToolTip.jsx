import { memo } from 'react';
import clsx from 'clsx';
import cn from './ToolTip.module.scss';

const ToolTip = ({ show, children }) => {

	return (
		<div className={clsx(cn.container, show && cn.show)}>
			<div>{children}</div>
		</div>
	);
};

export default memo(ToolTip);
