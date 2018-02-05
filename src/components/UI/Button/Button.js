import React from 'react';

const button = (props) => (
    <button
    className={[classes.Button, classes[props.btnType]]}
    onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;