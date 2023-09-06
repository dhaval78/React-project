import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService.js";
class Shops extends Component {
  state = {
    data: [],
   
  };
  async fetchData() {
    const { location } = this.props;
   
        let response = await http.get(`/shops`);
        console.log(response);
        let { data } = response;
        this.setState({ data: data });
    
    
   
    }
   
    
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }


  render() {
    const { data } =
      this.state;

    return (
      <div className="container">
        

     
            <h4>Welcome to the Shop Page</h4>
            <div className=" row bg-dark text-white"  >
              <div
                className="col-3 border"
              >
               ShopId
              </div>
              <div
                className="col-2 border"
              
              >
               Shop Name
              </div>
              <div
                className="col-3 border"
              
              >
               Rent
              </div>
             
              <div className="col-2"></div>
              <div className="col-2"></div>
            </div>
            {data.map((pr, index) => (
              <div className="row" key={pr.shopid}>
                <div className="col-3 border">{pr.shopid}</div>
                <div className="col-2 border">{pr.shopname}</div>
                <div className="col-3 border">{pr.rent}</div>
                <div className="col-2 border">
                  <Link
                    className="btn btn-info btn-sm"
                    to={`/shop/${pr.shopid}/purchases`}
                  >
                    Purchases
                  </Link>{" "}
                </div>
                <div className="col-2 border">
                  <Link
                    className="btn btn-dark btn-sm"
                    to={`/shop/${pr.shopid}/totalpurchases`}
                  >
                    Total Purchases
                  </Link>
                </div>
              </div>
            ))}
          </div>
    );
  }
}
export default Shops;
