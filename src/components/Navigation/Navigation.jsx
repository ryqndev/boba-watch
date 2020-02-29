import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/HomeRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import HistoryIcon from '@material-ui/icons/AttachMoneyRounded';
import './Navigation.scss';

const Navigation = ({toggleAdd, history}) => {
    const [tab, setTab] = useState(history.location.pathname);

    useEffect(() => {
        setTab(history.location.pathname);
    }, [history.location.pathname]);

    return (
        <nav>
            <Link to='/dash'>
                <div className={'icon' + () }>
                    <DashboardIcon />
                </div>
            </Link>
            <div onClick={toggleAdd}>
                <div className="center-fab">
                    <AddIcon style={{ fontSize: 50 }}/>
                </div>
            </div>
            <Link to='/history'>
                <div className="icon">
                    <HistoryIcon />
                </div>
            </Link>
        </nav>
    );
}
/* <BottomNavigation value={value} onChange={handleChange} className="bottom-nav">
<BottomNavigationAction
    label="Dashboard"
    value="dash"
    component={Link}
    to="/dash"
    icon={<DashboardIcon />}
/>
<BottomNavigationAction
    value="add"
    disableRipple={true}
    onClick={toggleAdd}
    // onClose={this.refocus}
    icon={<div className="center-fab">< AddIcon style={{ fontSize: 50 }}/></div>}
/>
<BottomNavigationAction
    label="Spending"
    value="history"
    component={Link}
    to="/history"
    icon={<HistoryIcon />}
/>
</BottomNavigation> */

export default withRouter(Navigation);
