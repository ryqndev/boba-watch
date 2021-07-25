import Swal from 'sweetalert2';
import i18next from 'i18next';
import {onError} from './analytics';

const supportContact = 'ryanqyang@gmail.com';

/**
 * error messages
 */
const alertInvalidNumberInput = () => {
    Swal.fire(i18next.t('Oops...'), i18next.t('Please enter valid numbers'), 'error');
}
const alertInvalidDrinkPrice = () => {
    Swal.fire(i18next.t('Oops...'), i18next.t('Please enter a valid price to add drink'), 'error');
}
const alertEmptyDrinkName = () => {
    Swal.fire(i18next.t('Can\'t save drink without name'), i18next.t('Please add a name to save to the autofill list'), 'error');
}
const alertDrinkNotDeleted = (error) => {
    onError(error);
    console.log(`Please copy this error and send to ${supportContact}`, error);
    Swal.fire(i18next.t('Oops...'), i18next.t('Couldn\'t delete your drink. Try again later!'), 'error');
}
const alertDefaultError = (error) => {
    onError(error);
    console.log(`Please copy this error and send to ${supportContact}`, error);
    Swal.fire(i18next.t('Oops...'), JSON.stringify(error), 'error');
}

const alertLinkCopiedSuccess = () => {
    Swal.fire(i18next.t('Link Copied!'), i18next.t(''), 'success');
}
const alertSettingsUpdateSuccess = () => {
    
    Swal.fire(i18next.t('Success!'), i18next.t('Your settings have been updated'), 'success');
}
const alertAutofillAdd = () => {
    Swal.fire(i18next.t('Saved!'), i18next.t('You can now autofill your next purchase with these drink details.'), 'success');
}
const alertAutofillDelete = () => {
    Swal.fire(i18next.t('Deleted!'), i18next.t('Deleted this saved entry.'), 'success');
}
const alertDrinkDeletedSuccess = () => {
    Swal.fire(i18next.t('Deleted!'), i18next.t('Drink has been deleted'), 'success'); 
}
const alertBlogPostDeletedSuccess = () => {
    Swal.fire(i18next.t('Deleted!'), i18next.t('Your post has been deleted.'), 'success');
}
const alertBioUpdateSuccess = () => {
    Swal.fire(i18next.t('Done!'), i18next.t('Your bio has been updated.'), 'success');
}
const alertLocationUpdateSuccess = () => {
    Swal.fire(i18next.t('Done!'), i18next.t('Your public location has been changed.'), 'success');
}
const alertPublishSuccess = () => {
    Swal.fire(i18next.t('Success!'), i18next.t('Drink published on your blog!'), 'success');
}
const alertRestriction = (date) => {
    Swal.fire(i18next.t('Oh no!'), i18next.t('You can\'t publish a new post until ') + date +  i18next.t('. If the time restriction is greater than 1 minute, you have likely been temporarily banned from posting.'), 'error');
}

/**
 * prompt messages
 */

const promptBioUpdate = async() => {
    return Swal.fire({
        title: i18next.t('Edit bio'),
        input: 'textarea',
        inputPlaceholder: i18next.t('About me...'),
        inputAttributes: {
            maxLength: 350
        }
    });
}
const promptLocationUpdate = async() => {
    return Swal.fire({
        title: i18next.t('Change location'),
        input: 'text',
        inputPlaceholder: i18next.t('Where I am now...'),
        inputAttributes: {
            maxLength: 20
        }
    });
}

const confirmDownloadData = async() => {
    return Swal.fire({
        title: i18next.t('Download Data'),
        text: i18next.t("Would you like to download all your drink data? (in JSON format)"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: i18next.t('Yes, download ALL of it!'),
    });
}

/**
 * confirm messages
 */
const confirmDelete = async() => {
    return Swal.fire({
        title: i18next.t('Are you sure?'),
        text: i18next.t("Once you delete this you can't get it back!"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: i18next.t('Yes, delete it!'),
    });
}

export {
    alertInvalidNumberInput,
    alertInvalidDrinkPrice,
    alertEmptyDrinkName,
    alertDrinkNotDeleted,
    alertDefaultError,

    alertLinkCopiedSuccess,
    alertSettingsUpdateSuccess,
    alertAutofillAdd,
    alertAutofillDelete,
    alertDrinkDeletedSuccess,
    alertBlogPostDeletedSuccess,
    alertBioUpdateSuccess,
    alertLocationUpdateSuccess,
    alertPublishSuccess,

    alertRestriction,

    promptBioUpdate,
    promptLocationUpdate,

    confirmDelete,
    confirmDownloadData,
}