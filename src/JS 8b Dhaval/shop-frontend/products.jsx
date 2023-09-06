import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService.js";
class Products extends Component {
  state = {
    data: [],
   
  };
  async fetchData() {
    const { location } = this.props;
   
        let response = await http.get(`/products`);
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
        

     
            <h4>Welcome to the Products Page</h4>
            <div className=" row bg-dark text-white"  >
              <div
                className="col-2 border"
              >
               ProductId
              </div>
              <div
                className="col-2 border"
              
              >
               Product Name
              </div>
              <div
                className="col-2 border"
              
              >
               Category
              </div>
              <div
                className="col-2 border"
              
              >
               Description
              </div>
             
              <div className="col-1"></div>
              <div className="col-1"></div>
              <div className="col-2"></div>
            </div>
            {data.map((pr, index) => (
              <div className="row" key={pr.productId}>
                <div className="col-2 border">{pr.productId}</div>
                <div className="col-2 border">{pr.productName}</div>
                <div className="col-2 border">{pr.category}</div>
                <div className="col-2 border">{pr.description}</div>
                <div className="col-1 border">
                  <Link
                    className="btn btn-secondary btn-sm"
                    to={`/product/${pr.productId}/edit`}
                  >
                    Edit
                  </Link>{" "}
                </div>
                <div className="col-1 border">
                  <Link
                    className="btn btn-info btn-sm"
                    to={`/product/${pr.productId}/purchases`}
                  >
                    Purchases
                  </Link>{" "}
                </div>
                <div className="col-2 border">
                  <Link
                    className="btn btn-dark btn-sm"
                    to={`/product/${pr.productId}/totalpurchases`}
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
export default Products;
