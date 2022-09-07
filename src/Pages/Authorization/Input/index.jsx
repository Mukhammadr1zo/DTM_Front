import React from 'react';

import style from './Input.module.scss'

const Input = ({ type, name, placeholder, required = false }) => {
    return (
        <input type={type} name={name} placeholder={placeholder} className={style.input} required={required} />
    );
}

export default Input;
