/**
 * @file backend.js
 * @author ryqndev - ryan yang
 */
import {getFaves as getCloudFirebaseFaves} from '../libs/firestore';
import {add, exists} from '../libs/dexie';

const updateFaves = (uid) => {
    const recursivelyUpdate = (startAfter) => {
        getCloudFirebaseFaves(uid, 1, startAfter).then(docSnap => {
            let cursor = docSnap.docs[0];
            if(cursor === undefined) return;
            exists(cursor.id).then(found => {    
                if(found) return;
                add({id: cursor.id, ...cursor.data()});
                recursivelyUpdate(cursor);
            })
        });
    }
    recursivelyUpdate(0);
}

export default updateFaves;