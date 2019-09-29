import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li onClick={props.clicked} className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
            onClick={props.clicked}
            style={props.style}
        >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;