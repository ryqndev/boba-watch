import React, { useState } from 'react';
import {Button, IconButton, Switch, Collapse} from '@material-ui/core';
import CloseButton from '@material-ui/icons/Close';
import HelpButton from '@material-ui/icons/Help';
import TextClipboard from '../TextClipboard';
import FirebaseUser from '../firebaseCalls';
import TextField from '../globals/TextInput';
import Modal from '../globals/Modal';
import './User.scss';
import '../globals/globals.scss';

/**
 * @NOTE previous bad choice of naming for using 'public' as a state key which has to now
 * be changed to sharing because public is a js keyword. Might be a little bit dangerous to
 * try and convert a singular value on the firebase so I'm going to keep the database value
 * different from stored value.
 */
const User = ({profile, open, setOpen}) => {
    const [budget, setBudget] = useState((profile.budget ?? 100) / 100);
    const [limit, setLimit] = useState(profile.limit ?? 1);
    const [sharing, setSharing] = useState(profile.public ?? false);

    const handleChange = setUserInfo => event => {
        setUserInfo(event.target.value);
    }
    const updateFirebase = () => {
        FirebaseUser.user.update({
            budget: parseFloat(budget) * 100,
            limit: parseInt(limit),
            sharing: sharing
        }, () => {
            close();
        });
    }
    const handleToggle = () => {
        FirebaseUser.user.update({
            budget: parseFloat(budget) * 100,
            limit: parseInt(limit),
            sharing: !sharing
        }, () => {
            setSharing(profile.public);
        });
    }
    const close = () => { 
        setOpen(false);
        setBudget(profile.budget / 100);
        setLimit(profile.limit);
        setSharing(profile.public);
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
                <img src={FirebaseUser.get.current.user.avatar} className="avatar" alt="user"/>
                <h1>User settings</h1>
                <TextField
                    id="monthly-spending-input"
                    type='tel'
                    pattern="^-?[0-9]\d*\.?\d*$"
                    className="input"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange(setBudget)}
                    value={budget}
                    label="Monthly Spending Limit"
                />
                <TextField
                    id="monthly-drinking-limit"
                    type='tel'
                    pattern="^-?[0-9]\d*\.?\d*$"
                    className="input"
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange(setLimit)}
                    value={limit}
                    label="Max of drinks / month"
                />
                <div className="user-share-profile">
                    Share Profile: 
                    <Switch
                        checked={sharing}
                        onClick={handleToggle}
                        label="Share Profile"
                        color="primary"
                    />
                </div>
                <Collapse in={sharing}>
                    <TextClipboard text={`https://share.boba.watch/#/${FirebaseUser.get.current.user.id}`}/>
                </Collapse>
                <div className="button-holder">
                    <button 
                        className="logout text"
                        onClick={FirebaseUser.logout}>
                        LOGOUT
                    </button>
                    <Button className="update" onClick={updateFirebase}>UPDATE</Button>
                </div>
            </div>
        </Modal>
    );
}

export default User;
