import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import {
  Box,
  Container,
  Stack,
  Group,
  Image,
  Text,
  Badge,
  Button,
  Avatar,
  Modal,
  TextInput,
  CloseButton,
  Title,
} from '@mantine/core';
import { FaCommentDollar, FaSquareFull, FaBed } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { request } from '../../util/fetchApi';
import classes from './propertydetail.module.css';

const PropertyDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { id } = useParams();
  const formRef = useRef();

  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/find/${id}`, 'GET');
        setPropertyDetail(data);
      } catch (error) {}
    };
    fetchDetails();
  }, [id]);

  const handleCloseForm = () => {
    setShowForm(false);
    setTitle('');
    setDesc('');
  };

  const handleContactOwner = async (e) => {
    e.preventDefault();
    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    handleCloseForm();
  };

  return (
    <Box className={classes.container}>
      <Container size='xl' className={classes.wrapper}>
        <Group noWrap>
          <Box className={classes.left}>
            <Image
              src={`https://real-estate-website-mern-m3ux.onrender.com/images/${propertyDetail?.img}`}
              alt={propertyDetail?.title}
              fit='cover'
              height={400}
            />
            <Group className={classes.moreDetails}>
              <Badge
                size='lg'
                variant='gradient'
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                {propertyDetail?.price} AUD {'  '} 
                <FaCommentDollar className={classes.icon} />
              </Badge>
              <Badge
                size='lg'
                variant='gradient'
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                {propertyDetail?.sqmeters}m {'  '} 
                <FaSquareFull className={classes.icon} />
              </Badge>
              <Badge
                size='lg'
                variant='gradient'
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                {propertyDetail?.beds} beds {'  '} 
                <FaBed className={classes.icon} />
              </Badge>
            </Group>
          </Box>
          <Stack className={classes.right}>
            <Title order={3} className={classes.title}>
              Title: {propertyDetail?.title}
            </Title>
            <Stack className={classes.details}>
              <Box className={classes.typeAndAddress}>
                <Text>
                  Type: <Badge>{propertyDetail?.type}</Badge>
                </Text>
                <Text>
                  Address: <Badge>{propertyDetail?.address}</Badge>
                </Text>
              </Box>
              <Group className={classes.descAndOwner} position='apart'>
                <Text className={classes.desc}>
                  Description: {propertyDetail?.desc}
                </Text>
                <Group>
                  <Text>Owner</Text>
                  <Avatar
                    src={`https://real-estate-website-mern-m3ux.onrender.com/images/${propertyDetail?.currentOwner.profileImg}`}
                    className={classes.owner}
                  />
                </Group>
              </Group>
              <Button
                onClick={() => setShowForm(true)}
                className={classes.contactOwner}
              >
                Contact owner
              </Button>
            </Stack>
          </Stack>
        </Group>
        <Modal
          opened={showForm}
          onClose={handleCloseForm}
          title='Send email to owner'
          centered
        >
          <form onSubmit={handleContactOwner} ref={formRef}>
            <TextInput
              value={user?.email}
              type='text'
              placeholder='Email'
              name='from_email'
              readOnly
              className={classes.input}
            />
            <TextInput
              value={user?.username}
              type='text'
              placeholder='Username'
              name='from_username'
              readOnly
              className={classes.input}
            />
            <TextInput
              value={propertyDetail?.currentOwner.email}
              type='email'
              placeholder='Owner email'
              name='to_email'
              readOnly
              className={classes.input}
            />
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              placeholder='Title'
              name='from_title'
              className={classes.input}
            />
            <TextInput
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type='text'
              placeholder='Description'
              name='message'
              className={classes.input}
            />
            <Button type='submit' className={classes.submitButton}>
              Send
            </Button>
          </form>
        </Modal>
      </Container>
    </Box>
  );
};

export default PropertyDetails;
