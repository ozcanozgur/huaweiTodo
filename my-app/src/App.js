import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TodoList from './containers/TodoList/TodoList';
import Layout from './hoc/Layout/Layout';
import Login from './containers/User/Login/Login';
import SignUp from './containers/User/SignUp/SignUp';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
        <Switch>
            <Route path="/" exact component={TodoList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signUp" exact component={SignUp} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
