import React, { useState } from 'react';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Modal,
  TextInput,
  NumberInput,
  Stack,
  FileInput,
  Select,
} from '@mantine/core';
import { AiOutlineFileImage, AiOutlineClose } from 'react-icons/ai';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { request } from '../../util/fetchApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import { BsHouseDoor } from 'react-icons/bs';
import classes from './Navbar.module.css';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { user, token } = useSelector((state) => state.auth);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleState = (event) => {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSelectState = (value) => {
    setState((prev) => ({ ...prev, state: value }));
  };

  const handleSelectType = (value) => {
    setState((prev) => ({ ...prev, type: value }));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };

  const handleListProperty = async (e) => {
    e.preventDefault();

    let filename = null;
    if (photo) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append('filename', filename);
      formData.append('image', photo);

      try {
        await request(`/upload/image`, 'POST', {}, formData, true);
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return;
      }
    } else {
      console.error('No photo selected');
      return;
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const requestBody = {
        ...state,
        img: filename,
      };

      console.log('Request Body:', requestBody); // Log the request body for debugging

      const data = await request(`/property`, 'POST', options, requestBody);
      console.log('Response Data:', data); // Log the response data for debugging
      setShowForm(false);
      handleCloseForm();
    } catch (error) {
      console.error('Property listing failed:', error);
    }
  };

  return (
    <Box pb={10}>
      <header className={classes.header}>
        <Group justify='space-between' h='100%'>
          <Link
            to='/'
            className={classes.left}
            style={{ color: 'blueviolet', textDecoration: 'none' }}
          >
            OZ Real Estate <BsHouseDoor size={25} />
          </Link>

          <Group
            h='100%'
            gap={30}
            visibleFrom='sm'
            justify='space-between'
            mt={10}
          >
            <Link to='/' className={classes.listItem}>
              Home
            </Link>
            <Link to='/about' className={classes.listItem}>
              About
            </Link>
            <Link to='/featured' className={classes.listItem}>
              Featured
            </Link>
            <Link to='/about' className={classes.listItem}>
              Contact
            </Link>
          </Group>

          <Group
            visibleFrom='md'
            className={classes.right}
            gap='xs'
            grow
            mr={10}
            mt={10}
          >
            {!user ? (
              <>
                <Button variant='filled' color='blueviolet'>
                  <Link
                    to='/signup'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Sign up
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <span className={classes.helloMsg}>👋 {user.username}</span>
                <Button
                  variant='subtle'
                  onClick={handleLogout}
                  className={classes.logoutBtn}
                >
                  Logout
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setShowForm(true)}
                  className={classes.list}
                >
                  List your property
                </Button>
              </>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom='sm'
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        hiddenFrom='sm'
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
          <Link
            to='/'
            className={classes.left}
            style={{
              color: 'blueviolet',
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            OZ Real Estate <BsHouseDoor size={25} />
          </Link>

          <Divider my='sm' />
          <Stack
            h={300}
            bg='var(--mantine-color-body)'
            align='center'
            justify='center'
            gap='lg'
          >
            <Link to='/' className={classes.listItem}>
              Home
            </Link>
            <Link to='/about' className={classes.listItem}>
              About
            </Link>
            <Link to='/featured' className={classes.listItem}>
              Featured
            </Link>
            <Link to='/about' className={classes.listItem}>
              Contact
            </Link>
          </Stack>

          <Divider my='sm' />

          <Group justify='center' grow pb='xl' px='md'>
            <Button
              variant='outline'
              onClick={() => setShowForm(true)}
              className={classes.list}
            >
              List your property
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
      <Modal
        opened={showForm}
        onClose={handleCloseForm}
        title='List Property'
        scrollAreaComponent={ScrollArea.Autosize}
        className={classes.modalContainer}
      >
        <form onSubmit={handleListProperty}>
          <TextInput
            label='Title'
            placeholder='Title'
            name='title'
            onChange={handleState}
            className={classes.input}
          />
          <TextInput
            label='Address'
            placeholder='Address'
            name='address'
            onChange={handleState}
            className={classes.input}
          />
          <Select
            label='State'
            placeholder='Select state'
            name='state'
            onChange={handleSelectState}
            data={[
              { value: 'NSW', label: 'New South Wales' },
              { value: 'VIC', label: 'Victoria' },
              { value: 'WA', label: 'Western Australia' },
              { value: 'SA', label: 'South Australia' },
              { value: 'TAS', label: 'Tasmania' },
            ]}
            className={classes.input}
          />
          <Select
            label='Type'
            placeholder='Select type'
            name='type'
            onChange={handleSelectType}
            data={[
              { value: 'house', label: 'House' },
              { value: 'apartment', label: 'Apartment' },
              { value: 'duplex', label: 'Duplex' },
              { value: 'townhouse', label: 'Townhouse' },
            ]}
            className={classes.input}
          />
          <TextInput
            label='Description'
            placeholder='Description'
            name='desc'
            onChange={handleState}
            className={classes.input}
          />
          <NumberInput
            label='Price'
            placeholder='Price'
            name='price'
            onChange={(value) =>
              setState((prev) => ({ ...prev, price: value }))
            }
            className={classes.input}
          />
          <NumberInput
            label='Area (square meters)'
            placeholder='Area (square meters)'
            name='sqmeters'
            onChange={(value) =>
              setState((prev) => ({ ...prev, sqmeters: value }))
            }
            className={classes.input}
          />
          <NumberInput
            label='Number of beds'
            placeholder='Number of beds'
            name='beds'
            step={1}
            min={1}
            onChange={(value) => setState((prev) => ({ ...prev, beds: value }))}
            className={classes.input}
          />
          <FileInput
            label='Upload property picture'
            placeholder='Choose file'
            icon={<AiOutlineFileImage />}
            onChange={setPhoto}
            className={classes.fileInput}
          />
          {photo && <Text>{photo.name}</Text>}
          <Button
            type='submit'
            size='xs'
            className={classes.submitButton}
            fullWidth
            mt={10}
          >
            List property
          </Button>
        </form>
      </Modal>
    </Box>
  );
}

export default Navbar;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { request } from '../../util/fetchApi';
// import { logout } from '../../redux/authSlice';
// import {
//   Container,
//   Group,
//   Paper,
//   Text,
//   Button,
//   TextInput,
//   NumberInput,
//   FileInput,
//   Title,
//   Modal,
//   NavLink,
//   ScrollArea,
// } from '@mantine/core';
// import { BsHouseDoor } from 'react-icons/bs';
// import {
//   IconHome,
//   IconInfoCircle,
//   IconStar,
//   IconPhone,
//   IconBuildingCommunity,
//   IconUpload,
// } from '@tabler/icons-react';
// import { AiOutlineFileImage, AiOutlineClose } from 'react-icons/ai';

// import { GiHamburgerMenu } from 'react-icons/gi';
// import classes from './navbar.module.css';

// const Navbar = () => {
//   const [state, setState] = useState({});
//   const [photo, setPhoto] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const { user, token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/signin');
//   };

//   const handleState = (event) => {
//     setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setPhoto(null);
//     setState({});
//   };

//   const handleListProperty = async (e) => {
//     e.preventDefault();

//     let filename = null;
//     if (photo) {
//       const formData = new FormData();
//       filename = crypto.randomUUID() + photo.name;
//       formData.append('filename', filename);
//       formData.append('image', photo);

//       await request(`/upload/image`, 'POST', {}, formData, true);
//     } else {
//       return;
//     }

//     try {
//       const options = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//       const data = await request(`/property`, 'POST', options, {
//         ...state,
//         img: filename,
//       });
//       setShowForm(false);
//       handleCloseForm();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className={classes.container}>
//       <Container size='ld' className={classes.wrapper}>
//         <Group className={classes.nav}>
//           <Link to='/' className={classes.left}>
//             Australia Real Estate Website <BsHouseDoor />
//           </Link>
//           <Group className={classes.center}>
//             <Link to='/' className={classes.listItem}>
//               <IconHome className={classes.icon} size={20} /> Home
//             </Link>
//             <Link to='/about' className={classes.listItem}>
//               <IconInfoCircle className={classes.icon} size={20} /> About
//             </Link>
//             <Link to='/featured' className={classes.listItem}>
//               <IconStar className={classes.icon} size={20} /> Featured
//             </Link>
//             <Link to='/contact' className={classes.listItem}>
//               <IconPhone className={classes.icon} size={20} /> Contact
//             </Link>
//           </Group>
//           <Group className={classes.right} gap='sm'>
//             {!user ? (
//               <>
//                 <Link to='/signup'>Sign up</Link>
//                 <Link to='/signin'>Sign in</Link>
//               </>
//             ) : (
//               <>
//                 <span className={classes.helloMsg}>👋 {user.username}</span>
//                 <Button
//                   variant='subtle'
//                   onClick={handleLogout}
//                   className={classes.logoutBtn}
//                 >
//                   Logout
//                 </Button>
//                 <Button
//                   variant='outline'
//                   onClick={() => setShowForm(true)}
//                   className={classes.list}
//                 >
//                   List your property
//                 </Button>
//               </>
//             )}
//           </Group>
//         </Group>
//       </Container>

//     </div>
//   );
// };

// export default Navbar;
