// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div style={{display:'flex', flexFlow:'column'}}>
                <img className={styles.logo} src='images/logo.png'alt="Pokemon" />
                <Link to='/home'>
                    <button className={styles.HomeButton}> Home </button>
                </Link>
            </div>
            <img className={styles.charmander} src="/images/Charmander.gif" alt="Charmander" />
            <img className={styles.bulbasaur} src="/images/Bulbasaur.gif" alt="Bulbasaur" />
            <img className={styles.squirtle} src="/images/Squirtle.gif" alt="Squirtle" />
        </div>
    );
}
