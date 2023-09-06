import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService.js";
class ProdP extends Component {
  state = {
    data: [],
   
  };
  async fetchData() {
    const { id} = this.props.match.params;
   console.log(id);
        let response = await http.get(`/purchases/products/${id}`);
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
        

     
            <h4>Welcome to the Purchases Page</h4>
            <div className="row bg-dark text-white">
              <div
                className="col-2 border"
              >
               PurchaseId
              </div>
              <div
                className="col-2 border"
              >
               ShopID
              </div>
              <div
                className="col-3 border"
              >
               ProductID
              </div>
              <div
                className="col-2 border"
              >
               Price
              </div>
              <div
                className="col-3 border"
              >
               Quantity
              </div>
            
            </div>
            {data.length === 0 ? (
              <h3>No data</h3>
            ) : (
                data.map((pr, index) => (
                    <div className="row"  key={pr.purchaseId}>
                      <div className="col-2 border">{pr.purchaseid}</div>
                      <div className="col-2 border">{pr.shopid}</div>
                      <div className="col-3 border">{pr.productid}</div>
                      <div className="col-2 border">{pr.price}</div>
                      <div className="col-3 border">{pr.quantity}</div>
                    
                    </div>
              ))
            )}
            
          </div>
    );
  }
}
export default ProdP;
