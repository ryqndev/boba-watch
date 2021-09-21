import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';
import { alertDefaultError } from '../libs/swal';
import * as firebaseui from 'firebaseui';
import { subWeeks, subMonths } from 'date-fns';

const firebaseConfig = {
    apiKey: "AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ",
    authDomain: "boba-watch-firebase.firebaseapp.com",
    databaseURL: "https://boba-watch-firebase.firebaseio.com",
    projectId: "boba-watch-firebase",
    storageBucket: "boba-watch-firebase.appspot.com",
    messagingSenderId: "674375234614",
    appId: "1:674375234614:web:fdaf98c291204b9c",
    measurementId: "G-C2DYVHCWDR"
};
firebase.initializeApp(firebaseConfig);

let database,
    analytics = firebase.analytics(),
    storage = firebase.storage(),
    ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

database = firebase.firestore();
// database.enablePersistence().catch(err => { console.error(err) });

const logout = () => {
    firebase.auth().signOut().then(function () {
        analytics.logEvent('logout');
        let theme = localStorage.getItem('theme');
        let lang = localStorage.getItem('i18n');
        localStorage.clear();
        localStorage.setItem('theme', theme);
        localStorage.setItem('i18n', lang);
    }).catch(alertDefaultError);
}

const publishGetUser = (uid, limit = 5, callback) => {
    return database.collection('blogs').where('uid', '==', uid).orderBy('date', 'desc').limit(limit).onSnapshot(callback);
}
const publishGetFeed = (limit = 1, orderBy = 'published', time = 'all', callback) => {
    let date = new Date();
    switch (time) {
        case 'week':
            date = subWeeks(date, 1);
            break;
        case 'month':
            date = subMonths(date, 1);
            break;
        case 'all':
        default:
            date = new Date(0);
            break;
    }
    date = firebase.firestore.Timestamp.fromDate(date);
    if (orderBy === 'published')
        return database.collection('blogs').orderBy('published', 'desc').where('published', '>=', date).limit(limit).onSnapshot(callback);
    return database.collection('blogs').orderBy('published').where('published', '>=', date).orderBy(orderBy, 'desc').limit(limit).onSnapshot(callback);
}
const getFeed = async (limit = 1, startAfter = 0) => {
    return database.collection('blogs').orderBy('published').startAfter(startAfter).limit(limit).get();
}
const deleteBlogPost = async (blogid) => {
    return database.collection('blogs').doc(blogid).delete();
}
const getBlogPost = async (blogid) => {
    return database.collection('blogs').doc(blogid).get();
}
const getUserStats = (uid) => {
    return database.collection(`users/${uid}/user`).doc('stats').get();
}
const getUserBlog = async (uid) => {
    return database.collection(`users/${uid}/blog`).doc('user').get();
}


export {
    ui,
    firebase,
    logout,
    database,
    storage,
    analytics,
    publishGetUser,
    publishGetFeed,
    deleteBlogPost,
    getBlogPost,
    getUserStats,
    getUserBlog,
    getFeed,
}
