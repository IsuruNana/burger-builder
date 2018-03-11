import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: ''
                    }]
                },
                value: '',
            }
        },
        name : '',
        email: ''
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({
            loading:true
        });

        const formData = {};

        for(let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            });
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const upFormEl = {
            ...updatedOrderForm[inputIdentifier]
        };
        upFormEl.value = event.target.value;
        upFormEl.valid = this.checkValidity(upFormEl.value, upFormEl.validation);
        updatedOrderForm[inputIdentifier] = upFormEl;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        
        let form = (
            <form onSubmit={this.orderHandler}> 
                {formElementsArray.map(formElement => (
                    <Input 
                        key = {formElement.id}
                        elementType = {formElement.config.elementType} 
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, identifier)}/>  
                ))}
                <Button btnType="Success" clicked={this.orderHandler}> ORDER </Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (  
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
 
export default ContactData;