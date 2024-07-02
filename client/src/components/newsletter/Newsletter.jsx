import React from 'react';
import { Box, Container, Stack, Title, Text, Group, TextInput, ActionIcon } from '@mantine/core';
import { FiSend } from 'react-icons/fi';
import classes from './newsletter.module.css';

const Newsletter = () => {
  return (
    <Box className={classes.container}>
      <Container size="lg" className={classes.wrapper}>
        <Stack align="center" className={classes.titles}>
          <Text component="h5" className={classes.subtitle}>
            Want to get the latest updates on the market?
          </Text>
          <Title order={2} className={classes.title}>
            Send us your email and we will contact you
          </Title>
        </Stack>
        <Group className={classes.inputContainer}>
          <TextInput
            placeholder="Type your email"
            className={classes.input}
            variant="unstyled"
          />
          <ActionIcon size="lg" variant="filled" color="blue" className={classes.sendIcon}>
            <FiSend />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  );
};

export default Newsletter;
