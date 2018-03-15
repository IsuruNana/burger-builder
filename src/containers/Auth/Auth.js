import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: true,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: true,
                touched: false
            },
            
        },
        isSignUp: true
    }

    componentDidMount() {
        if(this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true
            }
        }
        
        this.setState({
            controls: updatedControls, 
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(
            this.state.controls.email.value, 
            this.state.controls.password.value,
            this.state.isSignUp
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        const formElementsArray = [];

        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                inputtype = {formElement.config.elementType} 
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />  
             
        ));

        let authRedirect = null;
        if(this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className="Auth">
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType = "Success"> SUBMIT </Button>
                </form> 
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN':'SIGN UP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps  = state => {
    return {
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, usSignUp) => dispatch(actions.auth(email, password, usSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);