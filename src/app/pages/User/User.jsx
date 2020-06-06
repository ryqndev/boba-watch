import React, { useState } from 'react';
import Toggle from 'react-toggle';
import {Button, IconButton, Collapse} from '@material-ui/core';
import CloseButton from '@material-ui/icons/Close';
import HelpButton from '@material-ui/icons/Help';
import {useTranslation} from 'react-i18next';
import {Modal, TextInput, TextClipboard} from '../../components';
import FirebaseUser from '../../controller/backend.js';
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
    const themeSelect = (val) => {
        console.log(val);
    }
    // const handleToggle = () => {
    //     let data = {
    //         budget: parseFloat(budget) * 100,
    //         limit: parseInt(limit),
    //         sharing: !sharing
    //     };
    //     FirebaseUser.user.update(data, () => {
    //         FirebaseUser.get.currentUser.profile = data;
    //         setSharing(FirebaseUser.get.currentUser.profile.sharing);
    //     });
    // }
    const close = () => { 
        setOpen(false);
        setBudget(FirebaseUser.get.currentUser.profile.budget / 100);
        setLimit(FirebaseUser.get.currentUser.profile.limit);
        setSharing(FirebaseUser.get.currentUser.profile.sharing);
    }
    const getHelp = () => {
        window.open('https://info.boba.watch/');
    }
    return (
        <Modal open={open}>
            <div className="user-modal">
                <IconButton color="secondary" className="modal-small--button close-button" onClick={close}>
                    <CloseButton color="secondary" style={{ fontSize: 14 }}/>
                </IconButton>
                <IconButton className="modal-small--button help-button" onClick={getHelp}>
                    <HelpButton color="secondary" style={{ fontSize: 14 }}/>
                </IconButton>
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
                {/* <div className="user-share-profile">
                    {t('Share Profile')}: 
                    <Toggle
                        defaultChecked={sharing}
                        onClick={handleToggle}
                        label={t("Share Profile")}
                    />
                </div>
                <Collapse in={sharing}>
                    <TextClipboard text={`https://share.boba.watch/#/${FirebaseUser.get.currentUser.user.uid}`}/>
                </Collapse> */}
                <div className="user-theme-select">
                    <select class="select-wrapper" value={0} onChange={themeSelect}>
                        <option value={1}>This is a native select element</option>
                        <option>Apples</option>
                        <option>Bananas</option>
                        <option>Grapes</option>
                        <option>Oranges</option>
                    </select>
                </div>
                <div className="button-holder">
                    <button 
                        className="logout text"
                        onClick={FirebaseUser.logout}>
                        {t('LOGOUT')}
                    </button>
                    <Button className="update" onClick={updateFirebase}>{t('UPDATE')}</Button>
                </div>
            </div>
        </Modal>
    );
}

export default User;
