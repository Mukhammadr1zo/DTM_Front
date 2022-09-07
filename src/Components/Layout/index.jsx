import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

import arrow from '../../Assets/arrow.svg'

import style from './Layout.module.scss'

const Layout = () => {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <div>
            <div className="container">
                <div className={style.layout__backBtn}>
                    <button onClick={goBack}>
                        <img src={arrow} alt="go to back" />
                        Orqaga
                    </button>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
