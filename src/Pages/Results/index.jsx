import React, { useEffect, useState } from 'react';
import {  Navigate } from 'react-router-dom'


import ResultsItem from '../../Components/ResultsItem';

import style from './Results.module.scss'
import { HOST } from '../../Constants';

const Results = () => {
    const [results, setResults] = useState([])
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        fetch(`${HOST}/results`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    setResults(res.data)
                } else {
                    alert(res.error || res.message)
                }
            })
    }, [token])

    if (!token) return <Navigate to='/login' />

    return (
        <div className={style.results + " container"}>
            <div className={style.results__nav}>
            </div>
            <div className={style.results__block}>
                <h3 className={style.results__block__title}>Testlar</h3>
                {
                    results.length > 0 && results.map((result, index) => (
                        <ResultsItem key={result.result_id} result={result} count={index + 1} />
                    ))
                }
            </div>
        </div>
    );
}

export default Results;
