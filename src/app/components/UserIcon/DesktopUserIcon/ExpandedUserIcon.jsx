import { memo, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import useLanguages from '../../../controller/hooks/useLanguages.js';
import { TextInput } from '../../../components';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import { logout, database } from '../../../libs/firestore';
import clsx from 'clsx';
import cn from './ExpandedUserIcon.module.scss';
import { alertSettingsUpdateSuccess } from '../../../libs/swal';

const ExpandedUserIcon = ({ className, theme }) => {
	const { t } = useTranslation();
	const {
		languageSelect,
		getCurrentLanguage,
		setSelectedLanguage,
	} = useLanguages();
	const [user, setAuthUser] = useContext(AuthUserContext);

	const [budget, setBudget] = useState((user.profile.budget ?? 10000) / 100);
	const [limit, setLimit] = useState(user.profile.limit ?? 15);
	const [sharing, setSharing] = useState(user.profile.sharing ?? false);

	useEffect(() => {
		setBudget(user.profile.budget / 100);
		setLimit(user.profile.limit);
		setSharing(user.profile.sharing);
	}, [user]);

	const handleChange = setUserInfo => event => {
		setUserInfo(event.target.value);
	};

	const updateFirebase = () => {
		let data = {
			budget: parseInt(parseFloat(budget) * 100),
			limit: parseInt(limit),
			sharing: sharing,
		};
		database
			.collection(`users/${user.uid}/user`)
			.doc('profile')
			.set(data)
			.then(() => {
				setAuthUser(state => ({ ...state, profile: data }));
				alertSettingsUpdateSuccess();
			});
	};
	const themeSelect = ({ label }) => {
		theme.setTheme(label);
	};

	return (
		<div className={clsx(className)}>
			<div className={cn.container}>
				<label className={cn['theme-label']}>Theme:</label>
				<Select
					options={theme.THEME_SELECT_OPTIONS}
					defaultValue={
						theme.THEME_SELECT_OPTIONS[theme.THEMES[theme.theme]]
					}
					name='theme'
					onChange={themeSelect}
					className={cn['theme-select']}
				/>
				<label className={cn['theme-label']}>{t('Language')}:</label>
				<Select
					options={languageSelect}
					defaultValue={getCurrentLanguage()}
					name='Language'
					onChange={setSelectedLanguage}
					className={cn['theme-select']}
				/>
				<TextInput
					id='monthly-spending-input'
					type='tel'
					pattern='^-?[0-9]\d*\.?\d*$'
					className={cn.input}
					onChange={handleChange(setBudget)}
					value={budget}
					label={t('monthly limit')}
				/>
				<TextInput
					id='monthly-drinking-limit'
					type='tel'
					pattern='^-?[0-9]\d*\.?\d*$'
					className={cn.input}
					onChange={handleChange(setLimit)}
					value={limit}
					label={t('Max of drinks / month')}
				/>
				<div className={cn['button-holder']}>
					<button className='update' onClick={updateFirebase}>
						{t('update')}
					</button>
					<button className={cn.logout} onClick={logout}>
						{t('logout')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default memo(ExpandedUserIcon);
