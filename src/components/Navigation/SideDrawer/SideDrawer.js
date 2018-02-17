import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationsItems/NavigationItems';

import classes from './SideDrawer.module.css';

const sideDrawer = () => {


    return (
        <div className={classes.SideDrawer}>
            <div className={classes.Logo} >
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;