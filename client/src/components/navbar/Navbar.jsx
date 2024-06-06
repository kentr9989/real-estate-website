import React from 'react';
import classes from './navbar.module.css';
import { request } from '../../util/fetchApi';
import { Link, useNavigate } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { AiOutlineFileImage, AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleState = (event) => {
    setState((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
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

      await request(`/upload/image`, 'POST', {}, formData, true);
    } else {
      return;
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const data = await request(`/property`, 'POST', options, {
        ...state,
        img: filename,
      });
      setShowForm(false);
      // console.log(data);
      handleCloseForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
          Australia Real Estate Website <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
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
        </ul>
        <div className={classes.right}>
          {!user ? (
            <>
              {' '}
              <Link to='/signup'>Sign up</Link>
              <Link to='/signin'>Sign in</Link>
            </>
          ) : (
            <>
              {' '}
              <span> Hello {user.username} </span>
              <span onClick={handleLogout} className={classes.logoutBtn}>
                Logout
              </span>
              <Link onClick={() => setShowForm(true)} className={classes.list}>
                List your property{' '}
              </Link>
            </>
          )}
        </div>
      </div>
      {showForm && (
        <div onClick={handleCloseForm} className={classes.listPropertyForm}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={classes.listPropertyWrapper}
          >
            <h2> List Property</h2>
            <form onSubmit={handleListProperty}>
              <input
                type='text'
                placeholder='Title'
                name='title'
                onChange={handleState}
              />
              <input
                type='text'
                placeholder='Address'
                name='address'
                onChange={handleState}
              />
              <input
                type='text'
                placeholder='State'
                name='state'
                onChange={handleState}
              />
              <input
                type='text'
                placeholder='Type'
                name='type'
                onChange={handleState}
              />
              <input
                type='text'
                placeholder='Description'
                name='desc'
                onChange={handleState}
              />
              <input
                type='number'
                placeholder='Price'
                name='price'
                onChange={handleState}
              />
              <input
                type='number'
                placeholder='Area (square meteres)'
                name='sqmeters'
                onChange={handleState}
              />
              <input
                type='number'
                placeholder='Number of beds'
                step={1}
                min={1}
                name='beds'
                onChange={handleState}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '50%',
                }}
              >
                <label htmlFor='photo'>
                  Upload property picture <AiOutlineFileImage />
                </label>
                <input
                  type='file'
                  id='photo'
                  style={{ display: 'none' }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && <p>{photo.name}</p>}
              </div>
              <button> List property</button>
            </form>
            <AiOutlineClose
              onClick={handleCloseForm}
              className={classes.removeIcon}
            />
          </div>
        </div>
      )}
      {
        <div className={classes.mobileNav}>
          {showMobileNav && (
            <div className={classes.navigation}>
              <Link to='/' className={classes.left}>
                Australia Real Estate Website <BsHouseDoor />
              </Link>
              <AiOutlineClose
                onClick={() => setShowMobileNav(false)}
                className={classes.mobileCloseIcon}
              />
              <ul className={classes.center}>
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
              </ul>
              <div className={classes.right}>
                {!user ? (
                  <>
                    {' '}
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/signin'>Sign in</Link>
                  </>
                ) : (
                  <>
                    {' '}
                    <span> Hello {user.username} </span>
                    <span onClick={handleLogout} className={classes.logoutBtn}>
                      Logout
                    </span>
                    <Link
                      onClick={() => setShowForm(true)}
                      className={classes.list}
                    >
                      List your property{' '}
                    </Link>
                  </>
                )}
              </div>
              {showForm && showMobileNav && (
                <div
                  onClick={handleCloseForm}
                  className={classes.listPropertyForm}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={classes.listPropertyWrapper}
                  >
                    <h2> List Property</h2>
                    <form onSubmit={handleListProperty}>
                      <input
                        type='text'
                        placeholder='Title'
                        name='title'
                        onChange={handleState}
                      />
                      <input
                        type='text'
                        placeholder='Address'
                        name='address'
                        onChange={handleState}
                      />
                      <input
                        type='text'
                        placeholder='State'
                        name='state'
                        onChange={handleState}
                      />
                      <input
                        type='text'
                        placeholder='Type'
                        name='type'
                        onChange={handleState}
                      />
                      <input
                        type='text'
                        placeholder='Description'
                        name='desc'
                        onChange={handleState}
                      />
                      <input
                        type='number'
                        placeholder='Price'
                        name='price'
                        onChange={handleState}
                      />
                      <input
                        type='number'
                        placeholder='Area (square meteres)'
                        name='sqmeters'
                        onChange={handleState}
                      />
                      <input
                        type='number'
                        placeholder='Number of beds'
                        step={1}
                        min={1}
                        name='beds'
                        onChange={handleState}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          width: '50%',
                        }}
                      >
                        <label htmlFor='photo'>
                          Upload property picture <AiOutlineFileImage />
                        </label>
                        <input
                          type='file'
                          id='photo'
                          style={{ display: 'none' }}
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {photo && <p>{photo.name}</p>}
                      </div>
                      <button> List property</button>
                    </form>
                    <AiOutlineClose
                      onClick={handleCloseForm}
                      className={classes.removeIcon}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {!showMobileNav && (
            <GiHamburgerMenu
              className={classes.hamburgerIcon}
              onClick={() => setShowMobileNav((prev) => !prev)}
            />
          )}
        </div>
      }
    </div>
  );
};

export default Navbar;
