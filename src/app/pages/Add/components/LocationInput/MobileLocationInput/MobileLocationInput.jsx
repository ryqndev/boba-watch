import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Modal, TextInput } from '../../../../../components';
import {
	LocationPreview,
	NearbyLocationList,
	PreviousLocationList,
} from '../components';
import cn from './MobileLocationInput.module.scss';

const MobileLocationInput = ({ form, onChange, setForm }) => {
	const { t } = useTranslation();
	const [show, setShow] = useState(false);
	const [tab, setTab] = useState('default');

	const onChangeAndReturn = (...args) => {
		onChange(...args);
		setTab('default');
	}

	return (
		<div className={cn.container}>
			<Modal open={show} setOpen={setShow}>
				<div className={cn['input-container']}>
					<Card
						className={tab === 'default' ? cn.preview : cn.select}
					>
						{tab === 'default' && (
							<LocationPreview
								{...{ form, setForm, tab, setTab, setShow }}
							/>
						)}
						{tab !== 'default' && (
							<button className={cn.back} onClick={() => setTab('default')}>BACK</button>
						)}
						{tab === 'nearby' && (
							<NearbyLocationList onChange={onChangeAndReturn} />
						)}
						{tab === 'previous' && (
							<PreviousLocationList onChange={onChangeAndReturn} />
						)}
					</Card>
				</div>
			</Modal>
			<TextInput
				value={form?.location ?? ''}
				label={t('location')}
				readOnly
				onFocus={() => setShow(true)}
			/>
		</div>
	);
};

export default memo(MobileLocationInput);
