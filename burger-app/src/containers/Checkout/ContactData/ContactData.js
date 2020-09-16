import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
class ContactData extends Component {
    state =  {
        name: "",
        email: "",
        address: {
            street: "",
            zipcode: ""
        }
    }
    render() {
        return (<div className={classes.ContactData}>
            <h4>Enter Contact details:</h4>
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="name"/>
                <input className={classes.Input} type="text" name="email" placeholder="email"/>
                <input className={classes.Input} type="text" name="street" placeholder="street"/>
                <input  className={classes.Input} type="text" name="zipcode" placeholder="zipcode"/>
                <Button btnType="Success">ORDER</Button>
            </form>
        </div>)
    }
}
export default ContactData;