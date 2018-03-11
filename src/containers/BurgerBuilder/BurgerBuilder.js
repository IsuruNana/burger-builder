import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        /*axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data});
            })
            .catch(err => {
                this.setState({error: true})
            })*/
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
        let burger = this.state.error ? <p> Ingredients Cant be loaded</p> : <Spinner />

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

const mapStateToProps = state => {
    //console.log(state.ingredients);
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //Add an ingredient
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        //Remove an ingredient
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));