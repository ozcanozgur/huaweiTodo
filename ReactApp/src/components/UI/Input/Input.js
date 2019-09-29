import React from 'react';

import classes from './Input.module.css';

import Aux from '../../../hoc/Aux/Aux';

const input = (props) => {

    let inputElement = null;
    // eslint-disable-next-line
    let validationError = null;

    const inputClasses = [];

    inputClasses.push("form-control");

    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.name}!</p>;
    }

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
    }


    return (
        <Aux>
            {inputElement}
        </Aux>
    );
}
export default input;