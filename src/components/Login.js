import React, { Component } from 'react';
import {Typography, Snackbar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import './styles/login.css';
import stats from './calculateStatistics';
import backend from './firebaseCalls';

let isdesktop = () => { return window.innerHeight/window.innerWidth < 1.2 }

const desktopAlertString = `Looks like you're using a desktop / landscape mode. Although we're working hard on designing an intuitive desktop mode, there isn't one at the moment. For the best experience, download our progressive web app on your phone! Find more info here:`;

export class Login extends Component {
    state = { isDesktop: isdesktop() }
    componentDidMount = () => {
        window.addEventListener( 'resize', () => this.setState({ isDesktop: isdesktop() } ) );
    }
    handleClose = () => { this.setState({ isDesktop: false }) }
    loggedIn = ( r ) => {
        this.props.successfulLogin( r );
    };
    render() {
        return (
        <div className="login-page">
            <div className="login-logo"></div>
            <Typography variant="h1">boba watch</Typography>
            <Snackbar
                open={this.state.isDesktop}
                message={[desktopAlertString,  <a 
                    href="https://info.boba.watch/"
                    rel="noopener noreferrer"
                    target='_blank'
                    style={{color: '#FFDCDC'}}> 
                        https://info.boba.watch/ 
                    </a>]}
                action={
                    <IconButton
                      key="close"
                      aria-label="Close"
                      style={{position: "fixed", top: 0, right: 0, color: '#FFFFFF'}}
                      onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                  }
            />
            <button className="fb-button" onClick={ () => backend.login.attempt( this.loggedIn ) }> Log in with Facebook </button>
        </div>
        )
    }
}

export default withRouter(Login);
