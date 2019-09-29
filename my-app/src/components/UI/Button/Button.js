import React from 'react';

import classes from './Button.module.css';

const button = (props) => {

    return (
        <button
            style={props.style}
            className={[classes.Button, props.btnType].join(' ')}
            onClick={props.clicked} disabled={props.disabled}>{props.children} </button>
    )
};

export default button;