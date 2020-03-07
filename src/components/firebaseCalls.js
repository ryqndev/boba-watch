/**
 * @file firebaseCalls.js
 * @author ryqndev - ryan yang
 * @summary - A set of functions to help organize all the server calls
 * in one place
 */

import firebase from 'firebase';
import stats from './calculateStatistics';
import Swal from 'sweetalert2';

let firebaseConfig = {
    apiKey: 'AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ',
    authDomain: 'boba-watch-firebase.firebaseapp.com',
    databaseURL: 'https://boba-watch-firebase.firebaseio.com',
    projectId: 'boba-watch-firebase',
    storageBucket: '',
    messagingSenderId: '674375234614',
    appId: '1:674375234614:web:fdaf98c291204b9c'
};
firebase.initializeApp(firebaseConfig);

let db;
const currentUser = {profile: JSON.parse(localStorage.getItem('profile'))};
const nothing = () => { return; }
const defaultError = err => { Swal.fire('Error!', err + '', 'error') }

/**
 * @function init
 * @description initializes the firestore and fb auth 
 */
let init = (callback) => {
    db = firebase.firestore(); 
    db.enablePersistence().catch(err => {
        console.error(err);
    });
    firebase.auth().onAuthStateChanged(user => {
        if(!user) return callback(user);
        currentUser.user = {
            name: user.displayName,
            email: user.email,
            emailverified: user.emailVerified,
            anon: user.isAnonymous,
            id: user.uid,
            avatar: user.photoURL
        };

        localStorage.setItem('user', JSON.stringify(currentUser.user));
        let acc = user?.metadata;
        (acc?.creationTime === acc?.lastSignInTime) ? setUser(callback) : getUser(callback);
        getDrinks();
    });
}
const logout = () => {
    firebase.auth().signOut().then(function() {
        // let theme = localStorage.getItem('theme');
        localStorage.clear();
        // localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(defaultError);      
}
/**
 * @function getDrinks
 * @param {*} process - @see defaultProcess to see how this parameter
 * should be formatted. Should be a JSON object with 3 keys:
 * 1. init() - should return an object with all properties to be formatted
 * 2. each() - gets called for each drink object
 * 3. end( result ) - result of process
 * @returns array of drink objects through a callback function
 * @description Gets all the drinks listed under current user and 
 * returns an array of all the drinks with data reformatted
 * 
 * TODO: funnction should be called when user attempts to refresh any page
 */
let getDrinks = (callback=nothing, process=defaultProcess) => {
    let collections = process.init();
    db.collection(`users/${currentUser.user.id}/drinks`)
        .orderBy('drink.date', 'desc')
        .get()
        .then(querySnapshot => {
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
    end: (result) => {
        localStorage.setItem('drinkids', JSON.stringify(result.drinkids));
        stats.recalculateMetrics(result.drinks);
    }
}
/**
 * @function setUser
 * @var defaultProfile - schema for user profile to follow
 * @description Called when user is brand new. Sets up their profile on firebase
 */
const defaultProfile = {
    'budget': 10000,
    'limit': 15,
    'public': false
}
let setUser = (profile=defaultProfile, callback=nothing) => {
    db.collection('users')
    .doc(currentUser.user.id)
    .collection('user')
    .doc('profile')
    .set(profile)
    .then(res => {
        console.log(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
        currentUser.profile = profile;
        callback(res);
    }).catch(err => {
        Swal.fire('Oops...', `Error setting up your account: ${err}`, 'error');
    });
}
let getUser = (callback=nothing) => {
    db.collection('users')
    .doc(currentUser.user.id)
    .collection('user')
    .doc('profile')
    .get()
    .then(res => {
        let profile = res.data();
        if(
            profile?.budget === undefined
            || profile?.limit === undefined
            || profile?.public === undefined
        ){
            return setUser(callback);
        }
        localStorage.setItem('profile', JSON.stringify({
            budget: parseInt(profile.budget),
            limit:  parseInt(profile.limit),
            public: profile.public
        }));
        callback(res);
    })
    .catch(defaultError);
}

let updateUser = ({sharing, budget, limit}, callback=nothing) => {
    let data = {
        public: sharing,
        budget: budget,
        limit: limit
    };
    if(isNaN(data.budget) || isNaN(data.limit)){
        return Swal.fire('Oops...', `Please enter valid numbers`, 'error');
    }
    setUser(data, () => {
        Swal.fire('Success!', 'Your settings have been updated', 'success');
        callback();
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
    db.collection('users')
    .doc(currentUser.user.id)
    .collection('user')
    .doc('stats')
    .set(userStats)
    .then(res => {
        callback(res);
    }).catch(err => {
        Swal.fire('Error!', `${err}`, 'error');
        callback(err);
    });
}

/**
 * @function Drink methods
 * These methods either add, update, or delete a singular drink object.
 */
const addDrink = ( data, callback=nothing ) => {
    db.collection(`users/${currentUser.user.id}/drinks`)
    .add(data)
    .then(res => {
        Swal.fire('Done!', 'Drink added', 'success'); 
        callback(res);
    }).catch(defaultError);
}
const updateDrink = (data, id, callback=nothing) => {
    db.collection(`users/${currentUser.user.id}/drinks`)
    .doc(id)
    .set(data)
    .then(res => {
        Swal.fire('Done!', 'Drink updated', 'success'); 
        callback(res);
    }).catch(defaultError);
}
const deleteDrink = (id, callback=nothing) => {
    db.collection(`users/${currentUser.user.id}/drinks`)
    .doc(id)
    .delete()
    .then(() => {
        Swal.fire('Done!', 'Drink has been deleted', 'success'); 
        callback();
    }).catch(err => {
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
        current: currentUser
    },
    drinks: {
        get: getDrinks,
        add: addDrink,
        update: updateDrink,
        delete: deleteDrink
    }
}