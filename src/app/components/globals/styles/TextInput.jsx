import { memo } from 'react';
import clsx from 'clsx';
import './TextInput.scss';

const TextInput = props => {
	let { value, id, label, autoFocus, onFocus } = props;

	return (
		<span
			className={clsx(
				'text-input',
				value.length !== 0 && 'input--filled'
			)}
		>
			<input
				{...props}
				autoComplete='off'
				onFocus={onFocus ?? (() => {})}
				autoFocus={autoFocus ?? false}
				name={id}
			/>
			<label htmlFor={id}>
				<span>{label}</span>
			</label>
		</span>
	);
};

export default memo(TextInput);
