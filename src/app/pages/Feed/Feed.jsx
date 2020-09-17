import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Route, Switch, Link, withRouter} from 'react-router-dom';
import Popular from './Popular';
import Fave from './Fave';
import {Modal} from '../../components';
import ExpandedFeedItem from './ExpandedFeedItem';
import './Feed.scss';

const Feed = ({location}) => {
    const {t} = useTranslation();
    const [expandedFeedItem, setExpandedFeedItem] = useState({show: false});
    const [popularDisplayCount, setPopularDisplayCount] = useState(3);
    return (
        <div className="feed-page">
            <div className="feed-header">
                <div className="icon"></div>
                {t("EXPLORE")}
                <Link className={location.pathname === '/feed' ? 'selected' : ''} to='/feed'>{t("PUBLIC")}</Link>
                <Link className={location.pathname === '/feed/fave' ? 'selected' : ''} to='/feed/fave'>{t("FAVES")}</Link>
            </div>
            <div className="content">
                <Switch>
                    <Route exact strict path='/feed'>
                        <Popular expand={setExpandedFeedItem} displayCount={popularDisplayCount}/>
                    </Route>
                    <Route exact strict path='/feed/fave'>
                        <Fave expand={setExpandedFeedItem} displayCount={10}/>
                    </Route>
                </Switch>
                <div className="feed-end" onClick={() => {setPopularDisplayCount(c => c + 2)}}>Show more</div>
            </div>
            <Modal open={expandedFeedItem.show} setOpen={(show) => {setExpandedFeedItem({show: show})}}>
                <ExpandedFeedItem {...expandedFeedItem}/>
            </Modal>
        </div>
    );
}

export default withRouter(Feed);
