import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import { withRouter } from 'react-router-dom';
import './styles/login.css';
import stats from './calculateStatistics';
import axios from 'axios';

export class Login extends Component {
    successfulLogin = (i1, i2) => {
        this.props.successfulLogin(i1, i2);
        fetch("https://api.boba.watch/drinks/user/" + i1, {
        }).then((resp) => { return resp.json();
        }).then((resp) => { this.storeData(resp, i1);
        }).catch(err => { console.log("Error logging in: ", err);
        });
    };
    storeData = (resp, userid) => {
        stats.recalculateMetrics(resp);
        if(localStorage.getItem('userid') !== userid){
            localStorage.clear();
            localStorage.setItem('userId', userid);
        }
        localStorage.setItem('metrics', JSON.stringify(stats.recalculateMetrics(resp)));
        this.props.history.push('/dash');
    }
	responseFacebook = (fbRes) => {
        console.log(fbRes);
		axios.post("https://api.boba.watch/users/login", { fbRes })
		.then(servRes => {
			if (servRes.data.hasOwnProperty('userId')) {
				this.setState(() => ({
					userId: servRes.data.userId,
					accessToken: fbRes.accessToken
                }), () => {this.successfulLogin(servRes.data.userId, fbRes.accessToken);});
			}
			else {
                // eslint-disable-next-line
				throw 'Facebok Login Failed';
			}
		})
		.catch(err => console.log(err));
    }
    /**
     * SECTION TESTING LOGIN
     * 
     * @function fakeLoginTestData
     */
    fakeLoginTestData = () => {
        this.setState(() => ({
            userId: 1
        }), () => {this.successfulLogin(1, 1); });
    }

    render() {
        return (
            /**TODO REMOVE IN PROD 
             * @function onLoad(this.fakeLoginTestData)
            */
        <div className="login-page" onClick={this.fakeLoginTestData}>
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
