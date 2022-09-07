import React from 'react';

import style from './Radio.module.scss'

const Radio = ({ name, value, text, chekced = false }) => {
    return (
        <label className={style.radio}>
            <input type="radio" name={name} value={value} defaultChecked={chekced} />
            {text}
        </label>
    );
}

export default Radio;