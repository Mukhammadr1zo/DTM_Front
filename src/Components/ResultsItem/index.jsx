import React, { useState } from 'react';

import openIcon from '../../Assets/openIcon.svg'

import style from './Item.module.scss'

const Item = ({ result, count }) => {
    const [isOpen, setIsOpen] = useState(false)
    const date = new Date(result.date)
    const day = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    const month = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`
    const year = date.getFullYear()

    return (
        <div className={style.item} onClick={() => setIsOpen(state => !state)}>
            <span>
                <span>Test #{count}</span>
                <span>{day}/{month}/{year}</span>
                <span>{result.score_ball}/189.0</span>
                <img src={openIcon} alt="open icon" className={`${isOpen ? style.open : ''}`} />
            </span>
            <div className={style.item__accordion + ` ${isOpen ? style.open_item : ''}`}>
                <span>
                    <span>{result.faculty_name || 'tavsiya etilmadi'}</span>
                    <span>Blok #1</span>
                    <span>Blok #2</span>
                </span>
                <span>
                    <span>{result.type_of_training || ''}</span>
                    <span>{result.first_subject} / {result.first_tests_count}</span>
                    <span>{result.second_subject} / {result.second_tests_count}</span>
                </span>
            </div>
        </div>
    );
}

export default Item;
