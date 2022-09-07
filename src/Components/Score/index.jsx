import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Range from '../Range';
import { HOST } from '../../Constants';

import style from './Score.module.scss'

const Score = () => {
    const { result_id } = useParams()
    const [result, setResult] = useState([])
    const token = JSON.parse(localStorage.getItem('token'))

    console.log(result_id);

    useEffect(() => {
        fetch(`${HOST}/result/${result_id}`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    setResult(res.data)
                } else {
                    alert(res.error || res.message)
                }
            })
    }, [result_id, token])

    if (!token) return <Navigate to='/login' />

    return (
        <div className='container'>
            <h1 className={style.results__title}>Assosiy</h1>
            <div className={style.results__ranges}>
                <Range color={'#18A0FB'} count_of_tests={result[0]?.first_tests_count} correct={result[0]?.first_subject} name={result[0]?.first_subject_name} />
                <Range color={'#3919FB'} count_of_tests={result[0]?.second_tests_count} correct={result[0]?.second_subject} name={result[0]?.second_subject_name} />
            </div>
            <h2 className={style.results__subtitle}>Natija: tavsiya {result[0]?.faculty_name ? 'etildi' : 'etilmadi'}</h2>
            {
                result[0]?.faculty_name ? <>
                    <p className={style.results__desc}>Ta’lim muassasi: {result[0]?.university_name}</p>
                    <p className={style.results__desc}>Yo’nalish: {result[0]?.faculty_name}</p>
                    <p className={style.results__desc}>Ta’lim turi: {result[0]?.type_of_training}</p>
                </> : <></>
            }
        </div>
    );
}

export default Score;
