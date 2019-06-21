import React, { Component } from 'react';
import {Typography, TextField, Button, IconButton, Switch, Collapse, Modal} from '@material-ui/core';
import Utils from './textUtil';
import CloseButton from '@material-ui/icons/Close';
import TextClipboard from './TextClipboard';
import backend from './firebaseCalls';
import './styles/user.css';

let logoutButton = {
    color: '#FF0000',
    border: '1px solid red',
    boxShadow: 'none',
    backgroundColor: '#FFFFFF'
};

export class User extends Component {
    state = {
        userSpendMax: Utils.toMoney(localStorage.getItem('userSpendMax'), localStorage.getItem('userSpendMax') % 100 === 0),
        userDrinkMax: localStorage.getItem('userDrinkMax'),
        userPublic: localStorage.getItem('userPublic') === 'true' ? true : false,
    };
    logout = () => {
        backend.logout(
            () => { window.location = window.location.origin }
        );
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }
    handleToggle = () => {
        this.setState(state => ({
            userPublic: !state.userPublic,
        }), () => { this.makePublic()} );
    }
    close = () => { this.props.close() }

    render() { 
        return (
        <Modal open={this.props.open}>
            <div className="user-modal" style={{height: this.state.userPublic ? 385 : 350}}>
                <IconButton color="secondary" className="close-button" onClick={this.close}>
                    <CloseButton color="secondary" style={{ fontSize: 14 }}/>
                </IconButton>
                <img src={localStorage.getItem('avatar')} className="user-avatar" alt="user"/>
                <Typography variant="h5" style={{textAlign: "center"}}>User settings</Typography>
                <TextField
                    id="monthly-spending-input"
                    className="user-input"
                    variant="outlined"
                    margin="normal"
                    onChange={this.handleChange('userSpendMax')}
                    value={this.state.userSpendMax}
                    label="Monthly Spending Limit"
                />
                <TextField
                    id="monthly-drinking-limit"
                    className="user-input"
                    margin="dense"
                    variant="outlined"
                    onChange={this.handleChange('userDrinkMax')}
                    value={this.state.userDrinkMax}
                    label="Max of drinks / month"
                />
                <div className="user-share-profile">
                    Share Profile: 
                    <Switch
                        checked={this.state.userPublic}
                        onClick={this.handleToggle}
                        label="Share Profile"
                        color="primary"
                    />
                </div>
                <Collapse in={this.state.userPublic}>
                    <TextClipboard text={`https://share.boba.watch/#/${localStorage.getItem('uid')}`}/>
                </Collapse>
                <div className="update-button-holder">
                    <Button 
                        className="logout-button"
                        variant="text"
                        onClick={this.logout}
                        style={logoutButton}>
                        LOGOUT
                    </Button>
                    <Button className="update-button" onClick={this.updateUser}>UPDATE</Button>
                </div>
            </div>
        </Modal>
        )
    }
}

export default User;
