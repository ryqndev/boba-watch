import Swal from 'sweetalert2';
import i18next from 'i18next';
import { database, firebase } from '../libs/firestore';
import { alertDefaultError } from '../libs/swal';
import {deleteDrink, addDrink} from './calculateStatistics';

const add = async(data, uid) => {
    try{
        let firebaseAddAction = await database.collection(`users/${uid}/drinks`).add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            edited: firebase.firestore.FieldValue.serverTimestamp(),
            ...data
        });
        let firebaseReturnedResult = await firebaseAddAction.get(); //get drink + generated id
        let drink = {
            id: firebaseReturnedResult.id,
            ...firebaseReturnedResult.data().drink
        };
        return syncMetrics(drink, uid);
    }catch(err){
        return alertDefaultError(err);
    }
}

const edit = async(data, id, uid) => {
    try{
        await database.collection(`users/${uid}/drinks`).doc(id).set({
            edited: firebase.firestore.FieldValue.serverTimestamp(),
            ...data
        });
        deleteDrink(id);
        return syncMetrics({id: id, ...data.drink}, uid, true);
    }catch(err){
        return alertDefaultError(err);
    }
}

const syncMetrics = (drink, uid, isEdit=false) => {
    let metrics = addDrink(drink, drink.id);

    metrics.d = JSON.stringify(metrics.d);

    database.collection(`users/${uid}/user`).doc('stats').set(metrics).finally(() => {
        Swal.fire(i18next.t('Done!'), i18next.t(isEdit ? 'Drink updated' : 'Drink added'), 'success');
    });
}

export {
    add,
    edit,
}