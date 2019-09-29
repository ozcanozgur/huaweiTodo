import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

class signUp extends Component {
    state = {
        orderForm: {
            username: {
                elemntType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elemntType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elemntType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                touched: false
            },
        },
        formIsvalid: false
    }

    // userNameChangeHandler = (event) => {

    //     this.setState({ userName: event.target.value });

    //     console.log(this.state.userName);
    // }

    // pwChangeHandler = (event) => {

    //     this.setState({ password: event.target.value });

    //     console.log(this.state.password);
    // }

    checkValidty(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            // eslint-disable-next-line
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }

        console.log(isValid);

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value; // set new value from form to state
        updatedFormElement.valid = this.checkValidty(updatedFormElement.value, updatedFormElement.validation); // change Validty Situation
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true;

        // eslint-disable-next-line
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }


        this.setState({ orderForm: updatedOrderForm, formIsvalid: formIsValid });

    }

    orderHandler = (event) => {
        event.preventDefault();
    

        const formData = {};

        // eslint-disable-next-line
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        const userData = formData;

        this.props.onSignUpUser(userData);

    }

    render() {

        const fromElementArray = [];

        // eslint-disable-next-line
        for (let key in this.state.orderForm) {
            fromElementArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {fromElementArray.map(formElement => (

                    <div key={formElement.id} className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>

                        <Input
                            key={formElement.id}
                            name={formElement.id}
                            elementType={formElement.config.elemntType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={event => this.inputChangedHandler(event, formElement.id)}
                        />

                    </div>
                ))}
                
                <Button  btnType="btn float-right login_btn" clicked={this.orderHandler} disabled={!this.state.formIsvalid}> Sign Up </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className="Login">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign Up</h3>

                        </div>
                        <div className="card-body">
                            
                            {form}

                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/signUp">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onSignUpUser: (orderData) => dispatch(actions.signUpUser(orderData))
    }
}

export default  connect(null, mapDispatchToProps)(signUp);