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

export {
    onLogin,
    onPageView
}