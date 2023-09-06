import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component {


  render() {
   let shops= ["view", "add"];
   let products=["view", "add"];
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="navbar-brand">Shop Portal</li>
            <li className="nav-link"  >
              <Link to="/purchases" style={{textDecorationLine:"none",color:"white"}} > Purchases</Link>
              
            </li>
        
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
            Shops
              </a>

              <ul className="dropdown-menu">
                {shops.map((n1, index) => (
                  <li>
                    <Link
                      key={index}
                      className="dropdown-item"
                      to={`/shops/${n1}`}
                    >
                      {n1}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
            Products
              </a>

              <ul className="dropdown-menu">
                {products.map((n1, index) => (
                  <li>
                    <Link
                      key={index}
                      className="dropdown-item"
                      to={`/products/${n1}`}
                    >
                      {n1}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-link"  >
              <Link to="/purchases/add" style={{textDecorationLine:"none",color:"white"}} > Add Purchase</Link>
              
            </li>
           

          </ul>

        </div>
      </nav>
    );
  }
}

export default Navbar;
