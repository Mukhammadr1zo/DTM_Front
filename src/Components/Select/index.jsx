import React from 'react';

const Select = ({ name, onChange, arr, className, id, value, text }) => {

    if (!arr) return <></>

    return (
        <select name={name} onChange={onChange} className={className}>
            <option value={null}>{null}</option>
            {
                arr?.length > 0 && arr.map(el => <option key={el[id]} value={el[value]}>{el[text]}</option>)
            }
        </select>
    );
}

export default Select;
