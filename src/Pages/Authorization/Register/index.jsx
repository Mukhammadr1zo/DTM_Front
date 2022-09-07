import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'

import Form from '../Form';
import Input from '../Input';
import Radio from '../Radio';
import Select from '../../../Components/Select';
import { HOST } from '../../../Constants';

import style from './Register.module.scss'

const Register = () => {
    const formRef = useRef()
    const navigate = useNavigate()
    const [regions, setRegions] = useState([])
    const token = JSON.parse(localStorage.getItem('token'))

    const sendForm = (e) => {
        e.preventDefault()

        const form = formRef.current
        const body = JSON.stringify({
            fullname: form.fullname.value,
            contact: form.contact.value,
            region_id: form.region.value,
            password: form.password.value,
            gender: form.gender.value
        })
        const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }

        fetch(`${HOST}/register`, options)
            .then(res => res.json())
            .then(res => {
                console.log(res.status);
                if (res.status === 201) {
                    localStorage.setItem('token', JSON.stringify(res.token))
                    navigate('/subject')
                } else {
                    alert(res.error || res.message)
                }
            })
    }

    useEffect(() => {
        fetch(`${HOST}/regions`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) setRegions(res.data)
                else alert(res.message || res.error)
            })
    }, [token])

    if (token) return <Navigate to={'/subject'} />

    return (
        <Form onSubmit={sendForm} formRef={formRef}>
            <h1 className={style.title}>Royhatdan otish</h1>
            <Input name='fullname' type='text' placeholder='Full name' required={true} />
            <Input name='contact' type='text' placeholder='Email or phone' required={true} />
            <Select name='region' arr={regions} id='region_id' value='region_id' text='region_name' className={style.select} />
            <Input name='password' type='password' placeholder='Password' required={true} />
            <Radio name="gender" value='male' text='Erkak' chekced={true} />
            <Radio name="gender" value='female' text='Ayol' />
            <button type='submit' className={style.btn}>Royhatdan otish</button>
            <Link to='/login' className={style.link}>Hisobingiz bormi? Kirish</Link>
        </Form>
    );
}

export default Register;
