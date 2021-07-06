import clsx from 'clsx';
import './Card.css';

const Card = ({className, children, ...attrs}) => {
    return (
        <div className={clsx('card', className)} {...attrs}>
            {children}
        </div>
    );
}

export default Card;