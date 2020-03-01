import React from 'react';

const Modal = ({open, children}) => {
    return (
        <div className={'modal-backdrop ' + (open ? 'open' : '')}>
            {children}
        </div>
    );   
}

export default Modal;
