import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {Typography, TextField, Button, IconButton, Switch, Collapse, Modal} from '@material-ui/core';
import CloseButton from '@material-ui/icons/Close';
import HelpButton from '@material-ui/icons/Help';
import TextClipboard from './TextClipboard';
import FirebaseUser from './firebaseCalls';
import './styles/user.css';

let logoutButton = {
    color: '#FF0000',
    border: '1px solid red',
    boxShadow: 'none',
    backgroundColor: '#FFFFFF'
};

/**
 * @NOTE previous bad choice of naming for using 'public' as a state key which has to now
 * be changed to sharing because public is a js keyword. Might be a little bit dangerous to
 * try and convert a singular value on the firebase so I'm going to keep the database value
 * different from stored value.
 */
const User = ({open, setOpen}) => {
    const [budget, setBudget] = useState(localStorage.getItem('budget')/100);
    const [limit, setLimit] = useState(localStorage.getItem('limit'));
    const [sharing, setSharing] = useState(!!localStorage.getItem('public') === 'true');

    const handleChange = setUserInfo => event => {
        setUserInfo(event.target.value);
    }
    const updateFirebase = () => {
        FirebaseUser.user.update({
            budget: budget,
            limit: limit,
            public: sharing
        }, () => {
            setOpen(false);
        });
    }
    const handleToggle = () => {
        setSharing(!sharing);
        updateFirebase();
    }
    const close = () => { 
        setOpen(false);
        setBudget(localStorage.getItem('budget')/100);
        setLimit(localStorage.getItem('limit'));
        setSharing(!!localStorage.getItem('public') === 'true');
    }
    const getHelp = () => {
        window.open('https://info.boba.watch/');
    }
    return (
        <Modal open={open}>
            <div className="user-modal" style={{height: sharing ? 385 : 350}}>
                <IconButton color="secondary" className="modal-small--button close-button" onClick={close}>
                    <CloseButton color="secondary" style={{ fontSize: 14 }}/>
                </IconButton>
                <IconButton className="modal-small--button help-button" onClick={getHelp}>
                    <HelpButton color="secondary" style={{ fontSize: 14 }}/>
                </IconButton>
                <img src={FirebaseUser.get.user('avatar')} className="user-avatar" alt="user"/>
                <Typography variant="h5" style={{textAlign: "center"}}>User settings</Typography>
                <TextField
                    id="monthly-spending-input"
                    type='tel'
                    pattern="^-?[0-9]\d*\.?\d*$"
                    className="user-input"
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
                    className="user-input"
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
                    <TextClipboard text={`https://share.boba.watch/#/${FirebaseUser.get.user('id')}`}/>
                </Collapse>
                <div className="update-button-holder">
                    <Button 
                        className="logout-button"
                        variant="text"
                        onClick={FirebaseUser.logout}
                        style={logoutButton}>
                        LOGOUT
                    </Button>
                    <Button className="update-button" onClick={updateFirebase}>UPDATE</Button>
                </div>
            </div>
        </Modal>
    );
}

export default User;
