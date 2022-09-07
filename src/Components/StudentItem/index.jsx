import React from 'react';

import style from './StudentItem.module.scss'

const StudentItem = ({ result, count }) => {
    const date = new Date(result.date)
    const day = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    const month = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`
    const year = date.getFullYear()

    if (!result) return <></>

    return (
        <tr className={style.row}>
            <td>{count}</td>
            <td>{result.fullname}</td>
            <td>{result.faculty_name || 'Tavsiya etilmadi'}</td>
            <td>{day}.{month}.{year}</td>
            <td>{result.score_ball}</td>
            <td>{result.time} min</td>
        </tr>
    );
}

export default StudentItem;
