import React, { useState } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useWindowSize from '../../../../hooks/useWindowSize';
import NavSearch from './NavSearch';

const NavLeft = () => {
    const [sortOrder, setSortOrder] = useState('Ascending');
    const changeOrder = () => {
        const newOrder = sortOrder === 'Ascending' ? 'Descending' : 'Ascending';
        setSortOrder(newOrder);
    };
    const windowSize = useWindowSize();

    let dropdownRightAlign = false;

    let navItemClass = ['nav-item'];
    if (windowSize.width <= 575) {
        navItemClass = [...navItemClass, 'd-none'];
    }

    return (
        <React.Fragment>
            <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
                <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
                    <Dropdown alignRight={dropdownRightAlign}>
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            Sort by
                        </Dropdown.Toggle>
                        <ul>
                            <Dropdown.Menu>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        Name
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item">
                                        Date
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="dropdown-item" onClick={changeOrder}>
                                        <i className={sortOrder === 'Ascending' ? 'feather icon-arrow-up' : 'feather icon-arrow-down'}></i>
                                        {sortOrder}
                                    </Link>
                                </li>
                            </Dropdown.Menu>
                        </ul>
                    </Dropdown>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
                    <NavSearch windowWidth={windowSize.width} />
                </ListGroup.Item>
            </ListGroup>
        </React.Fragment>
    );
};

export default NavLeft;
