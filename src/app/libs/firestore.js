import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {alertDefaultError} from '../libs/swal';
import * as firebaseui from 'firebaseui';
import {subWeeks, subMonths} from 'date-fns';

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
    ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

database = firebase.firestore(); 
database.enablePersistence().catch(err => {console.error(err)});

const logout = () => {
    firebase.auth().signOut().then(function(){
        analytics.logEvent('logout');
        let theme = localStorage.getItem('theme');
        localStorage.clear();
        localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(alertDefaultError);      
}

window.logout = logout;

const publishGetUser = (uid, limit=5, callback) => {
    return database.collection('blogs').where('uid', '==', uid).orderBy('date', 'desc').limit(limit).onSnapshot(callback);
}
const publishGetFeed = (limit=1, orderBy='published', time='all', callback) => {
    let date = new Date();
    switch(time){
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
    if(orderBy === 'published')
        return database.collection('blogs').orderBy('published', 'desc').where('published', '>=', date).limit(limit).onSnapshot(callback);
    return database.collection('blogs').orderBy('published').where('published', '>=', date).orderBy(orderBy, 'desc').limit(limit).onSnapshot(callback);
}
const getFeed = async(limit=1, startAfter=0) => {
    return database.collection('blogs').orderBy('published').startAfter(startAfter).limit(limit).get();
}
const deleteBlogPost = async(blogid) => {
    return database.collection('blogs').doc(blogid).delete();
}
const getBlogPost = async(blogid) => {
    return database.collection('blogs').doc(blogid).get();
}
const getUserStats = (uid) => {
    return database.collection(`users/${uid}/user`).doc('stats').get();
}
const getUserBlog = async(uid) => {
    return database.collection(`users/${uid}/blog`).doc('user').get();
}
const getFaves = async(uid, limit=1, startAfter=0) => {
    return database.collection(`users/${uid}/user/profile/liked`).orderBy('liked').startAfter(startAfter).limit(limit).get();
}

const likeBlogPost = async(uid, id, data, increment) => {
    let {edited, ...post} = data;
    let blogLikeBatch = database.batch(),
        pathRef = database.collection(`users/${uid}/user/profile/liked`).doc(id),
        change = firebase.firestore.FieldValue.increment(increment ? 1 : -1);

    // increment/decrement 'like' counter
    blogLikeBatch.update(database.collection('blogs').doc(id), { likes: change });

    //save to 'liked' collection in user store
    if(increment) blogLikeBatch.set(pathRef, {liked: firebase.firestore.FieldValue.serverTimestamp(), ...post});
    else blogLikeBatch.delete(pathRef);

    return blogLikeBatch.commit();
}

export {
    ui,
    firebase,
    logout,
    database,
    analytics,
    publishGetUser,
    publishGetFeed,
    deleteBlogPost,
    getBlogPost,
    getUserStats,
    getUserBlog,
    getFaves,
    getFeed,
    likeBlogPost,
}