import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import './styles/login.css';
import stats from './calculateStatistics';
import axios from 'axios';

export class Login extends Component {
    successfulLogin = (userId, fbRes) => {
        if(localStorage.getItem('userId') !== userId){
            localStorage.clear();
            localStorage.setItem('userId', userId);
        }
        localStorage.setItem('avatar', fbRes.picture.data.url);
        this.props.successfulLogin(userId, fbRes);
        fetch(`https://api.boba.watch/drinks/user/${userId}`, {
        }).then((resp) => { return resp.json();
        }).then((resp) => { 
            this.storeData(resp, userId, fbRes.accessToken);
        }).catch(err => { swal('Whoops!', `Error logging you in: ${err}`, 'error');
        });
    };
    /**
     * @function storeData
     * @param {JSON} resp - array of drink objects
     * @param {int} userId - user id in database to get drinks of
     * 
     * TODO: Firefox has a weird bug that doesn't make the login work out well
     */
    storeData = (resp, userId, accessToken) => {
        stats.recalculateMetrics(resp);
        fetch(`https://api.boba.watch/users/${userId}/${accessToken}`
        ).then(resp => {
            return resp.json();
        }).then(resp => {
            localStorage.setItem('userSpendMax', resp.budget);
            localStorage.setItem('userDrinkMax', resp.maxDrinks);
            // localStorage.setItem('userPublic', resp.public);
            localStorage.setItem('userPublic', true);
            this.props.history.push('./dash');
        }).catch(err => {
            swal("Error!", "I had trouble getting your settings.", "error");
        });
    }
	responseFacebook = (fbRes) => {
		axios.post("https://api.boba.watch/users/login", { fbRes })
		.then(servRes => {
			if (servRes.data.hasOwnProperty('userId')) {
				this.setState(() => ({
					userId: servRes.data.userId,
					accessToken: fbRes.accessToken
                }), () => {this.successfulLogin(servRes.data.userId, fbRes);});
			}
			else {
                swal("Error!", `Login Unsuccessful`, "error");
                // eslint-disable-next-line
				throw 'Facebok Login Failed';
			}
		})
		.catch(err => console.log(err));
    };

    render() {
        return (
        <div className="login-page">
            <div className="login-logo"></div>
            <Typography variant="h1">boba watch</Typography>
            <FacebookLogin
                appId="333104870889201"
                autoLoad={true}
                cookies={true}
                fields="name,email,picture"
				callback={this.responseFacebook}
			/>
        </div>
        )
    }
}

export default withRouter(Login);
