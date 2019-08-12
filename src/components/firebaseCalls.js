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
    db.enablePersistence();
    provider = new firebase.auth.FacebookAuthProvider();
}
/**
 * @function isLoggedIn
 * @param {*} 
 * 
 * @description Checks if user is already logged in. 
 * 
 * @note checkLogin() checks if the user has successfully authenticated,
 * as opposed to this function that checks if it has logged in before
 * 
 */
let isLoggedIn = ( callback ) => {
    firebase.auth().onAuthStateChanged( user => {
        callback(user ? true : false);
    });
      
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
    firebase.auth().signInWithRedirect(provider).then((result) => {
        callback(result);
    }).catch( error =>  {
        swal("Error!", `Login Unsuccessful: ${error}`, "error");
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
let checkLogin = ( approved=nothing, notapproved=nothing ) => {
    firebase.auth().getRedirectResult().then((result) => {
        result.credential ? approved(result) : notapproved();
    }).catch( error => {
        swal("Error!", `Login Unsuccessful: ${error}`, "error");
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
    }).catch( error => {
        swal("Error!", `Login Unsuccessful: ${error}`, "error");
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
        .get()
        .then( querySnapshot => {
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
    }).catch( error => {
        swal("Error!", `${error}`, "error");
    });
}

let updateUser = ( userProperties, callback=nothing ) => {
    let data = {
        public: userProperties.userPublic,
        budget: parseFloat(userProperties.userSpendMax) * 100,
        limit: parseInt(userProperties.userDrinkMax)
    };
    if(isNaN(data.budget) || isNaN(data.limit)){
        swal("Error!", "Please enter valid numbers", "error");
        return;
    }
    db.collection( 'users' )
    .doc(localStorage.getItem('uid'))
    .collection( 'user' )
    .doc( 'profile' )
    .set( data )
    .then( ( resp ) => {
        localStorage.setItem('userSpendMax', data.budget);
        localStorage.setItem('userDrinkMax', data.limit);
        localStorage.setItem('userPublic', data.public);
        swal("Success!", "Your settings have been updated", "success")
        .then((value) => {
            callback( value, resp );
        });
    }).catch( error => {
        swal("Error!", `${error}`, "error");
    });
}
/**
 * @function updateStats
 * @param {*} userStats - User stats to publish onto firebase
 * 
 * @description Update all the user stats
 * 
 */
let updateStats = ( userStats, callback=nothing ) => {
    db.collection( 'users' )
    .doc(localStorage.getItem('uid'))
    .collection( 'user' )
    .doc( 'stats' )
    .set( userStats )
    .then( ( resp ) => {
        callback( resp );
    }).catch( error => {
        swal("Error!", `${error}`, "error");
        callback( error );
    });
}
let getUser = ( callback=nothing ) => {
    db.collection( 'users' )
    .doc( localStorage.getItem('uid') )
    .collection( 'user' )
    .doc( 'profile' )
    .get()
    .then( ( resp ) => {
        let data = resp.data();
        localStorage.setItem('userSpendMax', data.budget);
        localStorage.setItem('userDrinkMax', data.limit);
        localStorage.setItem('userPublic', data.public);
        callback(resp);
    }).catch( error => {
        swal("Error!", `${error}`, "error");
    });
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
        swal("Done!", "Drink has been added", "success"); 
        callback( resp );
    }).catch( error => {
        swal("Error!", `${error}`, "error");
    });
}
let deleteDrink = ( drinkid, callback=nothing ) => {
    db.collection(`users/${localStorage.getItem('uid')}/drinks`)
    .doc( drinkid )
    .delete()
    .then((resp) => {
        console.log(resp);
        swal("Done!", "Drink has been deleted", "success"); 
        callback();
    }).catch( error => {
        console.log(error);
        swal('Error!', `Couldn't delete your drink. Try again later!$`, 'error');
    });
}
export default {
    init: init,
    login: {
        isLoggedIn: isLoggedIn,
        attempt: attemptLogin,
        check: checkLogin,
    },
    logout: logout,
    user: {
        setup: setupUser,
        get: getUser,
        update: updateUser,
        updateStats: updateStats,
    },
    drinks: {
        get: getDrinks,
        add: addDrink,
        delete: deleteDrink
    }
}