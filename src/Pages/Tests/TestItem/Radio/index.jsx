import React, { useRef } from 'react';

import style from './Radio.module.scss'

const Index = ({ name, variant, value, correct_value }) => {
    const labelRef = useRef()

    const handleChange = (e) => {
        const form = document.forms.test
        form[name].forEach(input => input.disabled = true)
        labelRef.current.classList.add(correct_value === value ? style.correct : style.error)
    }

    return (
        <label className={style.radio} ref={labelRef}>
            <input type="radio" value={value} name={name} onChange={handleChange} />
            {variant}
        </label>
    );
}

export default Index;
