import { memo, useState, useRef, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { deleteImage, getImageAttribute } from '../../../../libs/cloud-storage.js';
import { firebase } from '../../../../libs/firestore.js';
import AuthUserContext from '../../../../controller/contexts/AuthUserContext.js';
import { onError } from '../../../../libs/analytics';
import clsx from 'clsx';
import cn from './ImageUpload.module.scss';

const ImageUpload = ({ image, setImage, className }) => {
	const { t } = useTranslation();

	const [user] = useContext(AuthUserContext);
	const [imagePreview, setImagePreview] = useState('');
	const [uploadProgress, setUploadProgress] = useState(-1);
	const upload = useRef(null);

	useEffect(() => {
		if(!image) return;
		(async() => {
			let imgsrc = await getImageAttribute(image);
			setUploadProgress(100);
			setImagePreview(imgsrc);
		})();
	}, [image]);

	const imageUpload = async e => {
		let file = upload?.current?.files?.[0];
		if (file.size > 5000000) {
			Swal.fire(
				'File too large',
				'Try a smaller image less than 5MB. Appreciate the high quality images but to keep Boba Watch free, we gotta do it like this. :(',
				'error'
			);
			upload.current.value = '';
			return;
		}
		if (imagePreview !== '') deleteImage(image);

		const serverFilePath = `drinks/${
			user.uid
		}/post-${new Date().valueOf()}`;

		let uploadTask = firebase
			.storage()
			.ref()
			.child(serverFilePath)
			.put(file);

		uploadTask.on(
			'state_changed',
			snapshot => {
				setUploadProgress(
					parseInt(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					)
				);
			},
			error => {
				error.code === 'storage/canceled'
					? setUploadProgress(-1)
					: onError(JSON.stringify(error));
			},
			() => {
				setImage(serverFilePath);
				uploadTask.snapshot.ref
					.getDownloadURL()
					.then(function (downloadURL) {
						setImagePreview(downloadURL);
					});
			}
		);
	};

	const status = (
		startState = '',
		progressState = '',
		finishedState = ''
	) => {
		if (uploadProgress < 0) return startState;
		if (uploadProgress < 100) return progressState;
		return finishedState;
	};

	return (
		<label
			className={clsx(
				cn.container,
				status('', 'uploading', 'uploaded'),
				className
			)}
		>
			{imagePreview && (
				<img
					className={cn.preview}
					src={imagePreview}
					alt='upload-preview'
				/>
			)}
			{status(t('UPLOAD AN IMAGE'), t('UPLOADING...'))}
			<input
				type='file'
				ref={upload}
				onChange={imageUpload}
				accept='image/png,image/jpeg'
			/>
			<br />
			{status(
				'',
				<progress
					max='100'
					value={status(0, uploadProgress, 100)}
				></progress>
			)}
		</label>
	);
};

export default memo(ImageUpload);
