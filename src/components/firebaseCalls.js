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
let init = (callback) => {
    db = firebase.firestore(); 
    db.enablePersistence().catch( err => {
        console.error(err);
    });
    firebase.auth().onAuthStateChanged( user => {
        if(!user) return callback(user);

        setUserData(user);

        let acc = user?.metadata;
        (acc?.creationTime === acc?.lastSignInTime) ? setUser(callback) : getUser(callback);

        getDrinks();
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
const getUserData = (property=null) => {
    if(property === null)
        return currentUser.user;

    if(currentUser.user !== null && currentUser.user[property] !== null)
        return currentUser.user[property];

    switch(property){
        case 'avatar':
            return "";
        case 'email':
            return "";
        default:
            return null;
    }
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
    db.collection(`users/${currentUser.user.id}/drinks`)
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
 * @function setUser
 * 
 * @var defaultProfile - schema for user profile to follow
 * 
 * @description Called when user is brand new. Sets up their profile on firebase
 */
let setUser = ( callback=nothing ) => {
    const defaultProfile = {
        'budget': 10000,
        'limit': 15,
        'public': false
    }
    db.collection('users')
    .doc(currentUser.user.id)
    .collection('user')
    .doc('profile')
    .set( defaultProfile )
    .then( resp => {
        localStorage.setItem('budget', defaultProfile.budget);
        localStorage.setItem('limit', defaultProfile.limit);
        localStorage.setItem('public', defaultProfile.public);
        callback( resp );
    }).catch( error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error setting up your account: ${error}`
        });
    });
}
let getUser = ( callback=nothing ) => {
    db.collection( 'users' )
    .doc(currentUser.user.id)
    .collection( 'user' )
    .doc( 'profile' )
    .get()
    .then( ( resp ) => {
        let data = resp.data();
        if(
            data?.budget === undefined
            || data?.limit === undefined
            || data?.public === undefined
        ){
            return setUser(callback);
        }
        localStorage.setItem('budget', parseInt(data.budget));
        localStorage.setItem('limit', parseInt(data.limit));
        localStorage.setItem('public', data.public);
        callback(resp);
    }).catch( error => {
        Swal.fire("Error!", `${error}`, "error");
    });
}

let updateUser = ( userProperties, callback=nothing ) => {
    let data = {
        public: userProperties.public,
        budget: parseFloat(userProperties.budget) * 100,
        limit: parseInt(userProperties.limit)
    };
    if(isNaN(data.budget) || isNaN(data.limit)){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:"Please enter valid numbers"
        });
    }
    db.collection( 'users' )
    .doc(currentUser.user.id)
    .collection( 'user' )
    .doc( 'profile' )
    .set( data )
    .then( ( resp ) => {
        localStorage.setItem('budget', parseInt(data.budget));
        localStorage.setItem('limit', parseInt(data.limit));
        localStorage.setItem('public', data.public);
        Swal.fire("Success!", "Your settings have been updated", "success");
        callback();
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
    .doc(currentUser.user.id)
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

/**
 * @function addDrink
 *  
 * @description Adds a drink to firebase and should return information
 * regarding the added drink such as the generated id
 */
let addDrink = ( data, callback=nothing ) => {
    db.collection(`users/${currentUser.user.id}/drinks`)
    .add( data )
    .then( ( resp ) => {
        Swal.fire("Done!", "Drink has been added", "success"); 
        callback( resp );
    }).catch( error => {
        Swal.fire("Error!", `${error}`, "error");
    });
}
let deleteDrink = ( drinkid, callback=nothing ) => {
    db.collection(`users/${currentUser.user.id}/drinks`)
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
    logout: logout,
    user: {
        get: getUser,
        update: updateUser,
        updateStats: updateStatsFromLocalStorage,
    },
    get: {
        user: getUserData
    },
    drinks: {
        get: getDrinks,
        add: addDrink,
        delete: deleteDrink
    }
}