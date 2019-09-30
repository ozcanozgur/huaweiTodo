import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import TodoList from './containers/TodoList/TodoList';
import NewTodoList from './containers/TodoList/NewTodoList/CreateTodoList';
import TodoListItem from './containers/TodoList/TodoListItems';
import Layout from './hoc/Layout/Layout';
import Login from './containers/User/Login/Login';
import SignUp from './containers/User/SignUp/SignUp';



class App extends Component {
  render() {
    return (
      <div className="App">

        {this.props.isAuth ? [
          <Layout key={0}>
            <Switch key={1}>
              <Route key={2} path="/" exact component={TodoList} />,
              <Route key={3} path="/add-todoItem/:id" exact component={NewTodoList} />,
              <Route key={4} path="/todoList/:id" exact component={TodoListItem} />,
              <Route key={5} path="/login" exact component={TodoList} />,
              <Route key={6} path="/signUp" exact component={TodoList} />
            </Switch>
          </Layout>] : [
            <Route key={0} path="/" exact component={Login} />,
            <Route key={1} path="/login" exact component={Login} />,
            <Route key={2} path="/add-todoItem/:id" exact component={Login} />,
            <Route key={3} path="/todoList/:id" exact component={Login} />,
            <Route key={4} path="/signUp" exact component={SignUp} />
          ]}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isAuth: state.user.isAuth
  }
}

export default connect(mapStatetoProps)(App);
