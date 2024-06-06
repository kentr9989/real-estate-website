import React from 'react';
import classes from './hero.module.css';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [type, setType] = useState('house');
  const [state, setState] = useState('0');
  const [priceRange, setPriceRange] = useState('0');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    navigate(`/properties?type=${type}&state=${state}&priceRange=${priceRange}`)
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Properties to call home in Australia</h2>
        <h5>Search for the best real estate to fit your need</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value='house'>House</option>
            <option value='apartment'>Apartment</option>
            <option value='townhouse'>Townhouse</option>
            <option value='duplex'>Duplex</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select price range</option>
            <option value='0'>0-300,000</option>
            <option value='1'>300,000-500,000</option>
            <option value='2'>500,000-700,000</option>
            <option value='3'>700,000-1,000,000</option>
            <option value='3'>Over 1,000,000</option>
          </select>
          <select onChange={(e) => setState(e.target.value)}>
            <option disabled>Select state</option>
            <option value='0'>NSW</option>
            <option value='1'>VIC</option>
            <option value='2'>WA</option>
            <option value='3'>SA</option>
            <option value='4'>TAS</option>
          </select>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
