import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ingredientStyles from './BurgerIngredient.module.css';
import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch(this.props.type){
            case('bread-bottom'):
                ingredient = 
                <div className={ingredientStyles.BreadBottom}>
                </div>;
                break;
            case('bread-top'):
                ingredient = (
                    <div className={ingredientStyles.BreadTop}>
                        <div className={ingredientStyles.Seeds1}></div>
                        <div className={ingredientStyles.Seeds2}></div>
                    </div>
                );
                break;
            case('meat'):
                ingredient = 
                <div className={ingredientStyles.Meat}>
                </div>;
                break;
            case('cheese'):
                ingredient = 
                <div className={ingredientStyles.Cheese}>
                </div>;
                break;
            case('bacon'):
                ingredient = 
                <div className={ingredientStyles.Bacon}>
                </div>;
                break;
            case('salad'):
                ingredient = 
                <div className={ingredientStyles.Salad}>
                </div>;
                break;
            default:
                ingredient = null;
                break;
        }

        return ingredient;
    }
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;