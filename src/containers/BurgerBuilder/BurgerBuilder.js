import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelledHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {        
        this.props.history.push('/checkout');
    }
    
    render() {
        let orderSummary = null;
        let burger = this.props.error ? <p> Ingredients Cant be loaded</p> : <Spinner />

        if(this.props.ings) {
            burger = 
            (
                <Auxilary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Auxilary>
            );
            orderSummary = 
            (
                <OrderSummary 
                        ingredients={this.props.ings}
                        price = {this.props.price}
                        purchaseCancelled={this.purchaseCancelledHandler}
                        purchaseContinue={this.purchaseContinueHandler}/>
            );
        }
        return(
            <Auxilary>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

const mapStateToProps = state => {
    //console.log(state.ingredients);
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: props.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //Add an ingredient
        onIngredientAdded: (ingName) => dispatch(
            actions.addIngredient(ingName)
        ),
        //Remove an ingredient
        onIngredientRemoved: (ingName) => dispatch(
            actions.removeIngredient(ingName)
        ),
        onInitIngredients: () => dispatch(
            actions.initIngredient()
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));