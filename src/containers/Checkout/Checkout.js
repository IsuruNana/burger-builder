import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: null,
        price : 0
    }

    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const loc_ingredients = {};
        let price = 0;

        for(let param of query.entries()) {
            if(param[0] === 'price') {
                console.log(param[0]);
                price = param[1];
            }
            else {
                console.log(param[0] + " " + param[1]);
                loc_ingredients[param[0]] = +param[1];
            }
        }

        console.log(loc_ingredients);
        //console.log(price);

        this.setState({
            ingredients: loc_ingredients,
            price: price
        });

        console.log(this.state.ingredients);
    }

    render() { 
        return (  
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkOutCancelledHandler}
                    onCheckoutContinued={this.checkOutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} 
                />
            </div>
        );
    }
}
 
export default Checkout;