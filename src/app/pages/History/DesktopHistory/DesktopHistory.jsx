import { memo, useState } from 'react';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import useDrinks from '../../../controller/hooks/useDrinks.js';
import { Card, Searchbar } from '../../../components';
import { DrinkPanel } from '../../../pages/Dashboard/DesktopDashboard/components';
import { Transaction, DrinkDetails, TransactionsByMonth } from './components';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { confirmDownloadData } from '../../../libs/swal.js';
import cn from './DesktopHistory.module.scss';

const DesktopHistory = ({ theme }) => {
	const { t } = useTranslation();

	const { drinks, update } = useDrinks();
	const [detailed, setDetailed] = useState(null);

	const download = () => {
		confirmDownloadData().then(res => {
			if (res.value) {
				const blob = new Blob([JSON.stringify(drinks)], {
					type: 'application/json;charset=utf-8',
				});
				saveAs(blob, 'Boba_Watch_user_drink_data.json');
			}
		});
	};

	return (
		<div className={cn.container}>
			<main>
				<header>
					<h1 className={cn.title}>{t('history')}</h1>
					<GetAppRoundedIcon
						className={cn.download}
						onClick={download}
					/>
				</header>
				<div className={cn.content}>
					<Transaction
						className={cn['table-header']}
						header
						name={t('drink name')}
						location={t('location')}
					/>
					<div className={cn.scrollable}>
						<TransactionsByMonth
							{...{ drinks, detailed, setDetailed }}
						/>
					</div>
				</div>
			</main>
			<aside>
				<Card className={cn.search}>
					<h2>{t('search')}</h2>
					<span>{t('search your past uploads')}</span>
					<Searchbar
						data={drinks}
						Result={({ item }) => <DrinkPanel data={item} />}
					/>
				</Card>
				{detailed && (
					<DrinkDetails
						theme={theme}
						{...detailed}
						update={update}
						setDetailed={setDetailed}
					/>
				)}
				{!detailed && (
					<Card className={cn['not-selected']}>
						{t('no drink selected')}
					</Card>
				)}
			</aside>
		</div>
	);
};

export default memo(DesktopHistory);
