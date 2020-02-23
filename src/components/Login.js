import React, { useEffect } from 'react';
import {Typography} from '@material-ui/core';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import './styles/login.css';
import 'firebaseui/dist/firebaseui.css';

const Login = () => {
    useEffect(() => {
        let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#auth-container', {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            ],
            // tosUrl: '<your-tos-url>',
        });
    })
    return (
        <div className="login-page">
            <div className="login-logo"></div>
            <Typography variant="h1">boba watch</Typography>
            <div id="auth-container"></div>
        </div>
    );
}

export default Login;
