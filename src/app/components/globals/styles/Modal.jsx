import React from 'react';
import './Modal.scss';

const Modal = ({open, children}) => {
    return (
        <div className={'modal-backdrop ' + (open ? 'open' : '')}>
            {children}
        </div>
    );   
}

export default Modal;
