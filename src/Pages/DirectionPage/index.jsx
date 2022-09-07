import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate, useNavigate } from 'react-router-dom';

import { setFacultiesAction } from '../../Redux/actions/facultiesAction';
import FacultyItem from '../../Components/FacultyItem';
import TableItem from '../../Components/TableItem';
import CustomSelect from '../../Components/CustomSelect';
import { HOST } from '../../Constants';

import style from './DirectionBlock.module.scss'

const DirectionPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [faculties, setFaculties] = useState([])
    const [facultyInfo, setFacultyInfo] = useState([])
    const [universities, setUniversities] = useState([])
    const { first_subject, second_subject } = useSelector(state => state.subjectsReducer)
    const token = JSON.parse(localStorage.getItem('token'))

    console.log(facultyInfo.get_count)

    const addFaculty = (faculty) => {
        if (faculties.length >= 5) return
        const oldFaculty = faculties.find(el => el.faculty_id === faculty.faculty_id)
        if (oldFaculty) return
        setFaculties(state => [...state, faculty])
    }

    const deleteFaculty = (faculty_id) => {
        setFaculties(state => state.filter(faculty => faculty.faculty_id !== faculty_id))
    }

    const sendInfo = () => {
        if (!faculties.length) return alert('Eng kamida 1 ta fakultet tanlash kerak!')
        dispatch(setFacultiesAction(faculties))
        navigate('/tests')
    }

    const getInfo = (faculty_id) => {
        fetch(`${HOST}/faculties/${faculty_id}`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
        console.log(faculty_id);

                if (res.status === 200) {
                    setFacultyInfo(res.data)
                } else {
                    alert(res.error || res.message)
                }
            })
    }


    useEffect(() => {
        if (!first_subject || !second_subject) return navigate('/subject')
       
        fetch(`${HOST}/universities?first_subject=${first_subject}&second_subject=${second_subject}`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
                
                if (res.status === 200) {
                    setUniversities(res.data)
                } else {
                    alert(res.error || res.message)
                }
            })
    }, [first_subject, second_subject, navigate, token])

    if (!token) return <Navigate to='/login' />

    return (
        <div className={style.directionBlock}>
            <h1 className={style.directionBlock__title}>Assosiy Imtihonga hush kelibsiz</h1>
            <div className={style.directionBlock__timeline}>
                <div className={style.active}>1</div>
                <span></span>
                <div className={style.active}>2</div>
                <span></span>
                <div className={style.active}>3</div>
            </div>
            <div className={style.directionBlock__container}>
                <label className={style.directionBlock__select}>
                    Yonalish tanlash
                    {
                        universities.length > 0 && universities.map(university => (
                            <CustomSelect
                                key={university.university_id}
                                name={university.university_name}
                                array={university.faculties}
                                func={addFaculty}
                                onHover={getInfo}
                            />
                        ))
                    }
                </label>
                <span>
                    <div className={faculties.length ? style.directionBlock__facultyBlokc : style.none}>
                        {
                            faculties.length > 0 && faculties.map((faculty, index) => (
                                <FacultyItem key={faculty.faculty_id} faculty={faculty} func={deleteFaculty} count={index + 1} />
                            ))
                        }
                    </div>
                    <div className={facultyInfo.length ? style.directionBlock__facultyInfo : style.none}>
                        <h2 className={style.directionBlock__facultyInfo__title}>{facultyInfo[0]?.faculty_name}</h2>
                        <p className={style.directionBlock__facultyInfo__desc}>{facultyInfo[0]?.region_name}</p>
                        <TableItem name={'Grant'} count={facultyInfo[0]?.grant_count} ball={facultyInfo[0]?.passing_score_grant} />
                        <TableItem name={'Shartnoma'} count={facultyInfo[0]?.contract_count} ball={facultyInfo[0]?.passing_score_contract} />
                    </div>
                </span>
            </div>
            <button onClick={sendInfo} className={style.directionBlock__btn}>Next</button>
        </div>
    );
}

export default DirectionPage;
