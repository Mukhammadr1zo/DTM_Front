import React from 'react';
import { Outlet, Link } from 'react-router-dom'

import style from './Navbar.module.scss'

const NavbarLayout = () => {
    return (
        <div className='container'>
            <div className={style.navbar}>
                <Link to='/students'>Umumiy ballar</Link>
                <Link to='/login' onClick={() => localStorage.removeItem('token')}>Log out</Link>
            </div>
            <Outlet />
        </div>
    );
}

export default NavbarLayout;


