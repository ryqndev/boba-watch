import { firebase, database as db } from '../libs/firestore';
import { onLogin as logLoginToAnalytics } from '../libs/analytics';
import { profile as defaultProfile, metrics as defaultStats } from '../defaults';
import { getDefaultMetrics, recalculateMetrics } from './calculateStatistics';

const init = (callback) => {
    firebase.auth().onAuthStateChanged(user => {
        // if not logged in, do nothing.
        if (!user) return callback(user);

        logLoginToAnalytics();

        user = ((
            { displayName, metadata, photoURL, email, emailVerified, uid, isAnonymous, providerData }) => (
            { displayName, metadata, photoURL, email, emailVerified, uid, isAnonymous, providerData }))(user);

        // check if has been logged in before
        const isNewUser = user?.metadata?.creationTime === user?.metadata?.lastSignInTime;

        // setup user if not logged in before, otherwise update
        if (isNewUser) return newUserSetup(user, callback);

        const drinkids = localStorage.getItem('drinkids');
        if (!drinkids) return newSignInLocation(user, callback);

        syncUserData(user, callback);
    });
}

const newUserSetup = (user, callback) => {
    localStorage.setItem('autofill', '[]');
    localStorage.setItem('drinkids', '[]');
    localStorage.setItem('metrics', JSON.stringify(getDefaultMetrics()));

    user.profile = { ...defaultProfile };

    let setupBatch = db.batch();
    setupBatch.set(db.collection(`users/${user.uid}/user`).doc('stats'), defaultStats);
    setupBatch.set(db.collection(`users/${user.uid}/blog`).doc('user'), {
        name: user?.displayName,
        profile: user?.photoURL
    }, { merge: true });
    setupBatch.set(db.collection(`users/${user.uid}/user`).doc('profile'), defaultProfile);
    return setupBatch.commit().then(() => {
        callback(user);
    });
}

const newSignInLocation = (user, callback) => {
    Promise.all(
        [
            db.collection(`users/${user.uid}/user`).doc('autofill').get(),
            db.collection(`users/${user.uid}/user`).doc('profile').get(),
            db.collection(`users/${user.uid}/drinks`).orderBy('drink.date', 'desc').get()
        ]
    ).then(([autofill, profile, drinks]) => {
        let drinkids = [];

        drinks.forEach(entry => {
            const data = entry.data();
            localStorage.setItem(entry.id, JSON.stringify({ id: entry.id, ...data.drink, edited: data?.edited, created: data?.created }));
            drinkids.push(entry.id);
        });

        localStorage.setItem('autofill', autofill?.data()?.data ?? '[]');
        localStorage.setItem('drinkids', JSON.stringify(drinkids));
        recalculateMetrics();

        user.profile = { sharing: profile?.sharing ?? profile?.public ?? false, ...profile.data() };

        db.collection(`users/${user.uid}/blog`).doc('user').set({
            name: user?.displayName,
            profile: user?.photoURL
        }, { merge: true }).finally(() => {
            callback(user);
        });
    });
}

const syncUserData = (user, callback) => {
    Promise.all(
        [
            db.collection(`users/${user.uid}/user`).doc('autofill').get(),
            db.collection(`users/${user.uid}/user`).doc('profile').get(),
        ]
    ).then(([autofill, profile]) => {
        recalculateMetrics();
        localStorage.setItem('autofill', autofill?.data()?.data ?? '[]');
        user.profile = { sharing: profile?.sharing ?? profile?.public ?? false, ...profile.data() };
        callback(user);
    });
}

export default init;