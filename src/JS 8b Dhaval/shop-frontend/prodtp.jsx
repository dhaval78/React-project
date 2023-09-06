import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService.js";
class ShopTP extends Component {
  state = {
    data: [],
   
  };
  async fetchData() {
    const { id} = this.props.match.params;
   console.log(id);
        let response = await http.get(`/totalPurchase/product/${id}`);
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
      const shopWiseTotalPurchase = data.shopWiseTotalPurchase || [];
    return (
      <div className="container">
        

    
            <h4>Total Purchases</h4>
            <div className="row bg-dark text-white" style={{width:"51%"}}>
              <div
                className="col-6 border"
              >
               Shop Address
              </div>
              <div
                className="col-6 border"
              >
               Total Quantity
              </div>
             
            
            </div>

            {shopWiseTotalPurchase.length===0 ? (
              <h3>No data</h3>
            ) : (
                shopWiseTotalPurchase.map((pr, index) => (
                    <div className="row"  key={index}>
                      <div className="col-3 border">{pr.shopName}</div>
                      <div className="col-3 border">{pr.totalPurchase}</div>
                    
                    </div>
              ))
            )}
            
          </div>
    );
  }
}
export default ShopTP;
