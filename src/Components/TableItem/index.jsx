import React from 'react';

import style from './TableItem.module.scss'

const TableItem = ({ name, count, ball }) => {
    return (
        <div className={style.table}>
            <span>{name}</span>
            <span>{count}</span>
            <span>{ball}</span>
        </div>
    );
}

export default TableItem;
