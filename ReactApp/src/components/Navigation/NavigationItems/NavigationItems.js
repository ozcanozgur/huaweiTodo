import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

class navigationItems extends Component {

    render() {



        return (
            <ul className={classes.NavigationItems}>


                {!this.props.isAuth ?
                    [
                        <NavigationItem
                            key={0}
                            link="/login">
                            Login
                            </NavigationItem>,
                        <NavigationItem
                            key={1}
                            link="/signUp">
                            Sign Up
                            </NavigationItem>
                    ]
                    : [
                        <NavigationItem
                            key={2}
                            link="/"
                            exact>
                            Todo List
                        </NavigationItem>,
                        <NavigationItem
                            key={3}
                            clicked={this.props.onLogout}
                            link="/login">
                            Logout ({this.props.user.username})
                     </NavigationItem>
                    ]}

            </ul>
        )
    }
};



const mapStatetoProps = state => {
    return {
        user : state.user.user,
        isAuth: state.user.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.userLogout())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(navigationItems);