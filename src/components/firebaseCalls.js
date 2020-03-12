/**
 * @file firebaseCalls.js
 * @author ryqndev - ryan yang
 * @summary - A set of functions to help organize all the server calls
 * in one place
 */

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import stats from './calculateStatistics';
import Swal from 'sweetalert2';

let db;

const firebaseConfig = {
    apiKey: 'AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ',
    authDomain: 'boba-watch-firebase.firebaseapp.com',
    databaseURL: 'https://boba-watch-firebase.firebaseio.com',
    projectId: 'boba-watch-firebase',
    storageBucket: '',
    messagingSenderId: '674375234614',
    appId: '1:674375234614:web:fdaf98c291204b9c'
};
const defaultProfile = {
    'budget': 10000,
    'limit': 15,
    'public': false
}
const currentUser = {
    user: undefined,        // metadata - (name, email, photo, etc.)
    profile: undefined,     // stats    - (budget, limit, public)
    drinklist: undefined,      // drinks   - [{id: ..., price:...}, ...]
    drinkids: undefined     // drinkids - [id1, id2, id3,...] date desc order
};
const nothing = () => { return; }
const defaultError = err => {Swal.fire('Error!', err+'', 'error')}

let init = (callback) => {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore(); 
    db.enablePersistence().catch(err => {console.error(err)});
    firebase.auth().onAuthStateChanged(user => {
        if(!user) return callback(user);    // if not logged in user
        currentUser.user = {...user};
        localStorage.setItem('user', JSON.stringify(currentUser.user));
        let setup = [
            db.collection(`users/${currentUser.user.uid}/drinks`).orderBy('drink.date', 'desc').get(),
            (user?.metadata?.creationTime === user?.metadata?.lastSignInTime)
                ? setUser(defaultProfile)
                : getUser()
        ];
        Promise.all(setup).then(([drinks, profile]) => {
            saveDrinksLocally(drinks);
            saveUserLocally(profile);
            callback(user);
        }).catch(defaultError);
    });
}

const saveDrinksLocally = (entries) => {
    currentUser.drinkids = [];
    currentUser.drinklist = [];
    entries.forEach(entry => {
        let data = {id: entry.id, ...entry.data().drink}
        localStorage.setItem(entry.id, JSON.stringify(data));
        currentUser.drinkids.push(entry.id);
        currentUser.drinklist.push(data);
    });
    localStorage.setItem('drinkids', JSON.stringify(currentUser.drinkids));
    stats.recalculateMetrics(currentUser.drinklist);
}

const saveUserLocally = (user) => {
    let profile = user?.data();
    if(
        profile?.budget === undefined
        || profile?.limit === undefined
        || profile?.public === undefined
    ){
        profile = defaultProfile;
    }
    currentUser.profile = profile;
    localStorage.setItem('profile', JSON.stringify({
        budget: parseInt(profile.budget),
        limit:  parseInt(profile.limit),
        public: profile.public
    }));
};

const logout = () => {
    firebase.auth().signOut().then(function() {
        // let theme = localStorage.getItem('theme');
        localStorage.clear();
        // localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(defaultError);      
}

const setUser = async(profile=defaultProfile) => {
    return db.collection('users')
        .doc(currentUser.user.uid)
        .collection('user')
        .doc('profile')
        .set(profile);
}
const getUser = async() => {
    db.collection('users')
        .doc(currentUser.user.id)
        .collection('user')
        .doc('profile')
        .get();
}
const updateUser = ({sharing, budget, limit}, callback=nothing) => {
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

const updateStatsFromLocalStorage = (callback=nothing) => {
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
const updateStats = (userStats, callback=nothing ) => {
    db.collection('users')
    .doc(currentUser.user.uid)
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
const addDrink = (data, callback=nothing) => {
    db.collection(`users/${currentUser.user.uid}/drinks`)
    .add(data)
    .then(res => {
        Swal.fire('Done!', 'Drink added', 'success'); 
        callback(res);
    }).catch(defaultError);
}
const updateDrink = (data, id, callback=nothing) => {
    db.collection(`users/${currentUser.user.uid}/drinks`)
    .doc(id)
    .set(data)
    .then(res => {
        Swal.fire('Done!', 'Drink updated', 'success'); 
        callback(res);
    }).catch(defaultError);
}
const deleteDrink = (id, callback=nothing) => {
    db.collection(`users/${currentUser.user.uid}/drinks`)
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
    get: currentUser,
    drinks: {
        add: addDrink,
        update: updateDrink,
        delete: deleteDrink
    }
}