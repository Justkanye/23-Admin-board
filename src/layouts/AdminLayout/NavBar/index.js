import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { useSelector } from 'react-redux';

import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';
import navLogo from '../../../assets/images/favicon.png';

const NavBar = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const { dispatch } = configContext;
    const account = useSelector((state) => state.account);

    let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', 'navbar-default'];

    let toggleClass = ['mobile-menu'];
    if (collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    const navToggleHandler = () => {
        dispatch({ type: actionType.COLLAPSE_MENU });
    };

    let collapseClass = ['collapse navbar-collapse'];

    let navBar = (
        <React.Fragment>
            <div className="m-header">
                <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={navToggleHandler}>
                    <span />
                </Link>
                <Link to="#" className="b-brand">
                    <img src={navLogo} alt="" style={{ width: 40 }} />
                    <span className="b-title">Admin Board</span>
                </Link>
            </div>
            <div className={collapseClass.join(' ')}>
                <NavLeft />
                {account.user.username && <h3 className="text-primary m-0 d-none d-lg-block">Welcome {account.user.username}</h3>}
                <NavRight />
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <header className={headerClass.join(' ')}>{navBar}</header>
        </React.Fragment>
    );
};

export default NavBar;
