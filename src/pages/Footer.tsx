import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-main">
          <div className="footer-info">
            <h3>Luton Welfare Association</h3>
            <p>Building stronger communities through unity, support, and collective action. Join us in making a difference in Luton.</p>
            <div className="social-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Membership</a></li>
                <li><a href="#">Donations</a></li>
                <li><a href="#">Newsletter</a></li>
                <li><a href="#">Career Portal</a></li>
                <li><a href="#">Mentorship</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4>Contact Info</h4>
              <ul className="contact-info">
                <li>Luton Welfare Association</li>
                <li>Address:</li>
                <li>Email: </li>
                <li>Phone: </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Luton Welfare Association. All Rights Reserved.</p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
