import React, { useState } from 'react';

import arrow from '../../Assets/openIcon.svg'

import style from './CustomSelect.module.scss'

const CustomSelect = ({ func, array, name, onHover }) => {
    const [isOpen, setIsOpen] = useState(false)

    if (!array) return <></>

    return (
        <div>
            <div className={style.select} onClick={() => setIsOpen(state => !state)}>
                {name}
                <img src={arrow} className={isOpen ? style.open : ''} alt="icon arrow" />
            </div>
            <div className={isOpen ? style.openItems : style.closeItems}>
                {
                    array.length > 0 && array.map(faculty => (
                        <div
                            onClick={() => func(faculty)}
                            onMouseOver={() => onHover(faculty.faculty_id)}
                            className={style.item}
                            key={faculty.faculty_id}
                        >{faculty.faculty_name}</div>
                    ))
                }
            </div>
        </div>
    );
}

export default CustomSelect;
