import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { Navigate, useNavigate } from 'react-router-dom';

import Select from '../Select'
import { setSubjects } from '../../Redux/actions/subjectsAction';
import { HOST } from '../../Constants';

import style from './ScienceBlock.module.scss'

const ScienceBlock = () => {
    const formRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstSubjects, setFirstSubjects] = useState([])
    const [secondSubjects, setSecondSubject] = useState([])
    const token = JSON.parse(localStorage.getItem('token'))

    const getSecondSubject = async () => {
        let res = await fetch(`${HOST}/secondsubject/${formRef.current.firstSubject.value}`, { headers: { token } })
        res = await res.json()
        if (res.status === 200) {
            setSecondSubject(res.data)
        } else {
            alert(res.error || res.message)
        }
    }

    const sendInfo = (e) => {
        e.preventDefault()
        const subjects = {
            first_subject: formRef.current.firstSubject.value,
            second_subject: formRef.current.secondSubject.value
        }
        if (!subjects.first_subject || !subjects.second_subject) return alert('1chi va 2chi fanlarni tanlang')
        dispatch(setSubjects(subjects))
        localStorage.setItem('subjects', JSON.stringify(subjects))
        navigate('/direction')
    }

    useEffect(() => {
        fetch(`${HOST}/firstsubject`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    setFirstSubjects(res.data)
                } else {
                    alert(res.error || res.message)
                }
            })
    }, [token]);

    if (!token) return <Navigate to='/login' />

    return (
        <form onSubmit={sendInfo} ref={formRef} className={style.scienceBlock}>
            <h1 className={style.scienceBlock__title}>Assosiy Imtihonga hush kelibsiz</h1>
            <div className={style.scienceBlock__timeline}>
                <div className={style.active}>1</div>
                <span></span>
                <div className={style.active}>2</div>
                <span></span>
                <div>3</div>
            </div>
            <label className={style.scienceBlock__select}>
                Birinchi fan
                <Select arr={firstSubjects} id='subject_id' value='subject_id' text='subject_name' onChange={getSecondSubject} name='firstSubject' className={style.select} />
            </label>
            <label className={style.scienceBlock__select}>
                Ikkinchi fan
                <Select arr={secondSubjects} id='subject_id' value='subject_id' text='subject_name' name='secondSubject' className={style.select} />
            </label>
            <button type='submit' className={style.scienceBlock__btn}>Next</button>
        </form>
    );
}

export default ScienceBlock;
