import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  Group,
  Title,
  Text,
  Select,
  Button,
  Card,
  Image,
  Badge,
  Avatar,
  ActionIcon
} from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaCommentDollar, FaSquareFull, FaBed } from 'react-icons/fa';
import { request } from '../../util/fetchApi';
import { arrPriceRanges } from '../../util/idxToPriceRange';
import { idxToState } from '../../util/idxToState';
import classes from './properties.module.css';

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [state, setState] = useState(null);
  const query = useLocation().search.slice(1);
  const arrQuery = query.split('&');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await request(`/property/getAll`, 'GET');
      setAllProperties(data);
    };
    fetchAllProperties();
  }, []);

  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {};
      arrQuery.forEach((option, index) => {
        const key = option.split('=')[0];
        const value = option.split('=')[1];
        formattedQuery = { ...formattedQuery, [key]: value };
        if (index === arrQuery.length - 1) {
          setState(formattedQuery);
          handleSearch(formattedQuery);
        }
      });
    }
  }, [allProperties, arrQuery]);

  const handleSearch = (param = state) => {
    let options = param?.nativeEvent ? state : param;
    const filteredProperties = allProperties.filter((property) => {
      const priceRange = arrPriceRanges[options.priceRange];
      let minPrice =
        options.priceRange !== 4 ? Number(priceRange.split('-')[0]) : 1000001;
      let maxPrice =
        options.priceRange !== 4
          ? Number(priceRange.split('-')[1])
          : Number.MAX_SAFE_INTEGER;
      let state = idxToState(options.state);
      return (
        options.type === property.type &&
        state === property.state &&
        property.price >= minPrice &&
        property.price <= maxPrice
      );
    });
    const queryStr = `type=${options.type}&state=${options.state}&priceRange=${options.priceRange}`;
    navigate(`/properties?${queryStr}`, { replace: true });
    setFilteredProperties(filteredProperties);
  };

  const handleState = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box className={classes.container}>
      <Container size='xl' className={classes.wrapper}>
        <Group className={classes.options}>
          <Select
            placeholder='Select type'
            value={state?.type}
            name='type'
            onChange={(value) =>
              handleState({ target: { name: 'type', value } })
            }
            data={[
              { value: 'house', label: 'House' },
              { value: 'apartment', label: 'Apartment' },
              { value: 'townhouse', label: 'Townhouse' },
              { value: 'duplex', label: 'Duplex' },
            ]}
            className={classes.select}
          />
          <Select
            placeholder='Select price range'
            value={state?.priceRange}
            name='priceRange'
            onChange={(value) =>
              handleState({ target: { name: 'priceRange', value } })
            }
            data={[
              { value: '0', label: '0-300,000' },
              { value: '1', label: '300,000-500,000' },
              { value: '2', label: '500,000-700,000' },
              { value: '3', label: '700,000-1,000,000' },
              { value: '4', label: 'Over 1,000,000' },
            ]}
            className={classes.select}
          />
          <Select
            placeholder='Select state'
            value={state?.state}
            name='state'
            onChange={(value) =>
              handleState({ target: { name: 'state', value } })
            }
            data={[
              { value: '0', label: 'NSW' },
              { value: '1', label: 'VIC' },
              { value: '2', label: 'WA' },
              { value: '3', label: 'SA' },
              { value: '4', label: 'TAS' },
            ]}
            className={classes.select}
          />
          <ActionIcon
            variant='filled'
            size='lg'
            color='blue'
            radius='xl'
            className={classes.searchIcon}
            onClick={handleSearch}
          >
            <AiOutlineSearch />
          </ActionIcon>
        </Group>
        {filteredProperties.length > 0 ? (
          <>
            <Stack align='center' className={classes.titles}>
              <Text component='h5'>Selected properties</Text>
              <Title order={2}>Property you may like</Title>
            </Stack>
            <Group className={classes.properties}>
              {filteredProperties.map((property) => (
                <Card
                  key={property._id}
                  shadow='sm'
                  padding='lg'
                  radius='md'
                  withBorder
                  className={classes.property}
                >
                  <Card.Section
                    component={Link}
                    to={`/propertyDetail/${property._id}`}
                    className={classes.imgContainer}
                  >
                    <Image
                      src={`https://real-estate-website-mern-m3ux.onrender.com/images/${property.img}`}
                      alt={property.title}
                      height={180}
                      fit='cover'
                    />
                  </Card.Section>
                  <Box className={classes.details}>
                    <Group position='apart' className={classes.priceAndOwner}>
                      <Text className={classes.address}>
                        {property.address}
                      </Text>
                      <Avatar
                        src={`https://real-estate-website-mern-m3ux.onrender.com/images/${property.currentOwner.profileImg}`}
                        className={classes.owner}
                        alt='seller profile picture'
                      />
                    </Group>
                    <Group className={classes.moreDetails}>
                      <Badge
                        size='lg'
                        variant='gradient'
                        gradient={{ from: 'blue', to: 'cyan', deg: 181 }}
                      >
                        {property.price} AUD
                      </Badge>
                      <Badge
                        size='lg'
                        variant='gradient'
                        gradient={{ from: 'blue', to: 'cyan', deg: 181 }}
                      >
                        {property.sqmeters}m
                      </Badge>
                      <Badge
                        size='lg'
                        variant='gradient'
                        gradient={{ from: 'blue', to: 'cyan', deg: 181 }}
                      >
                        {property.beds} beds
                      </Badge>
                    </Group>
                    <Text className={classes.desc}>{property.desc}</Text>
                  </Box>
                </Card>
              ))}
            </Group>
          </>
        ) : (
          <Title align='center' order={2} className={classes.noProperty}>
            We have no properties with specified options
          </Title>
        )}
      </Container>
    </Box>
  );
};

export default Properties;
