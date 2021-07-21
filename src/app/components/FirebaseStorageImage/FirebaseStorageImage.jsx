import { memo, useEffect, useState } from 'react';
import clsx from 'clsx';
import { getImageAttribute } from '../../libs/cloud-storage.js';
import cn from './FirebaseStorageImage.module.scss';

const FirebaseStorageImage = ({ className, image }) => {
	const [imageAttr, setImageAttr] = useState(false);

	useEffect(() => {
		if (!image) return setImageAttr(false);
		(async () => {
			setImageAttr(await getImageAttribute(image));
		})();
	}, [image]);

	return (
		<div className={clsx(className, cn.container)}>
			{imageAttr && <img src={imageAttr} alt='user-upload' />}
		</div>
	);
};

export default memo(FirebaseStorageImage);
