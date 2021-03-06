import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationsItems/NavigationItems';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilary from '../../../hoc/Auxilary/Auxilary';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    //console.log(attachedClasses);

    return (
        
        <Auxilary >
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth = {props.isAuth}/>
                </nav>
            </div>
        </Auxilary>
    );
};

export default sideDrawer;