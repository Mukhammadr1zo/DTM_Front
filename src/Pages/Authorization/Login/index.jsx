import React, { useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { HOST } from '../../../Constants';

import Form from '../Form';
import Input from '../Input';

import style from './Login.module.scss'

const Login = () => {
    const formRef = useRef()
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    const sendForm = (e) => {
        e.preventDefault()
        
        const form = formRef.current
        const body = JSON.stringify({
            contact: form.contact.value,
            password: form.password.value,
        })
        const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }

        fetch(`${HOST}/login`, options)
        .then(res => res.json())
        .then(res => {
            if(res.status === 201) {
                localStorage.setItem('token', JSON.stringify(res.token))
                navigate('/subject')
            } else {
                alert(res.error || res.message)
            }
        })
    }
    
    if(token) return <Navigate to={'/subject'} />

    return (
        <Form onSubmit={sendForm} formRef={formRef}>
            <h1 className={style.title}>Tizimga kirish</h1>
            <Input name='contact' type='text' placeholder='Email or phone' required={true}/>
            <Input name='password' type='password' placeholder='Password' required={true}/>
            <button type='submit' className={style.btn}>Tizimga kirish</button>
            <Link to='/register' className={style.link}>Royhatdan otish</Link>
        </Form>
    );
}

export default Login;
