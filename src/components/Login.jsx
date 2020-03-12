import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const loginHeaderStyle = {
    fontFamily: 'Poppins',
    fontWeight: 700,
    color: 'white',
    fontSize: 44,
    marginBottom: 20,
}

const Login = () => {
    useEffect(() => {
        let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        if (ui.isPendingRedirect()) {
            ui.start('#auth-container', {
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                ],
                // tosUrl: '<your-tos-url>',
            });
        }
    })
    return (
        <div className="login-page">
            <div className="login-logo"></div>
            <h1 style={loginHeaderStyle}>boba watch</h1>
            <div id="auth-container"></div>
        </div>
    );
}

export default Login;
