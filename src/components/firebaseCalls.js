/**
 * @file firebaseCalls.js
 * @copyright Ryan Yang 2019
 * @summary - A set of functions to help organize all the server calls
 * in one place
 */

import firebase from 'firebase';
import stats from './calculateStatistics';
import Swal from 'sweetalert2';

let firebaseConfig = {
    apiKey: "AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ",
    authDomain: "boba-watch-firebase.firebaseapp.com",
    databaseURL: "https://boba-watch-firebase.firebaseio.com",
    projectId: "boba-watch-firebase",
    storageBucket: "",
    messagingSenderId: "674375234614",
    appId: "1:674375234614:web:fdaf98c291204b9c"
};
firebase.initializeApp(firebaseConfig);


let db;
const currentUser = {
    user: JSON.parse(localStorage.getItem('user')),
}
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
    db.enablePersistence().catch( err => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
        }
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
let checkLogin = ( callback=nothing ) => {
    firebase.auth().onAuthStateChanged( user => {
        if(user){
            if(user?.metadata?.creationTime === user?.metadata?.lastSignInTime){
                setupUser(setUserData.bind(null, user));
            }else{
                getUser(setUserData.bind(null, user));
            }
        }
        callback(user);
    });   
}
const setUserData = (user) => {
    
    let userData = {
        name: user.displayName,
        email: user.email,
        emailverified: user.emailVerified,
        anon: user.isAnonymous,
        id: user.uid,
        avatar: user.photoURL
    };
    localStorage.setItem('user', JSON.stringify(userData));
    currentUser.user = userData;
    return userData;
}
const logout = (cb, err=nothing) => {
    firebase.auth().signOut().then(function() {
        // let theme = localStorage.getItem('theme');
        localStorage.clear();
        // localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(function(error) {
        err(error);
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
        'budget': 10000,
        'limit': 15,
        'public': false
    }
    db.collection('users')
    .doc(localStorage.getItem('uid'))
    .collection('user')
    .doc('profile')
    .set( defaultProfile )
    .then( resp => {
        localStorage.setItem('userSpendMax', defaultProfile.budget);
        localStorage.setItem('userDrinkMax', defaultProfile.limit);
        localStorage.setItem('userPublic', defaultProfile.public);
        callback( resp );
    }).catch( error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error setting up your account: ${error}`
        });
    });
}

let updateUser = ( userProperties, callback=nothing ) => {
    let data = {
        public: userProperties.userPublic,
        budget: parseFloat(userProperties.userSpendMax) * 100,
        limit: parseInt(userProperties.userDrinkMax)
    };
    if(isNaN(data.budget) || isNaN(data.limit)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:"Please enter valid numbers"
        });
        return;
    }
    db.collection( 'users' )
    .doc(localStorage.getItem('uid'))
    .collection( 'user' )
    .doc( 'profile' )
    .set( data )
    .then( ( resp ) => {
        localStorage.setItem('userSpendMax', parseInt(data.budget));
        localStorage.setItem('userDrinkMax', parseInt(data.limit));
        localStorage.setItem('userPublic', data.public);
        Swal.fire("Success!", "Your settings have been updated", "success")
        
        .then((value) => {
            callback( value, resp );
        });
    }).catch( error => {
        Swal.fire("Error!", `${error}`, "error");
    });
}
let updateStatsFromLocalStorage = (callback=nothing) => {
    let stats = JSON.parse(localStorage.getItem('metrics')),
        cstats = JSON.parse(localStorage.getItem('completeMetrics'));
    delete stats.d;
    stats['ctd'] = cstats.td;
    stats['ctc'] = cstats.tc;
    stats['cad'] = cstats.ad;
    stats['d'] = JSON.stringify(cstats.d);
    stats.fn = localStorage.getItem('fname');
    updateStats(stats, callback);
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
        Swal.fire("Error!", `${error}`, "error");
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
        localStorage.setItem('userSpendMax', parseInt(data.budget));
        localStorage.setItem('userDrinkMax', parseInt(data.limit));
        localStorage.setItem('userPublic', data.public);
        callback(resp);
    }).catch( error => {
        Swal.fire("Error!", `${error}`, "error");
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
        Swal.fire("Done!", "Drink has been added", "success"); 
        callback( resp );
    }).catch( error => {
        Swal.fire("Error!", `${error}`, "error");
    });
}
let deleteDrink = ( drinkid, callback=nothing ) => {
    db.collection(`users/${localStorage.getItem('uid')}/drinks`)
    .doc( drinkid )
    .delete()
    .then((resp) => {
        Swal.fire("Done!", "Drink has been deleted", "success"); 
        callback();
    }).catch( error => {
        console.log(error);
        Swal.fire('Error!', `Couldn't delete your drink. Try again later!`, 'error');
    });
}
export default {
    init: init,
    login: {
        check: checkLogin,
    },
    logout: logout,
    user: {
        setup: setupUser,
        get: getUser,
        update: updateUser,
        updateStats: updateStatsFromLocalStorage,
    },
    drinks: {
        get: getDrinks,
        add: addDrink,
        delete: deleteDrink
    }
}