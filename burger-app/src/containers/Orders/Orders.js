import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get("/orders.json").then(response => {
            const fetchedorders = [];
            for(let key in response.data) {
                fetchedorders.push({
                    ...response.data[key],
                    id: key
                })
            }
            console.log(fetchedorders);
            this.setState({orders: fetchedorders, loading: false})
        }).catch(error => {
            this.setState({loading: false})
        })
    }
    render() {
        return(<div>
            {this.state.orders.map(order=> {
                return <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}></Order>
            })}
        </div>);
    }
}
export default Orders;