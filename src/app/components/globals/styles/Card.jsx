import { memo } from 'react';
import clsx from 'clsx';
import cn from './Card.module.css';

const Card = ({ className, children, title, ...attrs }) => {
	return (
		<div
			className={clsx(cn.card, className)}
			ref={attrs.forwardedref}
			{...attrs}
		>
			{title && <h2>{title}</h2>}
			{children}
		</div>
	);
};

export default memo(Card);
