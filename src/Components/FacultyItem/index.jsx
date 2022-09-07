import React from 'react';

import closeIcon from '../../Assets/close.svg'

import style from './FacultyItem.module.scss'

const FacultyItem = ({ faculty, func, count }) => {

    if (!faculty) return <></>

    return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
            {count}
            <div className={style.item} onClick={() => func(faculty.faculty_id)}>
                {faculty.faculty_name}
                <img src={closeIcon} alt="close icon" />
            </div>
        </span>
    );
}

export default FacultyItem;
