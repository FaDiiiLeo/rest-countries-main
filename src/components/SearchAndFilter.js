import React, { useEffect, useRef, useState } from 'react';
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function SearchAndFilter(props) {

    const searchRef = useRef(null);
    const menuBtnRef = useRef(null);
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (menuBtnRef.current
                && menuRef.current
                && !menuBtnRef.current.contains(e.target)
                && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return (
        <div className="main__search-filter-container">
            <div className="main__search" onClick={() => searchRef.current.focus()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    type="text"
                    placeholder="Search for a country..."
                    ref={searchRef}
                    value={props.searchInput}
                    onChange={(e) => props.setSearchInput(e.target.value)}
                />
            </div>
            <div className="main__filter-container">
                <p ref={menuBtnRef} onClick={() => setIsMenuOpen(prevState => !prevState)}>Filter by Region
                    <FontAwesomeIcon className={isMenuOpen ? 'fa-angle-down-rotate' : ''} icon={faAngleDown} />
                </p>
                {isMenuOpen && <div ref={menuRef} className="main__filter__regions-container">
                    <ul>
                        <li><button onClick={() => props.setRegion('all')}>All</button></li>
                        <li><button onClick={() => props.setRegion('africa')}>Africa</button></li>
                        <li><button onClick={() => props.setRegion('america')}>America</button></li>
                        <li><button onClick={() => props.setRegion('asia')}>Asia</button></li>
                        <li><button onClick={() => props.setRegion('europe')}>Europe</button></li>
                        <li><button onClick={() => props.setRegion('oceania')}>Oceania</button></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}
