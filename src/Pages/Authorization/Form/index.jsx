import React from 'react';

import style from './Form.module.scss'

const Form = ({children, onSubmit, formRef}) => {
    return (
        <form className={style.form} onSubmit={onSubmit} ref={formRef}>
            {
                children
            }
        </form>
    );
}

export default Form;
