import React from 'react';
import Auxilary from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import layoutClasses from './Layout.module.css';

const layout = (props) => (
    <Auxilary>
        <div> 
            <Toolbar /> 
            SideDrawer,
            Backdrop
        </div>
        <main className={layoutClasses.Content}>
            {props.children}
            {/*console.log(layoutClasses)*/}
        </main> 
    </Auxilary>
);

export default layout;