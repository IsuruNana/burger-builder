import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            cheese : 1,
            bacon: 1,
            meat: 2
        }
    }

    render() {
        return(
            <Auxilary>
                <Burger ingredients={this.render.ingredients}/>
                <div>Build Controls</div>
            </Auxilary>
        );
    }
}

export default BurgerBuilder;