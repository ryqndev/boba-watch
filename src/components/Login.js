import React, { Component } from 'react';
import {Typography, Snackbar, IconButton, Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import FacebookLogin from 'react-facebook-login';
import { withRouter } from 'react-router-dom';
// import swal from 'sweetalert';
import './styles/login.css';
// import stats from './calculateStatistics';
// import axios from 'axios';

const desktopAlertString = `Looks like you're using a desktop / landscape mode. Although we're working hard on designing an intuitive desktop mode, there isn't one at the moment. For the best experience, download our progressive web app on your phone! Find more info here:`;

export class Login extends Component {
    state = {
        isDesktop: (window.innerHeight/window.innerWidth < 1.2)
    }
    componentDidMount = () => {
        window.addEventListener('resize', 
            () => this.setState({isDesktop: (window.innerHeight/window.innerWidth < 1.2)})
        );
    }
    handleClose = () => {
        this.setState({ isDesktop: false });
    };
    // successfulLogin = (userId, fbRes) => {
    //     if(localStorage.getItem('userId') !== userId){
    //         localStorage.clear();
    //         localStorage.setItem('userId', userId);
    //     }
    //     localStorage.setItem('avatar', fbRes.picture.data.url);
    //     this.props.successfulLogin(userId, fbRes);
    //     fetch(`https://api.boba.watch/drinks/user/${userId}`, {
    //     }).then((resp) => { return resp.json();
    //     }).then((resp) => { 
    //         this.storeData(resp, userId, fbRes.accessToken);
    //     }).catch(err => { swal('Whoops!', `Error logging you in: ${err}`, 'error');
    //     });
    // };
    /**
     * @function storeData
     * @param {JSON} resp - array of drink objects
     * @param {int} userId - user id in database to get drinks of
     * 
     * TODO: Firefox has a weird bug that doesn't make the login work out well
     */
    // storeData = (resp, userId, accessToken) => {
    //     stats.recalculateMetrics(resp);
    //     fetch(`https://api.boba.watch/users/${userId}/${accessToken}`
    //     ).then(resp => {
    //         return resp.json();
    //     }).then(resp => {
    //         localStorage.setItem('userSpendMax', resp.budget);
    //         localStorage.setItem('userDrinkMax', resp.maxDrinks);
    //         localStorage.setItem('userPublic', resp.public);
    //         this.props.history.push('./dash');
    //     }).catch(err => {
    //         swal("Error!", "I had trouble getting your settings.", "error");
    //     });
    // }
	// responseFacebook = (fbRes) => {
	// 	axios.post("https://api.boba.watch/users/login", { fbRes })
	// 	.then(servRes => {
	// 		if (servRes.data.hasOwnProperty('userId')) {
	// 			this.setState(() => ({
	// 				userId: servRes.data.userId,
	// 				accessToken: fbRes.accessToken
    //             }), () => {this.successfulLogin(servRes.data.userId, fbRes);});
	// 		}
	// 		else {
    //             swal("Error!", `Login Unsuccessful`, "error");
    //             // eslint-disable-next-line
	// 			throw 'Facebok Login Failed';
	// 		}
	// 	})
	// 	.catch(err => console.log(err));
    // };
    fbLogin = () => {
        let url = `https://m.facebook.com/v3.3/dialog/oauth?client_id=333104870889201&redirect_uri="https://96e4c687.ngrok.io/"`;
        console.log('test');
        fetch(url, {
            headers: {
                "Content-Type" : "text/html; charset=utf-8"
            },
            mode: "no-cors",
        }).then(r => {console.log(r); return r.text();}).then(resp => {alert(resp);});
    }
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
                {/* <FacebookLogin
                    appId="333104870889201"
                    autoLoad={true}
                    fields="name,email,picture"
                    style={{margin: '50px'}}
                    callback={this.responseFacebook}
                />             */}
                <Button onClick={this.fbLogin}>Login</Button>
                <iframe src={`https://m.facebook.com/v3.3/dialog/oauth?client_id=333104870889201&redirect_uri="https://96e4c687.ngrok.io/"`}></iframe>
        </div>
        )
    }
}

export default withRouter(Login);
