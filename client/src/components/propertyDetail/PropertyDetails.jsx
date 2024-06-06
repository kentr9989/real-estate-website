import React from 'react';
import classes from './propertydetail.module.css';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useParams } from 'react-router-dom';
import { request } from '../../util/fetchApi';
import { FaCommentDollar } from 'react-icons/fa';
import { FaSquareFull } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

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

  // console.log('Service ID:', serviceId);
  // console.log('Template ID:', templateId);
  // console.log('Public Key:', publicKey);
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

    //send email logic
    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    handleCloseForm();
  };

  // console.log(propertyDetail);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`https://real-estate-website-mern-m3ux.onrender.com/images/${propertyDetail?.img}`} />
          <div className={classes.moreDetails}>
            <span>
              {propertyDetail?.price} AUD
              <FaCommentDollar className={classes.icon} />
            </span>
            <span>
              {propertyDetail?.sqmeters}m
              <FaSquareFull className={classes.icon} />
            </span>
            <span>
              {propertyDetail?.beds} beds
              <FaBed className={classes.icon} />
            </span>
          </div>
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>Title: {`${propertyDetail?.title}`}</h3>
          <div className={classes.details}>
            <div className={classes.typeAndAddress}>
              <div>
                Type : <span>{`${propertyDetail?.type}`}</span>
              </div>
              <div>
                Address : <span>{`${propertyDetail?.address}`}</span>
              </div>
            </div>
            <div className={classes.descAndOwner}>
              <span className={classes.desc}>
                <span>Description: {`${propertyDetail?.desc}`}</span>
              </span>
              <span
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                Owner
                <img
                  src={`https://real-estate-website-mern-m3ux.onrender.com/images/${propertyDetail?.currentOwner.profileImg}`}
                  className={classes.owner}
                />
              </span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className={classes.contactOwner}
            >
              {' '}
              Contact owner
            </button>
          </div>
        </div>
        {showForm && (
          <div className={classes.contactForm} onClick={handleCloseForm}>
            <div
              className={classes.contactFormWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              {' '}
              <h2>Send email to owner</h2>
              <form onSubmit={handleContactOwner} ref={formRef}>
                <input
                  value={user?.email}
                  type='text'
                  placeholder='Email'
                  name='from_email'
                />
                <input
                  value={user?.username}
                  type='text'
                  placeholder='Username'
                  name='from_username'
                />
                <input value={propertyDetail.currentOwner.email} type='email' placeholder='Owner email' name='to_email' />
                <input type='text' placeholder='Title' name='from_title' />
                <input type='text' placeholder='Description' name='message' />
                <button> Send </button>
              </form>
              <AiOutlineClose
                onClick={handleCloseForm}
                className={classes.removeIcon}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
