import React from 'react';
import {CSSTransition, SwitchTransition} from 'react-transition-group';

const Text = ({children}) => {
    return (
        <SwitchTransition>
            <CSSTransition key={children} classNames="fade-quick" timeout={100}>
                <span>
                    {children}
                </span>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default Text
