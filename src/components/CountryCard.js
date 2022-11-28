import React from 'react';
import { Link } from 'react-router-dom';

export default function CountryCard(props) {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Link className='country-card-link' to={`/${props.name.common}`}>
            <div className='country-card-container'>
                <img src={props.flags.png} alt={`${props.name.common} flag`} />
                <div className='country-card__info'>
                    <h2>{props.name.common}</h2>
                    <p><strong>Population: </strong>{numberWithCommas(props.population)}</p>
                    <p><strong>Region: </strong>{props.region}</p>
                    <p><strong>Capital: </strong>{props.capital}</p>
                </div>
            </div>
        </Link>
    );
}
