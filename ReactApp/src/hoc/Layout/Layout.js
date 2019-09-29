import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render() {
        
    //     var liClasses = classNames({
    //         'main-container': true,
    //     'Content': self.state.focused === index
    //   });

      //class="container" style={{ marginTop: 72 }}

      const layoutClasses = [classes.Content,"container"];
      
        return (
            <Aux>

                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
          
                <main className={layoutClasses.join(' ')}>
                    {this.props.children}
                </main>

            </Aux >
        );
    };

};

export default Layout; 