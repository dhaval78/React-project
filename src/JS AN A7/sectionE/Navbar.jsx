import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,withRouter,NavLink } from 'react-router-dom';
import './n.css'

class Navbar extends Component {


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="navbar-brand">MyCompany</li>
            <li className="nav-link" >
              <NavLink to="/emps/All" >All</NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/emps/New Delhi" >New Delhi</NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/emps/Noida" >Noida</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
