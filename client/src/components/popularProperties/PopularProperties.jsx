import React from 'react';
import classes from './popularproperties.module.css';
import { Link } from 'react-router-dom';
import housephoto from '../../assets/house.jpg';
import duplexphoto from '../../assets/duplex.jpg';
import townhousephoto from '../../assets/townhouse.jpg';
import apartmentphoto from '../../assets/apartment.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
import { request } from '../../util/fetchApi';

const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({});

  useEffect(() => {
    const fetchNumProperties = async () => {
      try {
        const data = await request('/property/find/types', 'GET');
        setNumProperties(data);
        // console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchNumProperties();
  }, []);
  return (
    
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different Australia properties</h5>
          <h2>Best property for you</h2>
        </div>
        <div className={classes.properties}>
          <Link className={classes.property} to={`/properties?type=house&state=0&priceRange=0`}>
            <img src={housephoto} />
            <div className={classes.quantity}>{numProperties?.house} properties</div>
            <h5> House property</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=duplex&state=0&priceRange=0`}>
            <img src={duplexphoto} />
            <div className={classes.quantity}>{numProperties?.duplex} properties</div>
            <h5> Duplex property</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=townhouse&state=0&priceRange=0`}>
            <img src={townhousephoto} />
            <div className={classes.quantity}>{numProperties?.townhouse} properties</div>
            <h5> Townhouse property</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=apartment&state=0&priceRange=0`}>
            <img src={apartmentphoto} />
            <div className={classes.quantity}>{numProperties?.apartment} properties</div>
            <h5> Apartment property</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularProperties;
