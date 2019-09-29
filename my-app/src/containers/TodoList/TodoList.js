import React, { Component } from 'react'
import {connect} from 'react-redux';

import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';

import './TodoList.module.css';

class TodoList extends Component {

  componentDidMount() {
    // axios.get('Access-Control-Allow-Origin :http://localhost:8080/api/employees/2',{ data: { id: "2" } })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    axios.get('http://localhost:8080/api/employees')
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });

      
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3],
    };
  }

  

  render() {
    console.log(this.props.isAuth);
    return (

      <div className="header">

        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Recipient's username"
            aria-label="Recipient's username" aria-describedby="button-addon2" />
          <div className="input-group-append">
            <Button btnType="btn btn-outline-secondary"> Add Task </Button>
          </div>
        </div>

        <ul className="list-group">

          {this.state.list.map(item => (
            <li key={item} className="list-group-item d-flex justify-content-between align-items-center">Cras justo odio{item}
              <Button style={{ marginLeft: "auto" }} btnType="btn btn-outline-secondary"> Add Task </Button>
              <Button btnType="btn btn-outline-danger"> Delete </Button>
            </li>
          ))}
        </ul>

      </div>

    )
  }
}

const mapStatetoProps = state => {
  return {
      user : state.user.user,
      isAuth : state.user.isAuth
  }
}

export default connect(mapStatetoProps)(TodoList);