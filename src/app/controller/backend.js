/**
 * @file backend.js
 * @author ryqndev - ryan yang
 * @summary - A set of functions to help organize all the server calls
 * in one place
 */

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import stats from './calculateStatistics';
import Swal from 'sweetalert2';

const firebaseConfig = {
    apiKey: 'AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ',
    authDomain: 'boba-watch-firebase.firebaseapp.com',
    databaseURL: 'https://boba-watch-firebase.firebaseio.com',
    projectId: 'boba-watch-firebase',
    storageBucket: 'boba-watch-firebase.appspot.com',
    messagingSenderId: '674375234614',
    appId: '1:674375234614:web:fdaf98c291204b9c',
    measurementId: 'G-C2DYVHCWDR'
};
firebase.initializeApp(firebaseConfig);

let db;
const defaultProfile = {
    'budget': 10000,
    'limit': 15,
    'sharing': false
}
const store = {
    currentUser:{
        user: undefined,        // metadata - (name, email, photo, etc.)
        profile: undefined,     // stats    - (budget, limit, sharing)
        drinkids: undefined,    // drinkids - [id1, id2, id3,...] date desc order
        theme: undefined        // theme
    }
};
window.userstuff = store;//TODO remove
const nothing = () => { return; }
const defaultError = err => {Swal.fire('Error!', err+'', 'error')}

let init = (callback) => {
    db = firebase.firestore(); 
    db.enablePersistence().catch(err => {console.error(err)});

    let savedUserData = JSON.parse(localStorage.getItem('user'));
    if(savedUserData !== null){
        store.currentUser = savedUserData;
        return callback(store.currentUser.user);
    }
    firebase.auth().onAuthStateChanged(user => {
        if(!user) return callback(user);    // if not logged in user
        store.currentUser.user = {
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            email: user.email,
            emailVerified: user.emailVerified,
            created: user?.metadata?.creationTime,
            lastSignedIn: user?.metadata?.lastSignInTime
        };
        let setup = [
            db.collection(`users/${store.currentUser.user.uid}/drinks`).orderBy('drink.date', 'desc').get(),
            (user?.metadata?.creationTime === user?.metadata?.lastSignInTime)
                ? setUser(defaultProfile)
                : getUser(),
            setBlog(),
            getAutofillOptions()
        ];
        Promise.all(setup).then(([drinks, profile, blog, autofill]) => {
            saveDrinksLocally(drinks);
            saveUserLocally(profile);
            saveAutofillLocally(autofill);
            localStorage.setItem('user', JSON.stringify(store.currentUser));
            callback(user);
        }).catch(defaultError);
    });
}

const setBlog = async() => {
    return db.collection(`users/${store.currentUser.user.uid}/blog`).doc('user').set({
        name:  store.currentUser.user.displayName,
        profile:  store.currentUser.user.photoURL
    });
}
const getBlog = async(blogid) => {
    return db.collection('blogs').doc(blogid).get();
}
const saveDrinksLocally = (entries) => {
    let drinkids = [];
    entries.forEach(entry => {
        let data = {id: entry.id, ...entry.data().drink}
        localStorage.setItem(entry.id, JSON.stringify(data));
        drinkids.push(entry.id);
    });
    store.currentUser.drinkids = drinkids;
    stats.recalculateMetrics(drinkids);
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
    if(profile?.budget === undefined){
        profile.budget = 10000;
    }
    if(profile?.limit === undefined){
        profile.limit = 15;
    }
    if(profile?.sharing === undefined){
        profile.sharing = 
            profile?.public === undefined 
                ? false 
                : profile.public;
    }
    store.currentUser.profile = profile;
};

const saveAutofillLocally = (autofill) => {
    let data = autofill?.data()?.data ?? '[]';
    localStorage.setItem('autofill', data);
}

const logout = () => {
    firebase.auth().signOut().then(function() {
        let theme = localStorage.getItem('theme');
        localStorage.clear();
        localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(defaultError);      
}

const setUser = async(profile=defaultProfile) => {
    return db.collection('users')
        .doc(store.currentUser.user.uid)
        .collection('user')
        .doc('profile')
        .set(profile);
}
const getUser = async() => {
    return db.collection('users')
        .doc(store.currentUser.user.uid)
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
    setBlog();
    if(isNaN(data.budget) || isNaN(data.limit)){
        return Swal.fire('Oops...', `Please enter valid numbers`, 'error');
    }
    setUser(data).then(() => {
        Swal.fire('Success!', 'Your settings have been updated', 'success');
        callback(data);
    });
}

/**
 * @function updateStatsFromLocalStorage - uploads localStorage 'metrics'
 * and 'completeMetrics' values to firebase
 */
const updateStatsFromLocalStorage = (callback=nothing) => {
    let stats = JSON.parse(localStorage.getItem('metrics')),
        cstats = JSON.parse(localStorage.getItem('completeMetrics'));
    delete stats.d;
    stats['ctd'] = cstats.td;
    stats['ctc'] = cstats.tc;
    stats['cad'] = cstats.ad;
    stats['d'] = JSON.stringify(cstats.d);
    stats.fn = store.currentUser.user.displayName;
    updateStats(stats, callback);
}
const updateStats = (userStats, callback=nothing ) => {
    db.collection('users')
    .doc(store.currentUser.user.uid)
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
const addDrink = async(data) => {
    return db.collection(`users/${store.currentUser.user.uid}/drinks`).add(data);
}
const updateDrink = async(data, id) => {
    return db.collection(`users/${store.currentUser.user.uid}/drinks`).doc(id).set(data);
}
const deleteDrink = (id, callback=nothing) => {
    db.collection(`users/${store.currentUser.user.uid}/drinks`)
    .doc(id)
    .delete()
    .then(() => {
        Swal.fire('Done!', 'Drink has been deleted', 'success'); 
        callback();
    }).catch(err => {
        Swal.fire('Error!', `Couldn't delete your drink. Try again later!`, 'error');
    });
}

const getAutofillOptions = async() => {
    return db.collection(`users/${store.currentUser.user.uid}/user`).doc('autofill').get();
}
const setAutofillOptions = async(data) => {
    return db.collection(`users/${store.currentUser.user.uid}/user`).doc('autofill').set({data: JSON.stringify(data)});
}

const getUserBlog = async(uid) => {
    return db.collection(`users/${uid}/blog`).doc('user').get();
}
const setUserBlog = async(updateValues) => {
    return db.collection(`users/${store.currentUser.user.uid}/blog`).doc('user').update(updateValues);
}

const publishAdd = async({id, ...data}) => {
    return db.collection('blogs').add({ uid: store.currentUser.user.uid, likes: 0, ...data});
}
const publishGetUser = async(uid) => {
    return db.collection('blogs').where('uid', '==', uid).orderBy('date', 'desc').limit(6).get();
}
const publishGetFeed = async(uid) => {
    return db.collection('blogs').orderBy('date', 'desc').limit(10).get();
}
const publishDelete = async(id) => {
    return db.collection('blogs').doc(id).delete();
}
const blogLike = async(id, increment) => {
    const change = firebase.firestore.FieldValue.increment(increment ? 1 : -1);
    const likedCollection = db.collection(`users/${store.currentUser.user.uid}/user/profile/liked`);
    if(increment) likedCollection.doc(id).set({});
    else likedCollection.doc(id).delete();
    return db.collection('blogs').doc(id).update({ likes: change });
}

const getFaves = async(uid) => {
    return db.collection(`users/${uid}/user/profile/liked`).limit(6).get();
}
const getStats = async(uid) => {
    return db.collection('users')
        .doc(uid)
        .collection('user')
        .doc('stats').get();
}

export default {
    init: init,
    logout: logout,
    user: {
        get: getUser,
        update: updateUser,
        updateStats: updateStatsFromLocalStorage,
        getAutofill: getAutofillOptions,
        setAutofill: setAutofillOptions
    },
    get: store,
    drinks: {
        add: addDrink,
        update: updateDrink,
        delete: deleteDrink
    },
    blog: {
        getProfile: getUserBlog,
        setProfile: setUserBlog,
        like: blogLike,
        faves: getFaves,
        get: getBlog,
        stats: getStats
    },
    publish: {
        add: publishAdd,
        get: {
            user: publishGetUser,
            feed: publishGetFeed
        },
        delete: publishDelete
    },
}