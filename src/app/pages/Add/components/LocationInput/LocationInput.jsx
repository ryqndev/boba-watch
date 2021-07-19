import { memo, useState } from 'react';
import { Card, Modal, TextInput } from '../../../../components';
import { LocationPreview, NearbyLocationList, PreviousLocationList } from './components';
import cn from './LocationInput.module.scss';

const LocationInput = ({ value, onChange }) => {
	const [show, setShow] = useState(true);

	return (
		<div className={cn.container}>
			<Modal open={show} setOpen={setShow}>
				<Card className={cn['input-container']}>
					<div className={cn.preview}>
						<h3>Location</h3>
						<LocationPreview value={value}/>
					</div>
					<div className={cn['select-nearby']}>
						<h3>Nearby</h3>
						<NearbyLocationList onChange={onChange} />
					</div>
					<div className={cn['select-previous']}>
						<h3>Previous</h3>
						<PreviousLocationList onChange={onChange} />
					</div>
				</Card>
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
