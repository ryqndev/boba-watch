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
        this.props.successfulLogin(userId, fbRes);
        fetch("https://api.boba.watch/drinks/user/" + userId, {
        }).then((resp) => { return resp.json();
        }).then((resp) => { this.storeData(resp, userId, fbRes.picture.data.url);
        }).catch(err => { console.log("Error logging in: ", err);
        });
    };
    /**
     * @function storeData
     * @param {JSON} resp - array of drink objects
     * @param {int} userId - user id in database to get drinks of
     */
    storeData = (resp, userId, avatar) => {
        stats.recalculateMetrics(resp);
        if(localStorage.getItem('userId') !== userId){
            localStorage.clear();
            localStorage.setItem('userId', userId);
        }
        localStorage.setItem('avatar', avatar);
        localStorage.setItem('metrics', JSON.stringify(stats.recalculateMetrics(resp)));
        
        //TODO: remove when login is secured and successful everytime
        alert("Login Successful!");

        this.props.history.push('./dash');
    }
	responseFacebook = (fbRes) => {
        // console.log(fbRes);
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
