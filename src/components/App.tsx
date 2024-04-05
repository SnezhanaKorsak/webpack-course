import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import CalendarIcon from '@/assets/calendar.svg';

import styles from './App.module.scss';

export const App = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(prev => prev + 1);

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <ul className={styles.list}>
                    <li className={styles.link}>
                      <Link to={'/about'} >About</Link>
                 </li>
                 <li className={styles.link}>
                     <Link to={'/shop'} >Shop</Link>
                 </li>
            </ul>
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <h1>Count: {count}</h1>
                    <button className={styles.button} onClick={increment}>Add</button>

                    <hr/>
                    <CalendarIcon width="75" height="75"/>
                    <Outlet/>
                </div>

                <div className={styles.image}>
                    <img src={avatarPng} alt="avatar"/>
                    <img src={avatarJpg} alt="avatar"/>
                </div>
            </div>
        </div>
    );
};
