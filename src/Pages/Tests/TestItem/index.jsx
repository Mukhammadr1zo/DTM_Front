import React from 'react';
import Radio from './Radio';

import style from './TestItem.module.scss'

const TestItem = ({ test, count }) => {
    return (
        <div className={style.testItem}>
            <h3 className={style.testItem__question}>#{count}. {test.question}</h3>
            <div className={style.testItem__variants}>
                <Radio name={test.question_id} variant={test.question_variants['1']} value={1} correct_value={test.question_variants.true} />
                <Radio name={test.question_id} variant={test.question_variants['2']} value={2} correct_value={test.question_variants.true} />
                <Radio name={test.question_id} variant={test.question_variants['3']} value={3} correct_value={test.question_variants.true} />
                <Radio name={test.question_id} variant={test.question_variants['4']} value={4} correct_value={test.question_variants.true} />
            </div>
        </div>
    );
}

export default TestItem;
