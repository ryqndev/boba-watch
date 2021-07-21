import { memo } from 'react';
import { Card } from '../../../../../components';
import cn from './DrinkDetails.module.scss';

const DrinkDetails = ({ detailed }) => {
	return <Card className={cn.container}>{JSON.stringify(detailed)}</Card>;
};

export default memo(DrinkDetails);
