import React, { useState } from 'react';
import classes from './hero.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Select,
  Group,
  Title,
  Text,
  ActionIcon,
} from '@mantine/core';

const Hero = () => {
  const [type, setType] = useState('house');
  const [state, setState] = useState('0');
  const [priceRange, setPriceRange] = useState('0');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/properties?type=${type}&state=${state}&priceRange=${priceRange}`
    );
  };

  return (
    <div className={classes.container}>
      <Container className={classes.wrapper}>
        <Title order={1}>Properties to call home in Australia</Title>
        <Group className={classes.options}>
          <Select
            placeholder='Select type'
            data={[
              { value: 'house', label: 'House' },
              { value: 'apartment', label: 'Apartment' },
              { value: 'townhouse', label: 'Townhouse' },
              { value: 'duplex', label: 'Duplex' },
            ]}
            onChange={setType}
            className={classes.select}
          />
          <Select
            placeholder='Select price range'
            data={[
              { value: '0', label: '0-300,000' },
              { value: '1', label: '300,000-500,000' },
              { value: '2', label: '500,000-700,000' },
              { value: '3', label: '700,000-1,000,000' },
              { value: '4', label: 'Over 1,000,000' },
            ]}
            onChange={setPriceRange}
            className={classes.select}
          />
          <Select
            placeholder='Select state'
            data={[
              { value: '0', label: 'NSW' },
              { value: '1', label: 'VIC' },
              { value: '2', label: 'WA' },
              { value: '3', label: 'SA' },
              { value: '4', label: 'TAS' },
            ]}
            onChange={setState}
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
      </Container>
    </div>
  );
};

export default Hero;
