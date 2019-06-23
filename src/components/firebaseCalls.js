/**
 * @file firebaseCalls.js
 * @copyright Ryan Yang 2019
 * @summary - A set of functions to help organize all the server calls
 * in one place
 */

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import stats from './calculateStatistics';
import swal from 'sweetalert';

let db;
let provider;

/**
 * if callback does nothing
 */
let nothing = () => {
    return;   
}
/**
 * @function init
 * @description initializes the firestore and fb auth 
 */
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
let attemptLogin = ( callback=nothing ) => {
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
 */
let checkLogin = ( callback ) => {
    firebase.auth().getRedirectResult().then((result) => {
        if (result.credential) callback(result);
    }).catch(function(error) {
        swal("Error!", `Login Unsuccessful: ${error}`, "error");
        console.log(error);
    });      
}
/**
 * @function logout
 * @param {*} callback - callback function should trigger a redirect
 * to the login page
 * 
 * @description logs user out.
 */
let logout = ( callback=nothing ) => {
    firebase.auth().signOut().then(function() {
        callback();
    }).catch(function(error) {
        swal("Error!", `Login Unsuccessful: ${error}`, "error");
        console.log(error);
    });
}
/**
 * @function getDrinks
 * @param {*} process - @see defaultProcess to see how this parameter
 * should be formatted. Should be a JSON object with 3 keys:
 * 1. init() - should return an object with all properties to be formatted
 * 2. each() - gets called for each drink object
 * 3. end( result ) - result of process
 * 
 * @returns array of drink objects through a callback function
 * 
 * @description Gets all the drinks listed under current user and 
 * returns an array of all the drinks with data reformatted
 * 
 * TODO: funnction should be called when user attempts to refresh any page
 */
let getDrinks = ( callback=nothing, process=defaultProcess ) => {
    let collections = process.init();
    db.collection(`users/${localStorage.getItem('uid')}/drinks`)
        .orderBy('drink.date', 'desc')
        .limit(20)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                process.each(doc).forEach( e => {
                    collections[e.key].push(e.value);
                });          
            });
            process.end(collections);
            callback();
        }
    );
}
/**
 * @var defaultProcess - default process for extracting drinks from 
 * firebase and using the data ( stores all drink ids as list as well
 * as each drink's data individually )
 * 
 */
let defaultProcess = {
    init: () => {
        return {
            drinks: [],
            drinkids: []
        }
    },
    each: ( properties ) => {
        localStorage.setItem(properties.id, JSON.stringify(
            {
                ...properties.data().drink,
                id: properties.id
            }
        ));
        return [
            {
                key: 'drinks',
                value: { 
                    ...properties.data().drink,
                    id: properties.id
                }
            },
            {
                key: 'drinkids',
                value: properties.id
            }
        ];
    },
    end: ( result ) => {
        localStorage.setItem('drinkids', JSON.stringify(result.drinkids));
        stats.recalculateMetrics(result.drinks);
    }
}
/**
 * @function setupUser
 * 
 * @var defaultProfile - schema for user profile to follow
 * 
 * @description Called when user is brand new. Sets up their profile on firebase
 */
let setupUser = ( callback=nothing ) => {
    const defaultProfile = {
        'budget': 30000,
        'maxDrinks': 15,
        'public': false
    }
    db.collection('users')
    .doc(localStorage.getItem('uid'))
    .collection('user')
    .doc('profile')
    .set( defaultProfile )
    .then( ( resp ) => {
        localStorage.setItem('userSpendMax', defaultProfile.budget);
        localStorage.setItem('userDrinkMax', defaultProfile.maxDrinks);
        localStorage.setItem('userPublic', defaultProfile.public);
        callback( resp );
    }).catch(function(error) {
        swal("Error!", `${error}`, "error");
    });
}
let updateUser = ( userProperties ) => {
    // const data = { 
    //     "user": {
    //         "public": this.state.userPublic
    //     }
    // };
    // fetch(`https://api.boba.watch/users/${this.props.userId}/${this.props.accessToken}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data),
    // }
    // ).then(resp => {
    //     if (!resp.ok) {
    //         throw Error(resp.statusText);
    //     }
    //     return resp;
    // }).then(resp => {
    //     return resp.json();
    // }).then(resp => {
    //     localStorage.setItem('userPublic', this.state.userPublic);
    //     swal("Success!", "Your privacy settings have been changed", "success");
    // }).catch(err => {
    //     swal("Error!", "Error changing privacy setting", "error");
    // });
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
/**
 * @function addDrink
 *  
 * @description Adds a drink to firebase and should return information
 * regarding the added drink such as the generated id
 */
let addDrink = ( data, callback=nothing ) => {
    db.collection(`users/${localStorage.getItem('uid')}/drinks`)
    .add( data )
    .then( ( resp ) => {
        callback( resp );
    }).catch(function(error) {
        swal("Error!", `${error}`, "error");
    });
}
let deleteDrink = ( drinkid, callback=nothing ) => {
    db.collection(`users/${localStorage.getItem('uid')}/drinks`)
    .doc( drinkid )
    .delete()
    .then(function() {
        swal("Done!", "Drink has been deleted", "success"); 
        callback();
    }).catch(function(error) {
        swal('Error!', `Couldn't delete your drink. Try again later!`, 'error');
    });
}
export default {
    init: init,
    login: {
        check: checkLogin,
        attempt: attemptLogin
    },
    logout: logout,
    user: {
        setup: setupUser,
        update: updateUser
    },
    drinks: {
        get: getDrinks,
        add: addDrink,
        delete: deleteDrink
    }
}