import React, { Component } from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import './styles/user.css';

export class User extends Component {
    state = {
        userSpendMax: 100,
        userDrinkMax: 12,
    };
    updateUser = () => {
        fetch('https://api.boba.watch/user/').then
    }
    render() {
        return (
        <div className="user-modal">
            <img src={localStorage.getItem('avatar')} className="user-avatar" alt="user"/>
            <Typography variant="h5">User settings</Typography>
            <TextField
                id="monthly-spending-input"
                className="user-input"
                variant="outlined"
                margin="normal"
                value={this.state.userSpendMax}
                label="Monthly Spending Limit"
            />
            <TextField
                id="montly-drinking-limit"
                className="user-input"
                margin="dense"
                variant="outlined"
                value={this.state.userDrinkMax}
                label="Max of drinks / month"
            />
            <div className="update-button-holder">
                <Button className="update-button" onClick={this.updateUser}>UPDATE</Button>
            </div>
        </div>
        )
    }
}

export default User;
