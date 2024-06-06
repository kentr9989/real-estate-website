import React from 'react';
import classes from './featuredProperties.module.css';
import { request } from '../../util/fetchApi';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/house.jpg';
import person from '../../assets/person1.jpg';
import { FaCommentDollar } from 'react-icons/fa';
import { FaSquareFull } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/property/find/featured', 'GET');
        console.log(data[0].img);
        console.log(data[0].currentOwner?.profileImg);
        setFeaturedProperties(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Properties you may like</h5>
          <h2>Our featured properties</h2>
        </div>
        <div className={classes.featuredProperties}>
          {featuredProperties?.map((property) => (
            <div key={property._id} className={classes.featuredProperty}>
              <Link
                to={`/propertyDetail/${property._id}`}
                className={classes.imgContainer}
              >
                <img
                  src={`http://localhost:4500/images/${property?.img}`}
                  alt=''
                />
              </Link>
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.address}>{property?.address}</span>
                  <img
                    src={`http://localhost:4500/images/${property.currentOwner?.profileImg}`}
                    className={classes.owner}
                    alt='seller profile picture'
                  />
                </div>
                <div className={classes.moreDetails}>
                  <span>
                    {property?.price} AUD
                    <FaCommentDollar className={classes.icon} />
                  </span>
                  <span>
                    {property?.sqmeters}m
                    <FaSquareFull className={classes.icon} />
                  </span>
                  <span>
                    {property?.beds} beds
                    <FaBed className={classes.icon} />
                  </span>
                </div>
                <div className={classes.desc}>{property?.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
