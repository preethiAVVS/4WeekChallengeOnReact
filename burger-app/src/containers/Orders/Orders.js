import React, {Component} from "react";
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        this.props.onFetchOrders();
        // axios.get("/orders.json").then(response => {
        //     const fetchedorders = [];
        //     for(let key in response.data) {
        //         fetchedorders.push({
        //             ...response.data[key],
        //             id: key
        //         })
        //     }
        //     console.log(fetchedorders);
        //     this.setState({orders: fetchedorders, loading: false})
        // }).catch(error => {
        //     this.setState({loading: false})
        // })
    }
    render() {        
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return (
            <div>
                {orders}
            </div>
        );
        // return(<div>
        //     {this.state.orders.map(order=> {
        //         return <Order key={order.id}
        //         ingredients={order.ingredients}
        //         price={order.price}></Order>
        //     })}
        // </div>);
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch( actions.fetchOrders() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );