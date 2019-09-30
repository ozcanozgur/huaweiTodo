import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect} from "react-router-dom";
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';

import './TodoList.module.css';

class TodoList extends Component {

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
          required: true,
          maxLength: 50,
          minLength: 5
        },
        valid: false,
        touched: false,
        icon: 'heading'
      }
    },
    Lists: null,
    loading: false,
    updateKey: 0,
    redirect: false,
    redirectPath: null
  };

  setRedirect = (id,redirectPath) => {
    this.setState({
      redirect: id,
      redirectPath : redirectPath
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {

      if(this.state.redirectPath === "addItem")
      return (<Redirect to={{
        pathname: '/add-todoItem/' + this.state.redirect
      }}
      />)
      if(this.state.redirectPath === "displayList")
      return (<Redirect to={{
        pathname: '/todoList/' + this.state.redirect
      }}
      />)
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/todoLists')
      .then(res => {
        if (res.status === 200)
          this.setState({ Lists: res.data });
        console.log(this.state.Lists);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.updateKey === 1) {
      axios.get('http://localhost:8080/api/todoLists')
        .then(res => {
          this.setState({ updateKey: 0 });
          this.setState({ Lists: res.data });
          console.log("updated");
        })
        .catch(error => {
          console.log(error);
        });
    }
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

    this.setState({ TodoListItemForm: updatedTodoListItemForm, formIsvalid: formIsValid });
  }

  AddListHandler = (event) => {

    event.preventDefault();

    const formData = {};

    // eslint-disable-next-line
    for (let formElementIdentifier in this.state.TodoListItemForm) {
      formData[formElementIdentifier] = this.state.TodoListItemForm[formElementIdentifier].value;
    }

    const userData = formData;

    axios({
      method: 'post',
      url: 'http://localhost:8080/api/' + this.props.user.id + '/todoLists',
      params: userData
    }).then(res => {
      if (res.status === 200) {
        alert('Başarılı Bir Şekilde Eklendi');
      }
      console.log(res);
      this.setState({ updateKey: 1 });
    }).catch(error => {
      alert('Bir Hata Oluştu =>' + error);
      console.log(error);
    });
  }

  addItemHandler = (event, listId) => {
    event.preventDefault();
    this.setRedirect(listId,"addItem");
  }

  displayListHandler = (event, listId) => {
    event.preventDefault();
    this.setRedirect(listId,"displayList");
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
            <div className="input-group-append">
              <Button btnType="btn btn-warning" clicked={this.AddListHandler} disabled={!this.state.formIsvalid}> Add Todo List </Button>
            </div>
          </div>
        ))}
      </form>
    );

    let list = <Spinner />;

    if (this.state.Lists) {
      list = (
        <ul className="list-group">
          {this.state.Lists.map(item => {

            if (item.user.id === this.props.user.id) {
              return (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.title}
                  <Button clicked={(event) => this.addItemHandler(event, item.id,)} style={{ marginLeft: "auto" }} btnType="btn btn-outline-secondary"> Add Item </Button>
                  <Button clicked={(event) => this.displayListHandler(event, item.id,)} btnType="btn btn-outline-success"> Display list </Button>
                  <Button btnType="btn btn-outline-danger"> Delete </Button>
                  
                </li>
                )
            }
            return null;
          })}
        </ul>
      );
    }

    return (

      <div className="header">

        {this.renderRedirect()}

        {form}

        {list}
      </div>

    )
  }
}

const mapStatetoProps = state => {
  return {
    user: state.user.user,
    isAuth: state.user.isAuth
  }
}

export default connect(mapStatetoProps)(TodoList);