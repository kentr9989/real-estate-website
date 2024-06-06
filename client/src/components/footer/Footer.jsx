import React from 'react';
import classes from './footer.module.css';

const Footer = () => {
  return (
    <footer>
      {' '}
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2> About the website</h2>
          <p>
            The website is about providing current update on Australia real estate
            to help buyers and sellers to interact and communicate in an easiest way.
            

          </p>
        </div>

        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +123 456 789</span>
          <span>Email: kentr9989@gmail.com</span>
          <span>Linkedin: kentr9989@gmail.com</span>
        </div>

        <div className={classes.col}>
          <h2>Location</h2>
          <span>Bankstown 2200</span>
          <span>New South Wales</span>
          <span>Australia</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
