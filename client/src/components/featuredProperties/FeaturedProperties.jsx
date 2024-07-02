import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  Box,
  Container,
} from '@mantine/core';
import { FaCommentDollar, FaSquareFull, FaBed } from 'react-icons/fa';
import { request } from '../../util/fetchApi';
import classes from './featuredProperties.module.css';

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/property/find/featured', 'GET');
        setFeaturedProperties(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <Box className={classes.container}>
      <Container size='xl' className={classes.wrapper}>
        <Stack align='center' className={classes.titles}>
          <Text component='h5' className={classes.subtitle}>
            Properties you may like
          </Text>
          <Text component='h2' className={classes.title}>
            Our featured properties
          </Text>
        </Stack>
        <Group className={classes.featuredProperties}>
          {featuredProperties?.map((property) => (
            <Card
              key={property._id}
              shadow='sm'
              padding='lg'
              radius='md'
              withBorder
              className={classes.featuredProperty}
            >
              <Card.Section
                component={Link}
                to={`/propertyDetail/${property._id}`}
                className={classes.imgContainer}
              >
                <Image
                  src={`https://real-estate-website-mern-m3ux.onrender.com/images/${property?.img}`}
                  alt=''
                  height={180}
                  fit='cover'
                />
              </Card.Section>
              <Box className={classes.details}>
                <Group position='apart' className={classes.priceAndOwner}>
                  <Text className={classes.address}>{property?.address}</Text>
                  <Image
                    src={`https://real-estate-website-mern-m3ux.onrender.com/images/${property.currentOwner?.profileImg}`}
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
                    {property?.price} AUD
                  </Badge>
                  <Badge
                    size='lg'
                    variant='gradient'
                    gradient={{ from: 'blue', to: 'cyan', deg: 181 }}
                  >
                    {property?.sqmeters}m
                  </Badge>
                  <Badge
                    size='lg'
                    variant='gradient'
                    gradient={{ from: 'blue', to: 'cyan', deg: 181 }}
                  >
                    {property?.beds} beds
                  </Badge>
                </Group>
                <Text className={classes.desc}>{property?.desc}</Text>
              </Box>
            </Card>
          ))}
        </Group>
      </Container>
    </Box>
  );
};

export default FeaturedProperties;
