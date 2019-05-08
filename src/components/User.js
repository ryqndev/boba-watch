import React, { Component } from 'react';
import {Typography, TextField, Button, IconButton, Switch, Collapse, Modal} from '@material-ui/core';
import swal from 'sweetalert';
import Utils from './textUtil';
import CloseButton from '@material-ui/icons/Close';
import TextClipboard from './TextClipboard';
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
    updateUser = () => {
        const data = { 
            "user": { 
                "budget": parseInt(this.state.userSpendMax * 100),
                "maxDrinks": parseInt(this.state.userDrinkMax),
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
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            return resp;
        }).then(resp => {
            return resp.json();
        }).then(resp => {
            localStorage.setItem('userSpendMax', parseInt(this.state.userSpendMax * 100));
            localStorage.setItem('userDrinkMax', this.state.userDrinkMax);
            swal("Success!", "Updated your settings successfully.", "success");
            this.props.close();
        }).catch(err => {
            swal("Error!", "Error updating data", "error");
        });
    };
    makePublic = () => {
        const data = { 
            "user": {
                "public": this.state.userPublic
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
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            return resp;
        }).then(resp => {
            return resp.json();
        }).then(resp => {
            localStorage.setItem('userPublic', this.state.userPublic);
            swal("Success!", "Your privacy settings have been changed", "success");
        }).catch(err => {
            swal("Error!", "Error changing privacy setting", "error");
        });
    }
    logout = () => {
        window.FB.logout((resp) => {
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            window.location = window.location.origin;
        });
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleToggle = () => {
        this.setState(state => ({
            userPublic: !state.userPublic,
        }), () => {this.makePublic()});
    };
    close = () => {
        this.props.close();
    }
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
                    <TextClipboard text={`https://share.boba.watch/#/${this.props.userId}`}/>
                </Collapse>
                <div className="update-button-holder">
                    <Button className="logout-button" variant="text" onClick={this.logout} style={logoutButton}>LOGOUT</Button>
                    <Button className="update-button" onClick={this.updateUser}>UPDATE</Button>
                </div>
            </div>
        </Modal>
        )
    }
}

export default User;
