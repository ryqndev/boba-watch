import { memo, useState } from 'react';
import {
	Card,
	Modal,
	TextInput,
} from '../../../../../components';
import {
	LocationPreview,
	NearbyLocationList,
	PreviousLocationList,
} from '../components';
import cn from './DesktopLocationInput.module.scss';

const DesktopLocationInput = ({ form, onChange, setForm }) => {
	const [show, setShow] = useState(false);
	const [tab, setTab] = useState('nearby');

	return (
		<div className={cn.container}>
			<Modal open={show} setOpen={setShow}>
				<div className={cn['input-container']}>
					<Card className={cn.preview}>
						<LocationPreview
							{...{ form, setForm, tab, setTab, setShow }}
						/>
					</Card>
					<Card className={cn.select}>
						{tab === 'nearby' ? (
							<NearbyLocationList onChange={onChange} />
						) : (
							<PreviousLocationList onChange={onChange} />
						)}
					</Card>
				</div>
			</Modal>
			<TextInput
				value={form?.location ?? ''}
				label={'Location'}
				readOnly
				onFocus={() => setShow(true)}
			/>
		</div>
	);
};

export default memo(DesktopLocationInput);
