import { memo } from 'react';
import './Collapse.scss';

const Collapse = ({ className = '', children, open, ...attrs }) => {
	return (
		<div
			className={`collapse ${open ? 'open' : ''} ${className}`}
			{...attrs}
		>
			{children}
		</div>
	);
};

export default memo(Collapse);
