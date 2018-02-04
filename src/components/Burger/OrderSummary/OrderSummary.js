import React from 'react';
import Auxilary from '../../../hoc/Auxilary';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li> 
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
            <p>Continue to Checkout?</p>
        </Auxilary>
    );
};

export default orderSummary;