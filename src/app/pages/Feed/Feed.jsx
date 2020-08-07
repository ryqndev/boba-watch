import React from 'react';
import {useTranslation} from 'react-i18next';
import {MemoryRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import Popular from './Popular';
import Fave from './Fave';
import './Feed.scss';

const Feed = ({location}) => {
    const {t} = useTranslation();
    return (
        <div className="feed-page">
            <div className="feed-header">
                <div className="icon"></div>
                {t("EXPLORE")}
                <Link className={location.pathname === '/popular' ? 'selected' : ''} to='/popular'>{t("PUBLIC")}</Link>
                <Link className={location.pathname === '/fave' ? 'selected' : ''} to='/fave'>{t("FAVES")}</Link>
            </div>
            <div className="content">
                    <Switch>
                        <Route exact path='/popular'>
                            <Popular />
                        </Route>
                        <Route exact path='/fave'>
                            <Fave />
                        </Route>
                    </Switch>
                <div className="feed-end">No more posts to show.</div>
            </div>
        </div>
    );
}

export default withRouter(Feed);
