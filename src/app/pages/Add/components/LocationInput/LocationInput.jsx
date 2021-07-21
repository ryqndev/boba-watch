import { memo, useState } from 'react';
import { Card, Modal, TextInput } from '../../../../components';
import {
	LocationPreview,
	NearbyLocationList,
	PreviousLocationList,
} from './components';
import cn from './LocationInput.module.scss';

const LocationInput = ({ value, onChange }) => {
	const [show, setShow] = useState(false);
	const [tab, setTab] = useState('previous');

	return (
		<div className={cn.container}>
			<Modal open={show} setOpen={setShow}>
				<div className={cn['input-container']}>
					<Card className={cn.preview}>
						<h3>Location</h3>
						<LocationPreview value={value} setShow={setShow} tab={tab} setTab={setTab}/>
					</Card>
					<Card className={cn.select}>
						<h3>{tab}</h3>
						{tab === 'nearby' ? (
							<NearbyLocationList onChange={onChange} />
						) : (
							<PreviousLocationList onChange={onChange} />
						)}
					</Card>
				</div>
			</Modal>
			<TextInput
				value={value}
				readOnly
				label={'Location'}
				onFocus={() => setShow(true)}
			/>
		</div>
	);
};

export default memo(LocationInput);
