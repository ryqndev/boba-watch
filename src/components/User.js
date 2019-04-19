import React, { Component } from 'react';
import {Typography, TextField, Button, IconButton, Switch, Collapse} from '@material-ui/core';
import swal from 'sweetalert';
import CloseButton from '@material-ui/icons/Close';
import TextClipboard from './TextClipboard';
import './styles/user.css';

export class User extends Component {
    state = {
        userSpendMax: localStorage.getItem('userSpendMax'),
        userDrinkMax: localStorage.getItem('userDrinkMax'),
        userPublic: localStorage.getItem('userPublic') === 'true' ? true : false,
    };
    updateUser = () => {
        const data = { 
            "user": { 
                "budget": parseInt(this.state.userSpendMax),
                "maxDrinks": parseInt(this.state.userDrinkMax)
            }
        };
        fetch(`https://api.boba.watch/users/${this.props.userId}/${this.props.accessToken}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
        ).then(resp => {
            return resp.json();
        }).then(resp => {
            localStorage.setItem('userSpendMax', this.state.userSpendMax);
            localStorage.setItem('userDrinkMax', this.state.userDrinkMax);
            localStorage.setItem('userPublic', this.state.userPublic);
            swal("Success!", "Updated your settings successfully.", "success")
        }).catch(err => {
            swal("Error!", "Error updating data", "error");
        });
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleToggle = () => {
        this.setState(state => ({
            userPublic: !state.userPublic,
        }));
    };
    close = () => {
        this.props.close();
    }
    render() { 
        return (
        <div className="user-modal">
            <IconButton color="secondary" className="close-button" onClick={this.close}>
                <CloseButton color="secondary" style={{ fontSize: 14 }}/>
            </IconButton>
            <img src={localStorage.getItem('avatar')} className="user-avatar" alt="user"/>
            <Typography variant="h5">User settings</Typography>
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
            <Switch
                checked={this.state.userPublic}
                onClick={this.handleToggle}
                label="Share Profile"
                color="primary"
            />
            <Collapse in={this.state.userPublic}>
                <TextClipboard text={`https://boba.watch/`}/>
            </Collapse>
            <div className="update-button-holder">
                <Button className="update-button" onClick={this.updateUser}>UPDATE</Button>
            </div>
        </div>
        )
    }
}

export default User;
