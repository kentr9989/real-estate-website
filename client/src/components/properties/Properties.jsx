import React from 'react';
import classes from './properties.module.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { request } from '../../util/fetchApi';
import { arrPriceRanges } from '../../util/idxToPriceRange';
import { idxToState } from '../../util/idxToState';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaCommentDollar } from 'react-icons/fa';
import { FaSquareFull } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [state, setState] = useState(null);
  const query = useLocation().search.slice(1);
  const arrQuery = query.split('&');
  const navigate = useNavigate();
  console.log(query);
  
  // fetch all property
  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await request(`/property/getAll`, 'GET');
      setAllProperties(data);
    };
    fetchAllProperties();
  }, []);

  // parse query params
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {};
      arrQuery.forEach((option, index) => {
        const key = option.split('=')[0];
        const value = option.split('=')[1];

        formattedQuery = { ...formattedQuery, [key]: value };

        // if we are on the last index, assign the formattedQuery object to state
        if (index === arrQuery.length - 1) {
          setState(formattedQuery);
          handleSearch(formattedQuery);
        }
      });
    }
  }, [allProperties, arrQuery]);

  const handleSearch = (param = state) => {
    let options;
    // either pass the formattedObject or event
    // that why we do if/else

    if (param?.nativeEvent) {
      options = state;
    } else {
      options = param;
    }

    const filteredProperties = allProperties.filter((property) => {
      // retrieve price range
      const priceRange = arrPriceRanges[options.priceRange];
      let minPrice,
        maxPrice = 0;

      if (options.priceRange !== 4) {
        minPrice = Number(priceRange.split('-')[0]);
        maxPrice = Number(priceRange.split('-')[1]);
      } else {
        minPrice = 1000001;
        maxPrice = Number.MAX_SAFE_INTEGER;
      }
      // retrieve state
      let state = idxToState(options.state);
      console.log(state);
      if (
        options.type === property.type &&
        state === property.state &&
        property.price >= minPrice &&
        property.price <= maxPrice
      ) {
        console.log(property);
        return property;
      }
    });
    const queryStr = `type=${options.type}&state=${options.state}&priceRange=${options.priceRange}`;

    navigate(`/properties?${queryStr}`, { replace: true });
    setFilteredProperties((prev) => filteredProperties);
  };

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select type</option>
            <option value='house'>House</option>
            <option value='apartment'>Apartment</option>
            <option value='townhouse'>Townhouse</option>
            <option value='duplex'>Duplex</option>
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option disabled>Select price range</option>
            <option value='0'>0-300,000</option>
            <option value='1'>300,000-500,000</option>
            <option value='2'>500,000-700,000</option>
            <option value='3'>700,000-1,000,000</option>
            <option value='3'>Over 1,000,000</option>
          </select>
          <select value={state?.state} name="state" onChange={handleState}>
            <option disabled>Select state</option>
            <option value='0'>NSW</option>
            <option value='1'>VIC</option>
            <option value='2'>WA</option>
            <option value='3'>SA</option>
            <option value='4'>TAS</option>
          </select>
          <button className={classes.searchBtn}>
            <AiOutlineSearch
              onClick={handleSearch}
              className={classes.searchIcon}
            />
          </button>
        </div>
        {filteredProperties?.length > 0 ? (
          <>
            <div className={classes.titles}>
              <h5>Selected properties</h5>
              <h2> Property you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <div key={property._id} className={classes.property}>
                  <Link
                    className={classes.imgContainer}
                    to={`/propertyDetail/${property._id}`}
                  >
                    <img
                      src={`http://localhost:4500/images/${property?.img}`}
                      alt=''
                    />
                  </Link>
                  <div className={classes.details}>
                    <div className={classes.priceAndOwner}>
                      <span className={classes.address}>
                        {property?.address}
                      </span>
                      <img
                        src={`http://localhost:4500/images/${property?.currentOwner.profileImg}`}
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
          </>
        ) : (
          <h2 className={classes.noProperty}>
            {' '}
            We have no properties with specified options
          </h2>
        )}
      </div>
    </div>
  );
};

export default Properties;
