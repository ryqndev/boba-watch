import React, { useState } from 'react';
import CloseButton from '@material-ui/icons/Close';
import {useTranslation} from 'react-i18next';
import {Modal, TextInput, Select} from '../../components';
import FirebaseUser from '../../controller/backend.js';
import {setTheme, getTheme, THEME_SELECT_OPTIONS} from '../../components/globals/theme';
import './User.scss';
import 'react-toggle/style.css';


/**
 * @NOTE previous bad choice of naming for using 'public' as a state key which has to now
 * be changed to sharing because public is a js keyword. Might be a little bit dangerous to
 * try and convert a singular value on the firebase so I'm going to keep the database value
 * different from stored value.
 */
const User = ({open, setOpen}) => {
    const {t} = useTranslation();
    const [budget, setBudget] = useState((FirebaseUser.get.currentUser.profile.budget ?? 10000) / 100);
    const [limit, setLimit] = useState(FirebaseUser.get.currentUser.profile.limit ?? 15);
    const [sharing, setSharing] = useState(FirebaseUser.get.currentUser.profile.sharing ?? false);

    const handleChange = setUserInfo => event => {
        setUserInfo(event.target.value);
    }
    const updateFirebase = () => {
        let data = {
            budget: parseFloat(budget) * 100,
            limit: parseInt(limit),
            sharing: sharing
        };
        FirebaseUser.user.update(data, () => {
            FirebaseUser.get.currentUser.profile = data;
            localStorage.setItem('user', JSON.stringify(FirebaseUser.get.currentUser));
            close();
        });
    }
    const themeSelect = (value) => {
        setTheme(value);
    }
    const close = () => { 
        setOpen(false);
        setBudget(FirebaseUser.get.currentUser.profile.budget / 100);
        setLimit(FirebaseUser.get.currentUser.profile.limit);
        setSharing(FirebaseUser.get.currentUser.profile.sharing);
    }
    return (
        <Modal open={open}>
            <div className="user-modal">
                <button className="close-button" onClick={close}>
                    <CloseButton />
                </button>
                <img src={FirebaseUser.get.currentUser.user.photoURL} className="avatar" alt="user"/>
                <h1>{t('User Settings')}</h1>
                <TextInput
                    id="monthly-spending-input"
                    type='tel'
                    pattern="^-?[0-9]\d*\.?\d*$"
                    className="input"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange(setBudget)}
                    value={budget}
                    label={t("Monthly Spending Limit")}
                />
                <TextInput
                    id="monthly-drinking-limit"
                    type='tel'
                    pattern="^-?[0-9]\d*\.?\d*$"
                    className="input"
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange(setLimit)}
                    value={limit}
                    label={t("Max of drinks / month")}
                />

                <Select
                    options={THEME_SELECT_OPTIONS}
                    defaultValue={getTheme()}
                    title='Theme:'
                    onValueChange={themeSelect}
                />
                <div className="button-holder">
                    <button 
                        className="logout text"
                        onClick={FirebaseUser.logout}>
                        {t('LOGOUT')}
                    </button>
                    <button className="update" onClick={updateFirebase}>{t('UPDATE')}</button>
                </div>
            </div>
        </Modal>
    );
}

export default User;
