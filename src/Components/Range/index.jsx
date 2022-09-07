import React from 'react';

import style from './Range.module.scss'

const Range = ({ color, name, correct, count_of_tests }) => {
    const procent = (correct / count_of_tests) * 100
    const icon_pos = {
        left: `${procent}%`,
        background: color,
    }
    const progres_pos = {
        width: `${procent}%`,
        background: color,
        boxShadow: '0px 0px 6px ' + color,
    }
    return (
        <label className={style.range}>
            <span className={style.range__name}>{name}</span>
            <div className={style.box_line}>
                <div className={style.box_line_icon} style={icon_pos}>{procent}%</div>
                <div className={style.box_line__progress} style={progres_pos}></div>
            </div>
            <span className={style.range__procent}>100%</span>
            <span>{correct}/{count_of_tests}</span>
        </label>
    );
}

export default Range;
