import React from 'react';

import buildStyles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={buildStyles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    />
            ))
        }
        <button 
            className={buildStyles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}> 
            {props.isAuth ? "Order Now" : "Sign Up To Order" }
        </button>
    </div>
);

export default buildControls;