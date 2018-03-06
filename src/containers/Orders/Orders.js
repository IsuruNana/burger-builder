import React , { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                this.setState({
                    loading: false
                });

                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
            })
            .catch(err => {

            });
    }

    state = {}
    render() { 
        return (  
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}
 
export default Orders;