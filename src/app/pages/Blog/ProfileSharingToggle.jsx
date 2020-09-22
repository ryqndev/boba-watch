import React, {useContext} from 'react';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import {TextClipboard, Collapse} from '../../components';
import {database} from '../../libs/firestore';
import {useTranslation} from 'react-i18next';
import Toggle from 'react-toggle';

const ProfileSharingToggle = () => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const {t} = useTranslation();

    const toggleProfileSharing = () => {
        let data = authUser.profile;
        database.doc(`users/${authUser.uid}/user/profile`).set({...data, sharing: !data.sharing}).then(() => {
            setAuthUser(state => ({...state, profile: {...state.profile, sharing: !state.profile.sharing}}));
        })
    }
    
    return (
        <div className="user-share ">
            <div className="user-share-profile">
                {t('make profile public')}: 
                <Toggle
                    defaultChecked={authUser.profile.sharing}
                    onClick={toggleProfileSharing}
                    label={t('make profile public')}
                />
                <Collapse className="user-share-toggle-grid" open={authUser.profile.sharing}>
                    <TextClipboard
                        text={`https://share.boba.watch/#/${authUser.uid}`}
                    />
                </Collapse> 
            </div>
        </div>
    )
}

export default ProfileSharingToggle;
