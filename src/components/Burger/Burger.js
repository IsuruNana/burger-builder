import React from 'react' ;   
import { withRouter } from 'react-router-dom';

import burgerStyles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => {
                    return <BurgerIngredient key={igKey+i} type={igKey} />
            }); //[,]
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    //console.log(transformIngredients);
    if(transformIngredients.length === 0){
        transformIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={burgerStyles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);