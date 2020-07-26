import React, {useRef} from 'react';
import './Modal.scss';

const Modal = ({open, setOpen, children}) => {
    const ref = useRef(null);

    const toggleClose = (e) => {
        if(ref.current && ref.current === e.target) setOpen(false);
    }
    return (
        <div className={'modal-backdrop ' + (open ? 'open' : '')} onClick={toggleClose} ref={ref}>
            {children}
        </div>
    );   
}

export default Modal;
