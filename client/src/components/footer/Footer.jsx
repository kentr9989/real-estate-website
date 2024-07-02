import React from 'react';
import { Box, Container, Text, Title, Group, Stack, useMantineTheme } from '@mantine/core';
import classes from './footer.module.css';

const Footer = () => {
  const theme = useMantineTheme();

  return (
    <Box component="footer" className={classes.footer} style={{ backgroundColor: theme.colors.dark[7], padding: '2rem 0' }}>
      <Container className={classes.wrapper}>
        <Group position="apart" className={classes.columns}>
          <Stack className={classes.col}>
            <Title order={2} className={classes.title}>About the website</Title>
            <Text className={classes.text}>
              The website provides current updates on Australian real estate to help buyers and sellers interact and communicate easily.
            </Text>
          </Stack>

          <Stack className={classes.col}>
            <Title order={2} className={classes.title}>Contacts</Title>
            <Text className={classes.text}>Phone: +123 456 789</Text>
            <Text className={classes.text}>Email: kentr9989@gmail.com</Text>
            <Text className={classes.text}>LinkedIn: kentr9989@gmail.com</Text>
          </Stack>

          <Stack className={classes.col}>
            <Title order={2} className={classes.title}>Location</Title>
            <Text className={classes.text}>Bankstown 2200</Text>
            <Text className={classes.text}>New South Wales</Text>
            <Text className={classes.text}>Australia</Text>
          </Stack>
        </Group>
      </Container>
    </Box>
  );
};

export default Footer;
