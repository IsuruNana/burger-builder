import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index'

class Checkout extends Component {

    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() { 
        let summary = <Redirect to="/" />
        
        if(this.props.ing) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = 
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
        }

        return (  
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
 
export default connect(mapStateToProps)(Checkout);