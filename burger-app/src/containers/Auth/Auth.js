import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }

        },
        isSignUp: true
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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
        }
        // const updatedOrderForm = {
        //     ...this.state.controls
        // };
        // const updatedFormElement = { 
        //     ...updatedOrderForm[inputIdentifier]
        // };
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        //updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        // let formIsValid = true;
        // for (let inputIdentifier in updatedOrderForm) {
        //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        // }
        this.setState({controls: updatedControls});
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
        console.log("submit");
    }

    submitAuthHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp};
        })
    }

    render() {
        let formElements = [];
        for(let key in this.state.controls) {
            formElements.push ({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form =formElements.map(each => {
                    return <Input 
                    key={each.id}
                    elementType={each.config.elementType} 
                    elementConfig={each.config.elementConfig}
                    value={each.config.value}
                    changed={(event) => this.inputChangeHandler(event, each.id)}
                    invalid={!each.config.valid}
                    shouldvalidate={each.config.validation}
                    touched={each.config.touched}></Input>
                })
            {/* <Input elementType="" elementConfig="" value=""/>
            <Input inputtype="input" type="text" name="email" placeholder="email"/>
            <Input inputtype="input" type="text" name="street" placeholder="street"/>
            <Input  inputtype="input" type="text" name="zipcode" placeholder="zipcode"/> */}
        if(this.props.loading) {
            form = <Spinner></Spinner>;
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={(event) => this.submitHandler(event)}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            <Button btnType="Danger" clicked={this.submitAuthHandler}>SUBMIT TO {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const dispatchProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,dispatchProps)(Auth);