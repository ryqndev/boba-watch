import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.scss';

const Modal = ({ open, setOpen, children }) => {
	const ref = useRef(null);

	const toggleClose = e => {
		if (ref.current && ref.current === e.target) setOpen(false);
	};
	return (
		<CSSTransition in={open} timeout={100} classNames='fade-quick'>
			<div
				className={'modal-backdrop ' + (open ? 'open' : '')}
				onClick={toggleClose}
				ref={ref}
			>
				{children}
			</div>
		</CSSTransition>
	);
};

export default memo(Modal);
