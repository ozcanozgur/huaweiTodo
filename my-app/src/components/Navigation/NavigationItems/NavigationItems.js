import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

class navigationItems extends Component {

    render() {

       

        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Todo List</NavigationItem>

                { !this.props.isAuth ?
                    [
                        <NavigationItem key={0} link="/login">Login</NavigationItem>,
                        <NavigationItem key={1} link="/signUp">Sign Up</NavigationItem>
                    ]
                    :   <NavigationItem style={{marginLeft : "auto"}} key={2} clicked={this.props.onLogout} link="/signUp">Logout</NavigationItem>}
            
            </ul>
        )
    }
};



const mapStatetoProps = state => {
    return {
        isAuth: state.user.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.userLogout())
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(navigationItems);