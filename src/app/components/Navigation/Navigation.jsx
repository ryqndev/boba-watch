import React, {useState, useEffect, useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ExploreIcon from '@material-ui/icons/ExploreRounded';
import DashboardIcon from '@material-ui/icons/HomeRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import HistoryIcon from '@material-ui/icons/AttachMoneyRounded';
import PublicIcon from '@material-ui/icons/FaceRounded';
import {onPageView} from '../../libs/analytics';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import './Navigation.scss';

const Navigation = ({history}) => {
    const [tab, setTab] = useState(history.location.pathname);
    const isTab = path => (path === tab ? ' selected' : '');
    const [authUser] = useContext(AuthUserContext);
    useEffect(() => {
        let path = history.location.pathname;
        setTab(path);
        onPageView(path);
    }, [history.location.pathname]);
    return (
        <nav>
            <Link to='/'>
                <div className={'icon' + isTab('/')}>
                    <DashboardIcon />
                    <p className="label">home</p>
                </div>
            </Link>
            <Link to='/history'>
                <div className={'icon' + isTab('/history')}>
                    <HistoryIcon />
                    <p className="label">history</p>
                </div>
            </Link>
            <Link to='/add'>
                <div className={'add-icon' + isTab('/add')}>
                    <AddIcon style={{ fontSize: 50 }}/>
                </div>
            </Link>
            <Link to='/feed'>
                <div className={'icon' + isTab('/feed')}>
                    <ExploreIcon />
                    <p className="label">feed</p>
                </div>
            </Link>
            <Link to={'/blog/' + authUser.uid}>
                <div className={'icon' + isTab('/blog/' + authUser.uid)}>
                    <PublicIcon />
                    <p className="label">blog</p>
                </div>
            </Link>
        </nav>
    );
}

export default withRouter(Navigation);
