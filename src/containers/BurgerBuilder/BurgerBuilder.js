import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data});
            })
            .catch(err => {
                this.setState({error: true})
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let updatedCount = 0;
        let newPrice = this.state.totalPrice;

        if(this.state.ingredients[type] > 0){
            updatedCount = this.state.ingredients[type] - 1;
            const priceAddition = INGREDIENT_PRICES[type];
            newPrice = this.state.totalPrice - priceAddition;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelledHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        //alert('You Continued!');

        const queryParams = [];

        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        
        this.props.history.push({
            pathname: './checkout',
            search: queryString
        });

    }
    

    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p> Ingredients Cant be loaded</p> : <Spinner />

        if(this.state.ingredients) {
            burger = 
            (
                <Auxilary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        purchasable = {this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Auxilary>
            );
            orderSummary = 
            (
                <OrderSummary 
                        ingredients={this.state.ingredients}
                        price = {this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelledHandler}
                        purchaseContinue={this.purchaseContinueHandler}/>
            );
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);