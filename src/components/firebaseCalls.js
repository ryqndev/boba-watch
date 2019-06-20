/**
 * @file firebaseCalls.js
 * @copyright Ryan Yang 2019
 * @summary - A set of functions to help organize all the server calls
 * in one place
 */
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import swal from 'sweetalert';

let db;
let provider;

let init = () => {
    db = firebase.firestore();
    provider = new firebase.auth.FacebookAuthProvider();
}

/**
 * @function attemptLogin
 * @param {*} callback - function with 1 parameter that gets called
 * on function success. callback should have parameter that gets 
 * the returned data on successful login
 * 
 * @description triggers the firebase redirect login flow
 * 
 */
let attemptLogin = ( callback ) => {
    firebase.auth().signInWithPopup(provider).then((result) => {
        callback(result);
    }).catch((error) =>  {
        swal("Error!", `Login Unsuccessful: ${error}`, "error");
        console.log(error);
    });
}

/**
 * @function checkLogin
 * @param {*} callback - function with 1 parameter that gets called
 * on function success. callback should have parameter that gets 
 * the returned data on successful login
 * 
 * @description checks the firebase redirect login flow to see
 * if login has been successful
 * 
 */
let checkLogin = ( callback ) => {
    firebase.auth().getRedirectResult().then((result) => {
        if (result.credential) callback(result);
    }).catch(function(error) {
        swal("Error!", `Login Unsuccessful: ${error}`, "error");
        console.log(error);
    });      
}

let getDrinks = ( callback ) => {
    // fetch(`https://api.boba.watch/users/${userId}/${accessToken}`
    // ).then(resp => {
    //     if (!resp.ok) {
    //         throw Error(resp.statusText);
    //     }
    //     return resp;
    // }).then(resp => {
    //     return resp.json();
    // }).then(resp => {
    //     localStorage.setItem('userSpendMax', resp.budget);
    //     localStorage.setItem('userDrinkMax', resp.maxDrinks);
    //     localStorage.setItem('userPublic', resp.public);
    //     this.props.history.push('./dash');
    // }).catch(err => {
    //     swal("Error!", "I had trouble getting your drinks.", "error");
    // });
}

let updateUser = ( callback ) => {
    // fetch(`https://api.boba.watch/users/${userId}/${accessToken}`
    // ).then(resp => {
    //     if (!resp.ok) {
    //         throw Error(resp.statusText);
    //     }
    //     return resp;
    // }).then(resp => {
    //     return resp.json();
    // }).then(resp => {
    //     localStorage.setItem('userSpendMax', resp.budget);
    //     localStorage.setItem('userDrinkMax', resp.maxDrinks);
    //     localStorage.setItem('userPublic', resp.public);
    //     this.props.history.push('./dash');
    // }).catch(err => {
    //     swal("Error!", "I had trouble getting your drinks.", "error");
    // });
}

let addDrink = ( data, callback ) => {
    db.collection(`users/${localStorage.getItem('uid')}/drinks`)
    .push( data )
    .then( ( resp ) => {
        callback( resp );
    }).catch(function(error) {
        swal("Error!", `${error}`, "error");
    });
}

let deleteDrink = () => {

}


export default {
    init: init,
    login: {
        check: checkLogin,
        attempt: attemptLogin
    },
    user: {
        update: updateUser
    },
    drinks: {
        get: getDrinks,
        add: addDrink,
        delete: deleteDrink
    }
}