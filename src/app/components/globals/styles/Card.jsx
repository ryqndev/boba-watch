import { memo } from 'react';
import clsx from 'clsx';
import cn from './Card.module.css';

const Card = ({ className, children, ...attrs }) => {
	return (
		<div className={clsx(cn.card, className)} ref={attrs.forwardedref} {...attrs}>
			{children}
		</div>
	);
};

export default memo(Card);
