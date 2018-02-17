import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}> 
                    <span style={{textTransform: 'capitalize'}}>{key}</span> : {props.ingredients[key]} 
                </li>);
        });

    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>Ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong> Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}> CANCEL </Button>
            <Button btnType="Success" clicked={props.purchaseContinue}> CONTINUE </Button>
        </Auxilary>
    );
};

export default orderSummary;