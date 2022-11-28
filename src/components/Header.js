import React from 'react';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {
    return (
        <div className='header-container'>
            <h2>Where in the world?</h2>
            <button className='btn theme-btn' onClick={() => props.setTheme(prevState => prevState === 'dark' ? 'light' : 'dark')}>
                <FontAwesomeIcon icon={props.theme === 'dark' ? faSun : faMoon} />{props.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
}
