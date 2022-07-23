import Swal from 'sweetalert2';
import i18next from 'i18next';
import { database as db } from '../libs/firestore';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import {
	alertDefaultError,
	alertDrinkDeletedSuccess,
	alertDrinkNotDeleted,
} from '../libs/swal';
import { deleteDrink, addDrink } from './calculateStatistics';

const add = async (data, uid) => {
	try {
		let addedDrinkRef = await addDoc(
			collection(db, `users/${uid}/drinks`),
			{
				created: serverTimestamp(),
				edited: serverTimestamp(),
				...data,
			}
		);
		const drink = (await getDoc(addedDrinkRef)).data();

		return syncMetrics(
			{
				id: addedDrinkRef.id,
				...drink.drink,
				edited: drink?.edited,
				created: drink?.created,
			},
			uid
		);
	} catch (err) {
		return alertDefaultError(err);
	}
};

const edit = async (data, id, uid) => {
	try {
		await setDoc(doc(db, `users/${uid}/drinks/${id}`), {
			edited: serverTimestamp(),
			...data,
		});
		deleteDrink(id);
		return syncMetrics({ id: id, ...data.drink }, uid, true);
	} catch (err) {
		return alertDefaultError(err);
	}
};
const remove = (id, uid, callback = () => {}) => {
	try {
		deleteDoc(doc(db, `users/${uid}/drinks/${id}`))
			.then(() => {
				let metrics = deleteDrink(id);
				metrics.d = JSON.stringify(metrics.d);
				setDoc(doc(db, `users/${uid}/user/stats`)).finally(() => {
					alertDrinkDeletedSuccess();
					callback();
				});
			})
			.catch(err => {
				alertDrinkNotDeleted(err);
			});
	} catch (err) {
		return alertDefaultError(err);
	}
};

const updateAutofill = (data, uid, callback = () => {}) => {
	try {
		setDoc(doc(db, `users/${uid}/user/autofill`), {
			data: JSON.stringify(data),
		})
			.then(() => {
				localStorage.setItem('autofill', JSON.stringify(data));
				callback();
			})
			.catch(err => {
				alertDefaultError(err);
			});
	} catch (err) {
		return alertDefaultError(err);
	}
};

const syncMetrics = (drink, uid, isEdit = false) => {
	let metrics = addDrink(drink, drink.id);

	metrics.d = JSON.stringify(metrics.d);

	setDoc(doc(db, `users/${uid}/user/stats`), metrics).finally(() => {
		Swal.fire(
			i18next.t('Done!'),
			i18next.t(isEdit ? 'Drink updated' : 'Drink added'),
			'success'
		);
	});
};

export { add, edit, remove, updateAutofill };
