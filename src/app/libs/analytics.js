import {analytics} from './firestore';

const onLogin = () => {
    analytics.logEvent('login');
}
const onPageView = (path='unknown') => {
    analytics.logEvent('page_view', {
        page_title: path,
        page_path: path
    });
}
const onError = (description='N/A') => {
    analytics.logEvent('exception', {
        description: description
    });
}

export {
    onLogin,
    onPageView,
    onError
}