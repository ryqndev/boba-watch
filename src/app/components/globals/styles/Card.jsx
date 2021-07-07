import clsx from 'clsx';
import cn from './Card.module.css';

const Card = ({className, children, ...attrs}) => {
    return (
        <div className={clsx(cn.card, className)} {...attrs}>
            {children}
        </div>
    );
}

export default Card;