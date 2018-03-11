import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() { 
        return (  
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    onCheckoutCancelled={this.checkOutCancelledHandler}
                    onCheckoutContinued={this.checkOutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        ings: state.ingredients
    }
}
 
export default connect(mapStateToProps)(Checkout);