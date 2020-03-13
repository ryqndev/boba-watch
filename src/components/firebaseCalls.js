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

const firebaseConfig = {
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
const defaultProfile = {
    'budget': 10000,
    'limit': 15,
    'sharing': false
}
let currentUser = {
    user: undefined,        // metadata - (name, email, photo, etc.)
    profile: undefined,     // stats    - (budget, limit, sharing)
    drinklist: undefined,      // drinks   - [{id: ..., price:...}, ...]
    drinkids: undefined     // drinkids - [id1, id2, id3,...] date desc order
};
window.userstuff = currentUser;
const nothing = () => { return; }
const defaultError = err => {Swal.fire('Error!', err+'', 'error')}

let init = (callback) => {
    db = firebase.firestore(); 
    db.enablePersistence().catch(err => {console.error(err)});
    firebase.auth().onAuthStateChanged(user => {
        if(!user) return callback(user);    // if not logged in user
        let savedUserData = JSON.parse(localStorage.getItem('user'));
        if(currentUser.user.uid === savedUserData.user.uid){
            currentUser = savedUserData;
            return callback(user);
        }
        currentUser.user = {
            name: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            email: user.email,
            emailVerified: user.emailVerified
        };
        let setup = [
            db.collection(`users/${currentUser.user.uid}/drinks`).orderBy('drink.date', 'desc').get(),
            (user?.metadata?.creationTime === user?.metadata?.lastSignInTime)
                ? setUser(defaultProfile)
                : getUser()
        ];
        Promise.all(setup).then(([drinks, profile]) => {
            saveDrinksLocally(drinks);
            saveUserLocally(profile);
            localStorage.setItem('user', JSON.stringify(currentUser));
            callback(user);
        }).catch(defaultError);
    });
}

const saveDrinksLocally = (entries) => {
    let drinkids = [], drinklist = [];
    entries.forEach(entry => {
        let data = {id: entry.id, ...entry.data().drink}
        localStorage.setItem(entry.id, JSON.stringify(data));
        drinkids.push(entry.id);
        drinklist.push(data);
    });
    currentUser.drinklist = drinklist;
    currentUser.drinkids = drinkids;
    // localStorage.setItem('drinkids', JSON.stringify(drinkids));
    stats.recalculateMetrics(drinklist);
}

const saveUserLocally = (user) => {
    let profile = user?.data();
    if(
        profile?.budget === undefined
        || profile?.limit === undefined
        || profile?.sharing === undefined
    ){
        profile = defaultProfile;
    }
    currentUser.profile = profile;
    // localStorage.setItem('profile', JSON.stringify({
    //     budget: parseInt(profile.budget),
    //     limit:  parseInt(profile.limit),
    //     sharing: profile.sharing
    // }));
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
        .doc(currentUser.user.uid)
        .collection('user')
        .doc('profile')
        .get();
}
const updateUser = ({sharing, budget, limit}, callback=nothing) => {
    let data = {
        sharing: sharing,
        budget: budget,
        limit: limit
    };
    if(isNaN(data.budget) || isNaN(data.limit)){
        return Swal.fire('Oops...', `Please enter valid numbers`, 'error');
    }
    setUser(data).then(() => {
        Swal.fire('Success!', 'Your settings have been updated', 'success');
        callback(data);
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
    stats.fn = currentUser.user.displayName;
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