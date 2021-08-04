import { memo } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIosRounded';
import clsx from 'clsx';
import cn from './LocationPreview.module.scss';
import { LocationTagIndicator, TextInput } from '../../../../../../components';

const LocationPreview = ({ form, setForm, setShow, tab, setTab }) => {
	const clear = () => {
		setForm(prevForm => {
			const updateForm = {...prevForm};
			delete updateForm.address;
			delete updateForm.location;
			return updateForm;
		});
		setShow(false);
	}

	return (
		<div className={cn.container}>
			<h4>Select a location from:</h4>
			<div
				className={clsx(cn.select, tab === 'nearby' && cn.selected)}
				onClick={() => setTab('nearby')}
			>
				<h5>Nearby Locations</h5>
				{tab === 'nearby' && <ArrowRightIcon className={cn.expand} />}
			</div>
			<div
				className={clsx(cn.select, tab === 'previous' && cn.selected)}
				onClick={() => setTab('previous')}
			>
				<h5>Previously Used</h5>
				{tab === 'previous' && <ArrowRightIcon className={cn.expand} />}
			</div>
			<div className={cn.divider}></div>
			<h4>or manually enter a location:</h4>
			<div className={cn['name-container']}>
				<LocationTagIndicator
					className={cn.tag}
					address={form?.address}
				/>
				<TextInput
					label='Name'
					value={form?.location ?? ''}
					className={cn.name}
					readOnly
				/>
			</div>

			<div className={cn.actions}>
				<button
					type='button'
					className={cn.cancel}
					onClick={clear}
				>
					<CloseRoundedIcon />
				</button>
				<button
					className={cn.confirm}
					type='button'
					onClick={() => setShow(false)}
				>
					<DoneRoundedIcon />
				</button>
			</div>
		</div>
	);
};

export default memo(LocationPreview);
