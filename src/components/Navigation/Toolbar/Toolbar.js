import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationsItems/NavigationItems';

const toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <div> MENU </div>
            <Logo />
            <NavigationItems />
        </header>
    );
};

export default toolbar;