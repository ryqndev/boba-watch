import { logEvent } from 'firebase/analytics';
import { analytics } from './firestore';

const onLogin = () => {
    logEvent(analytics, 'login');
}
const onPageView = (path='unknown') => {
    logEvent(analytics, 'page_view', {
        page_title: path,
        page_path: path
    });
}
const onError = (description='N/A') => {
    logEvent(analytics, 'exception', {
        description: description
    });
}

export {
    onLogin,
    onPageView,
    onError
}