import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,withRouter} from 'react-router-dom';
import {Link} from "react-router-dom";
import queryString from "query-string";

class Navbar extends Component {


  render() {
    const { maxResults,onNavbarLinkClick,HandleSearch,location} = this.props;
    let queryParams = queryString.parse(this.props.location.search)
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="navbar-brand" style={{color:"black"}}> <Link style={{textDecorationLine:"none",color:"black"}} onClick={() => {
                  HandleSearch(); 
                }}    to="/"><i class="fa fa-book-open" aria-hidden="true"></i></Link>
              </li>   
            <li  className="nav-link" >
              <Link style={{textDecorationLine:"none",color:queryParams.q==="Agatha Christie"?"Blue":"Black"}}  onClick={() => {
                  onNavbarLinkClick(); 
                }}   to={{
        pathname: '/books',
        search: `?q=Agatha Christie&startIndex=0&maxResults=${maxResults}`,
      }}>Agatha Christie</Link> 
            </li>
            <li  className="nav-link" >
              <Link style={{textDecorationLine:"none",color:queryParams.q==="Harry Potter"?"Blue":"Black"}}  onClick={() => {
                  onNavbarLinkClick();
                }}   to={{
        pathname: '/books',
        search: `?q=Harry Potter&startIndex=0&maxResults=${maxResults}`,
      }}>Harry Potter</Link> 
            </li>
            <li className="nav-link" >
            <Link style={{textDecorationLine:"none",color:queryParams.q==="Premchand"?"Blue":"Black"}}  onClick={() => {
                  onNavbarLinkClick(); 
                }}   to={{
        pathname: '/books',
        search: `?q=Premchand&startIndex=0&maxResults=${maxResults}`,
      }}>Premchand</Link> 
            </li>
            <li className="nav-link" >
            <Link style={{textDecorationLine:"none",color:queryParams.q==="Jane Austen"?"Blue":"Black"}}   onClick={() => {
                  onNavbarLinkClick(); 
                }}  to={{
        pathname: '/books',
        search: `?q=Jane Austen&startIndex=0&maxResults=${maxResults}`,
      }}>Jane Austen</Link>
              
            </li>
            <li className="nav-link" >
            <Link style={{textDecorationLine:"none",color:location.pathname==="/mybooks"?"Blue":"Black"}}  onClick={() => {
                  onNavbarLinkClick();
                }}   to="/mybooks">My books</Link>
              </li>
            <li className="nav-link" >
            <Link style={{textDecorationLine:"none",color:location.pathname==="/book/settings"?"Blue":"Black"}}  onClick={() => {
                  onNavbarLinkClick(); 
                }}   to="/book/settings">Settings</Link>
              </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
