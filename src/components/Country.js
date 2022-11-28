import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Country() {

    let { countryName } = useParams();
    const [countryData, setCountryData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const getCountryISO2 = require("country-iso-3-to-2");
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const navigate = useNavigate();

    useEffect(() => {
        async function getCountryData() {
            const res = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
            setCountryData(res.data[0]);
            setIsDataLoaded(true);
        }
        getCountryData();
    }, [countryName]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const languages = Object.values({ ...countryData.languages }).map((language, index) => {
        return (index ? ', ' : '') + language;
    });
    const currencies = Object.values({ ...countryData.currencies }).map((currency, index) => {
        return (index ? ', ' : '') + currency.name;
    });

    return (
        <div className='country-container'>
            <div className='country__back-link'>
                <button className='btn' onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeftLong} /> Back
                </button>
                <button className='btn' onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faHome} /> Home
                </button>
            </div>
            {isDataLoaded ? <div className='country'>
                <div className='country__flag'>
                    <img src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
                </div>
                <div className='country__info-container'>
                    <h2>{countryData.name.common}</h2>
                    <div className='country__info'>
                        <div className='country__info-left'>
                            <p><strong>Native Name: </strong> {Object.values({ ...countryData.name.nativeName })[0].common}</p>
                            <p><strong>Population: </strong> {numberWithCommas(countryData.population)}</p>
                            <p><strong>Region: </strong> {countryData.region}</p>
                            <p><strong>Sub Region: </strong> {countryData.subregion}</p>
                            <p><strong>Capital: </strong> {countryData.capital[0]}</p>
                        </div>
                        <div className='country__info-right'>
                            <p><strong>Top Level Domain: </strong> {countryData.tld[0]}</p>
                            <p><strong>Currencies: </strong> {currencies}</p>
                            <p><strong>Languages: </strong> {languages}</p>
                        </div>
                    </div>
                    {countryData.borders &&
                        <div className='country__border-countries-container'>
                            <p><strong>Border Countries: </strong></p>
                            <div className='country__border-countries'>
                                {countryData.borders.map((borderCountry, index) => {
                                    return <Link to={`/${regionNames.of(getCountryISO2(borderCountry))}`} className='btn country__border-btn' key={index}>
                                        {regionNames.of(getCountryISO2(borderCountry))}
                                    </Link>;
                                })}
                            </div>
                        </div>}
                </div>
            </div> : <div className="lds-dual-ring"></div>}
        </div>
    );
}
