import { memo, useState } from 'react';
import {
	Card,
	Modal,
	TextInput,
} from '../../../../components';
import {
	LocationPreview,
	NearbyLocationList,
	PreviousLocationList,
} from './components';
import cn from './LocationInput.module.scss';

const LocationInput = ({ form, onChange, setForm }) => {
	const [show, setShow] = useState(false);
	const [tab, setTab] = useState('nearby');

	return (
		<div className={cn.container}>
			<Modal open={show} setOpen={setShow}>
				<div className={cn['input-container']}>
					<Card className={cn.preview}>
						<h3>Location</h3>
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

export default memo(LocationInput);

// form={form} onChange={onChange} setShow={setShow} tab={tab} setTab={setTab}
