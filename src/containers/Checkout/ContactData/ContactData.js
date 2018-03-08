import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name : '',
        email: ''
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({
            loading:true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Issa N',
                address: {
                    street: 'Test Street',
                    zipCode: '1234',
                    country: 'Deutchland'
                },
                email: 'test@test.com'
            },
            deliveryMethod:'fastest'
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


    render() { 
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="text" name="email" placeholder="Your Email" />
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