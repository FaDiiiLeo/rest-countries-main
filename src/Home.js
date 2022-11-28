import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from 'nanoid';
//Components
import SearchAndFilter from "./components/SearchAndFilter";
import CountryCard from "./components/CountryCard";

export default function Home() {

  const [countriesData, setCountriesData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [region, setRegion] = useState('all');
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setIsDataLoading(true);
    if (region === 'all') {
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          setIsDataLoading(false);
          setCountriesData(response.data);
        });
    }
    if (region !== 'all') {
      axios.get(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => {
          setIsDataLoading(false);
          setCountriesData(response.data);
        });
    }
  }, [region]);

  function filterSearchedCountry(countries) {
    if (searchInput === '') return countries;
    return countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchInput.toLowerCase());
    });
  }

  const countries = filterSearchedCountry(countriesData).map(country =>
    <CountryCard key={nanoid()} {...country} />
  );

  return (
    <div className="home-container">
      <SearchAndFilter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setRegion={setRegion}
      />
      {isDataLoading
        ? <div className="lds-dual-ring"></div>
        : <div className="home__countries-container">{countries}</div>}
    </div>
  );
}
