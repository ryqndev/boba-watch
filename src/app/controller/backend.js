/**
 * @file backend.js
 * @author ryqndev - ryan yang
 */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {init as initFirestore, database as db} from '../libs/firestore';
import {onLogin} from '../libs/analytics';
import stats from './calculateStatistics';
import {profile as defaultProfile} from '../defaults';
import {
    alertDefaultError,
    alertInvalidNumberInput,
    alertSettingsUpdateSuccess,
    alertDrinkNotDeleted,
    alertDrinkDeletedSuccess
} from '../libs/swal';

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

let init = (callback) => {
    initFirestore();
    let savedUserData = JSON.parse(localStorage.getItem('user'));
    if(savedUserData !== null){
        store.currentUser = savedUserData;
        return callback(store.currentUser.user);
    }
    firebase.auth().onAuthStateChanged(user => {
        if(!user) return callback(user);    // if not logged in user
        onLogin();
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
        }).catch(alertDefaultError);
    });
}

const setBlog = async() => {
    return db.collection(`users/${store.currentUser.user.uid}/blog`).doc('user').set({
        name:  store.currentUser.user.displayName,
        profile:  store.currentUser.user.photoURL
    });
}

const saveDrinksLocally = (entries) => {
    let drinkids = [];
    entries.forEach(entry => {
        localStorage.setItem(entry.id, JSON.stringify({id: entry.id, ...entry.data().drink}));
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
        return alertInvalidNumberInput();
    }
    setUser(data).then(() => {
        alertSettingsUpdateSuccess();
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
        alertDefaultError(err);
        callback(err);
    });
}

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
        alertDrinkDeletedSuccess();
        callback();
    }).catch(err => {
        alertDrinkNotDeleted(err);
    });
}

const getAutofillOptions = async() => {
    return db.collection(`users/${store.currentUser.user.uid}/user`).doc('autofill').get();
}
const setAutofillOptions = async(data) => {
    return db.collection(`users/${store.currentUser.user.uid}/user`).doc('autofill').set({data: JSON.stringify(data)});
}

const setUserBlog = async(updateValues) => {
    return db.collection(`users/${store.currentUser.user.uid}/blog`).doc('user').update(updateValues);
}

const publishAdd = async({id, ...data}) => {
    return db.collection('blogs').add({ uid: store.currentUser.user.uid, likes: 0, ...data});
}
const blogLike = async(id, increment) => {
    const change = firebase.firestore.FieldValue.increment(increment ? 1 : -1);
    const likedCollection = db.collection(`users/${store.currentUser.user.uid}/user/profile/liked`);
    if(increment) likedCollection.doc(id).set({});
    else likedCollection.doc(id).delete();
    return db.collection('blogs').doc(id).update({ likes: change });
}

export default {
    init: init,
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
        setProfile: setUserBlog,
        like: blogLike,
    },
    publish: publishAdd
}