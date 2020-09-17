import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
    state =  {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your name"
                    },
                    value: "",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your street"
                    },
                    value: "",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your zipcode"
                    },
                    value: "",
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your country"
                    },
                    value: "",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your email"
                    },
                    value: "",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
            deliverymethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest Mode"},
                        {value: "cheapest", displayValue: "Cheapest Mode"}
                    ]
                },
                value: "",
                validation:{},
                valid: true
            }
        },
        formValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(!rules) {
            return true;
        }
        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderForm = {};
        for(let key in this.state.orderForm) {
            orderForm[key] = this.state.orderForm[key].value;
        }
        const post = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: orderForm
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

    inputChangeHandler = (event, formid) => {
        const updatedForm = {...this.state.orderForm};
        const updatedElement = updatedForm[formid];
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched=true;
        updatedForm[formid] = updatedElement;
        let formvalid = true;
        for(let key in updatedForm) {
            formvalid = updatedForm[key].valid && formvalid
        }
        this.setState({orderForm: updatedForm, formValid: formvalid});
    }
    render() {
        let formElements = [];
        for(let key in this.state.orderForm) {
            formElements.push ({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                {formElements.map(each => {
                    return <Input 
                    key={each.id}
                    elementType={each.config.elementType} 
                    elementConfig={each.config.elementConfig}
                    value={each.config.value}
                    changed={(event) => this.inputChangeHandler(event, each.id)}
                    invalid={!each.config.valid}
                    shouldvalidate={each.config.validation}
                    touched={each.config.touched}></Input>
                })}
            {/* <Input elementType="" elementConfig="" value=""/>
            <Input inputtype="input" type="text" name="email" placeholder="email"/>
            <Input inputtype="input" type="text" name="street" placeholder="street"/>
            <Input  inputtype="input" type="text" name="zipcode" placeholder="zipcode"/> */}
            <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
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