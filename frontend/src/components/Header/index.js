import React, { Component } from 'react';
import {BrowserRouter, Link }  from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavigationBar extends React.Component {
  render() {
    return (
        <div class="topnav">
          <Link to="/category">Categories</Link>
          <Link to="/recent">Recent Uploaded</Link>
          <Link to="/community">Community</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/donate">Donate Us</Link>
        </div>    
    );
  }
}

export default NavigationBar;