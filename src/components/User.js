import React, { Component } from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import swal from 'sweetalert';
import './styles/user.css';

export class User extends Component {
    state = {
        userSpendMax: 100,
        userDrinkMax: 15,
    };
    componentDidMount(){
        fetch(`https://api.boba.watch/users/${this.props.userId}/${this.props.accessToken}`
        ).then(resp => {
            return resp.json();
        }).then(resp => {
            this.setState({
                userSpendMax: resp.budget == null ? 100 : resp.budget,
                userDrinkMax: resp.maxDrinks == null ? 15 : resp.maxDrinks
            });
        }).catch(err => {
            swal("Error!", "I had trouble getting your settings.", "error");
        });
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
            <div className="update-button-holder">
                <Button className="update-button" onClick={this.updateUser}>UPDATE</Button>
            </div>
        </div>
        )
    }
}

export default User;
