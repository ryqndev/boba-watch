import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

export class Login extends Component {
    state = {
    }
    componentDidMount = () => {
        this.retrieveHistory();
    };
    retrieveHistory = () => {
    };
    successfulLogin = (i1, i2) => {
        this.props.successfulLogin(i1, i2);
    };

	responseFacebook = (fbRes) => {
		console.log(fbRes);
		axios.post("https://api.boba.watch/users/login", { fbRes })
		.then(servRes => {
			if (servRes.data.hasOwnProperty('userId')) {
				this.setState(() => ({
					userId: servRes.data.userId,
					accessToken: fbRes.accessToken
                }));
                this.successfulLogin(servRes.data.userId, fbRes.accessToken);
			}
			else {
				throw 'Facebok Login Failed';
			}
		})
		.catch(err => console.log(err));
	}

    render() {
        return (
        <div className="login-page">
            <Typography variant="h3">boba watch</Typography>
            <FacebookLogin
				appId="333104870889201"
				autoLoad={true}
				fields="name,email,picture"
				callback={this.responseFacebook}
			/>
			<p>{this.state.userId}</p>
			<p>{this.state.accessToken}</p>
        </div>
        )
    }
}

export default Login;
