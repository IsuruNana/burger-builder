import React, {Component} from 'react';
import Auxilary from '../Auxilary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import layoutClasses from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    render() {
        return (
            <Auxilary>
                <div> 
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/> 
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={layoutClasses.Content}>
                    {this.props.children}
                    {/*console.log(layoutClasses)*/}
                </main> 
            </Auxilary>
        );
    }
}

export default Layout;