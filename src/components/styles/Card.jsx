import React from 'react';
import './Card.css';

const Card = ({className, children, ...attrs}) => {
    return (
        <div className={`card ${className}`} {...attrs}>
            {children}
        </div>
    );
}

export default Card;