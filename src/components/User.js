import React, { Component } from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import './styles/user.css';

export class User extends Component {

    render() {
        return (
        <div className="user-modal">
            <Typography variant="h5">User settings</Typography>
            <TextField
                id="monthly-spending-input"
                className="user-input"
                variant="outlined"
                label="Monthly Spending Limi"
            />
            <TextField
                id="montly-drinking-limit"
                className="user-input"
                margin="dense"
                variant="outlined"
                label="Max number of dirnks per month"
            />
            <div className="update-button-holder">
                <Button className="update-button">UPDATE</Button>
            </div>
        </div>
        )
    }
}

export default User;
