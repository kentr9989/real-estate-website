import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Group, Text, Image, Card } from '@mantine/core';
import { request } from '../../util/fetchApi';
import classes from './popularproperties.module.css';
import housephoto from '../../assets/house.jpg';
import duplexphoto from '../../assets/duplex.jpg';
import townhousephoto from '../../assets/townhouse.jpg';
import apartmentphoto from '../../assets/apartment.jpg';

const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({});

  useEffect(() => {
    const fetchNumProperties = async () => {
      try {
        const data = await request('/property/find/types', 'GET');
        setNumProperties(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchNumProperties();
  }, []);

  return (
    <div className={classes.container}>
      <Container className={classes.wrapper}>
        <div className={classes.titles}>
          <Text className={classes.subTitle}>Different Australia properties</Text>
          <Text className={classes.mainTitle}>Best property for you</Text>
        </div>
        <Group className={classes.properties} position="center">
          <Link className={classes.property} to={`/properties?type=house&state=0&priceRange=0`}>
            <Card shadow="sm" radius="md" withBorder className={classes.propertyCard}>
              <Card.Section>
                <Image src={housephoto} height={350} alt="House" className={classes.propertyImage} />
              </Card.Section>
              <Text className={classes.quantity}>{numProperties?.house} properties</Text>
              <Text align="center" size="lg" weight={500} className={classes.propertyTitle}>
                House property
              </Text>
            </Card>
          </Link>
          <Link className={classes.property} to={`/properties?type=duplex&state=0&priceRange=0`}>
            <Card shadow="sm" radius="md" withBorder className={classes.propertyCard}>
              <Card.Section>
                <Image src={duplexphoto} height={350} alt="Duplex" className={classes.propertyImage} />
              </Card.Section>
              <Text className={classes.quantity}>{numProperties?.duplex} properties</Text>
              <Text align="center" size="lg" weight={500} className={classes.propertyTitle}>
                Duplex property
              </Text>
            </Card>
          </Link>
          <Link className={classes.property} to={`/properties?type=townhouse&state=0&priceRange=0`}>
            <Card shadow="sm" radius="md" withBorder className={classes.propertyCard}>
              <Card.Section>
                <Image src={townhousephoto} height={350} alt="Townhouse" className={classes.propertyImage} />
              </Card.Section>
              <Text className={classes.quantity}>{numProperties?.townhouse} properties</Text>
              <Text align="center" size="lg" weight={500} className={classes.propertyTitle}>
                Townhouse property
              </Text>
            </Card>
          </Link>
          <Link className={classes.property} to={`/properties?type=apartment&state=0&priceRange=0`}>
            <Card shadow="sm" radius="md" withBorder className={classes.propertyCard}>
              <Card.Section>
                <Image src={apartmentphoto} height={350} alt="Apartment" className={classes.propertyImage} />
              </Card.Section>
              <Text className={classes.quantity}>{numProperties?.apartment} properties</Text>
              <Text align="center" size="lg" weight={500} className={classes.propertyTitle}>
                Apartment property
              </Text>
            </Card>
          </Link>
        </Group>
      </Container>
    </div>
  );
};

export default PopularProperties;
