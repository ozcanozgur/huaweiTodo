import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

class CreateTodoList extends Component {

    state = {
        TodoListItemForm: {
            title: {
                elemntType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                icon : 'heading'
            },
            date: {
                elemntType: 'date',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Expire Date'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                icon : 'calendar-alt'
            },
            hour: {
                elemntType: 'hour',
                elementConfig: {
                    type: 'time',
                    placeholder: 'Hour'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                icon : 'clock'
            },
        },
        formIsvalid: false
    }

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

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedTodoListItemForm = {
            ...this.state.TodoListItemForm
        }

        const updatedFormElement = {
            ...updatedTodoListItemForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value; // set new value from form to state
        updatedFormElement.valid = this.checkValidty(updatedFormElement.value, updatedFormElement.validation); // change Validty Situation
        updatedFormElement.touched = true;
        updatedTodoListItemForm[inputIdentifier] = updatedFormElement

        let formIsValid = true;

        // eslint-disable-next-line
        for (let inputIdentifier in updatedTodoListItemForm) {
            formIsValid = updatedTodoListItemForm[inputIdentifier].valid && formIsValid;
        }

        console.log(event.target.value);

        this.setState({ TodoListItemForm: updatedTodoListItemForm, formIsvalid: formIsValid });

    }

    TodoListItemHandler = (event) => {
        event.preventDefault();
        
        const formData = {};

        // eslint-disable-next-line
        for (let formElementIdentifier in this.state.TodoListItemForm) {
            formData[formElementIdentifier] = this.state.TodoListItemForm[formElementIdentifier].value;
        }
        
        const userData = formData;

        const time = new Date(userData.date + " " + userData.hour).getTime();

        console.log(time);

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/todoList/' + 
            this.props.match.params.id + '?name=' +
            userData.title + '&deadline=' + 
            time + '&status=' + 
            true ,
          }).then(res => {
            if (res.status === 200) {
              alert('Başarılı Bir Şekilde Eklendi');
            }
            console.log(res);
          }).catch(error => {
            alert('Bir Hata Oluştu =>' + error);
            console.log(error);
          });

        //this.props.onLoginUser(userData);

        // console.log(new Date("2019-01-12 14:00 PM").getTime());

        // console.log(new Date(1547290800000));

    }

    render() {

        const fromElementArray = [];

        // eslint-disable-next-line
        for (let key in this.state.TodoListItemForm) {
            fromElementArray.push({
                id: key,
                config: this.state.TodoListItemForm[key],
            })
        }


        let form = (
            <form onSubmit={this.TodoListItemHandler}>
                {fromElementArray.map(formElement => (
                       
                    <div key={formElement.id} className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className={"fas fa-" + formElement.config.icon}  ></i></span>
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

                <Button btnType="btn float-right login_btn" clicked={this.TodoListItemHandler} disabled={!this.state.formIsvalid}> Add Item </Button>
            </form>
        );
        return (
            <div>

                <h3>{this.props.match.params.id}</h3>

                {form}

                <h3>asdasd</h3>
            </div>
        )
    }
}

export default CreateTodoList;