import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { Navigate, useNavigate } from 'react-router-dom';
import { HOST } from '../../Constants';

import TestItem from './TestItem';

import style from './Tests.module.scss'

const Tests = () => {
    const navigate = useNavigate()
    const [tests, setTests] = useState([])
    const [{ first_subject, second_subject }, faculties] = useSelector(state => [state.subjectsReducer, state.facultiesReducer])
    const token = JSON.parse(localStorage.getItem('token'))

    let time = 0

    const timeInterval = setInterval(() => {
        time++
    }, 60000)

    const sendResults = async (e) => {
        e.preventDefault()
        clearInterval(timeInterval)
        let first_subject_correct = 0
        let second_subject_correct = 0

        const form = document.forms.test
        tests[0].tests.forEach(test => {
            if (+form[test.question_id].value === +test.question_variants.true) first_subject_correct++
        })
        tests[1].tests.forEach(test => {
            if (+form[test.question_id].value === +test.question_variants.true) second_subject_correct++
        })

        const body = JSON.stringify({
            first_subject: first_subject_correct,
            second_subject: second_subject_correct,
            first_tests_count: tests[0].tests.length,
            second_tests_count: tests[1].tests.length,
            first_subject_id: first_subject,
            second_subject_id: second_subject,
            faculties,
            time
        })
        const options = { method: 'POST', headers: { 'Content-Type': 'application/json', token }, body }
        let res = await fetch(`${HOST}/result`, options)
        res = await res.json()

        if (res.status === 201) {
            console.log(res.data);
            navigate(`/score/${res.data[0].result_id}`)
        } else {
            alert(res.error || res.message)
        }
    }

    useEffect(() => {
        fetch(`${HOST}/tests?first_subject=${first_subject}&second_subject=${second_subject}`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    setTests(res.data)
                } else {
                    alert(res.error || res.message)
                }
            })
    }, [first_subject, second_subject, token])

    if (!token) return <Navigate to='/login' />
    if (!faculties.length) return <Navigate to='/subject' />

    return (
        <div className="container">
            <div className={style.testBlock}>
                <form className={style.testBlock__form} name="test" onSubmit={sendResults}>
                    {
                        tests.length > 0 && tests.map(test => (
                            <React.Fragment key={test.subject_id}>
                                <h2 className={style.testBlock__name}>{test.subject_name}</h2>
                                {
                                    test.tests.length > 0 && test.tests.map((question, index) => (
                                        <TestItem test={question} key={question.question_id} count={index + 1} />
                                    ))
                                }
                            </React.Fragment>
                        ))
                    }
                    <button type="submit" className={style.testBlock__submit}>Yakunlash</button>
                </form>
            </div>
        </div>
    );
}

export default Tests;
