import { storage } from './firestore';
import { onError } from './analytics';

// sizes are configured through firebase extension in console
const getThumbnail = path => path + '_420x420';
const getOriginal = path => path + '_1280x1280';

const getImageAttribute = async (path, type = 'original') => {
    switch (type) {
        case 'thumbnail':
            try {
                return await storage.ref(getThumbnail(path)).getDownloadURL();
            } catch (error) {
                onError(error);
            }
        // fall through on error
        case 'original':
        default:
            try {
                return await storage.ref(getOriginal(path)).getDownloadURL();
            } catch (error) {
                try {
                    // if resized 1280x1280 image not found, firebase resize function
                    // likely failed so fallback on original image
                    return await storage.ref(path).getDownloadURL();
                } catch (error) {
                    onError(error);
                    return '';
                }
            }
    }
}
const checkIfResizeExists = async (path) => {
    try {
        return await storage.ref(getThumbnail(path)).getDownloadURL();
    } catch (e) {
        return e;
    }
}

const deleteImage = async (path) => {
    storage.ref(path);
    let allImageResizes = [path, getThumbnail(path), getOriginal(path)];
    return Promise.all(allImageResizes.map(path => storage.ref(path).delete()));
}

export {
    getImageAttribute,
    deleteImage,
    checkIfResizeExists,
}