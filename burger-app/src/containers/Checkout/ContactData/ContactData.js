import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
    state =  {
        name: "",
        email: "",
        address: {
            street: "",
            zipcode: ""
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const post = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "PREETHI",
                address: {
                    street: "Chinna market",
                    zipcode: "533002",
                    country: "india"
                },
                email: "test@test.com"
            },
            deliverymethod: "fastest"
        }
        axios.post("/orders.json", post).then(response => {
            this.setState({
                loading: false
            });
            this.props.history.push("/");
        }).catch(error => {
            this.setState({ loading: false });
        });

    }
    render() {
        let form =(
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="name"/>
            <input className={classes.Input} type="text" name="email" placeholder="email"/>
            <input className={classes.Input} type="text" name="street" placeholder="street"/>
            <input  className={classes.Input} type="text" name="zipcode" placeholder="zipcode"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        )
        if (this.state.loading) {
            form =<Spinner></Spinner>;
        }
        return (<div className={classes.ContactData}>
            <h4>Enter Contact details:</h4>
           {form}
        </div>)
    }
}
export default ContactData;