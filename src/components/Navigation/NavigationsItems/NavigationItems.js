import React from 'react';

import classes from './NavigationItems.module.css'; 
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className = {classes.NavigationItems} >
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            {
                props.isAuth
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null
            }
            {
                !props.isAuth 
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">LogOut</NavigationItem>
            }
        </ul>
    );
};

export default navigationItems;