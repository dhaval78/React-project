import React, { Component } from "react";
import http from "./httpService.js";
import queryString from "query-string";

class Purchases extends Component {
  state = {
    data: [],
  };

  async fetchData() {

    try {
        let queryParams=queryString.parse(this.props.location.search)
        let x= queryString.stringify(queryParams)
      let response = await http.get(`/purchases?${x}`);
      let { data } = response;
      this.setState({ data: data });
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  componentDidMount() {
    this.fetchData();
   
  }

  componentDidUpdate(prevProps,prevState){
     
    if(prevProps!==this.props)
      this.fetchData();
  
  }
  handleShopChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    const selectedValue = event.target.value;
  
    if (!queryParams.shop) {
      queryParams.shop = [selectedValue]; 
    } else if (Array.isArray(queryParams.shop)) {
      const index = queryParams.shop.indexOf(selectedValue);
  
      if (index === -1) {
        queryParams.shop.push(selectedValue);
      } else {
        queryParams.shop.splice(index, 1);
        if (queryParams.shop.length === 0) {
          delete queryParams.shop; 
        }
      }
    } else if (queryParams.shop === selectedValue) {
      delete queryParams.shop; 
    } else {
      queryParams.shop = [queryParams.shop, selectedValue];
    }
  
   
    this.props.history.push({
      search: queryString.stringify(queryParams),
    });
  };
  
  
  
  handleProdChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    const selectedValue = event.target.value;
    if (selectedValue === "") {
        delete queryParams["product"];
      } else {
        queryParams["product"] = selectedValue;
      }
    this.setQueryParams(queryParams);

  };
  handleSortChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    const selectedValue = event.target.value;
    if (selectedValue === "") {
        delete queryParams["sort"];
      } else {
        queryParams["sort"] = selectedValue;
      }
    this.setQueryParams(queryParams);

  };

  setQueryParams(queryParams) {
    this.props.history.push({
        search:queryString.stringify(queryParams)
    })


  }


  render() {
    let queryParams=queryString.parse(this.props.location.search)
    const shopOptions = [
      { value: "1", label: "Sector 25, Gurgaon" },
      { value: "2", label: "Sector 53, Gurgaon" },
      { value: "3", label: "Greater Kailash, Delhi" },
      { value: "4", label: "Mall of India, Noida" },
    ];

    const productOptions = [
      { value: "1", label: "Pepsi Can" },
      { value: "2", label: "Pepsi PET" },
      { value: "3", label: "Diet Coke" },
      { value: "4", label: "Mazaa" },
      { value: "5", label: "Dairy Milk" },
      { value: "6", label: "Fruit & Nut" },
      { value: "7", label: "Silk - Crackles" },
      { value: "8", label: "Perk" },
    ];

    const sortOptions = [
    { value: "QtyAsc", label: "Quantity (Ascending)" },
      { value: "QtyDesc", label: "Quantity (Desending)" },
      { value: "ValueAsc", label: "Value (Ascending)" },
      { value: "ValueDesc", label: "Value (Descending)" },
    ];

    const { data } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="left-panel">
              <h4>Filters</h4>
              <h3>Shop</h3>
              <div className="d-flex flex-column">
              {shopOptions.map((opt, index) => (
                  <label style={{ textTransform: "capitalize" }} key={index}>
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={queryParams.shop && queryParams.shop.includes(opt.value)}
                      onChange={this.handleShopChange}
                    />
                    {opt.label}
                  </label>
                ))}
                
              </div>
              <h3> Product</h3>
              <div className="d-flex flex-column">
              <select
           value={queryParams["product"]||""}
           onChange={this.handleProdChange}>
                <option value="">None</option>
              {productOptions.map((opt, index) => (
          
           
           <option value={opt.value}>{opt.label}</option>
           
        ))}
        </select>
                
              </div>
              <h3> Sort</h3>
              <div className="d-flex flex-column">
              <select
           value={queryParams["sort"]||""}
           onChange={this.handleSortChange}>
                <option value="">None</option>
              {sortOptions.map((opt, index) => (
          
           
           <option value={opt.value}>{opt.label}</option>
           
        ))}
        </select>
                
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h4>Welcome to the Purchases Page</h4>
            <div className="row bg-dark text-white">
              <div className="col-2 border">PurchaseId</div>
              <div className="col-2 border">ShopID</div>
              <div className="col-3 border">ProductID</div>
              <div className="col-2 border">Price</div>
              <div className="col-3 border">Quantity</div>
            </div>
            {data.length === 0 ? (
              <h3>No data</h3>
            ) : (
              data.map((pr, index) => (
                <div className="row" key={pr.purchaseId}>
                  <div className="col-2 border">{pr.purchaseid}</div>
                  <div className="col-2 border">{pr.shopid}</div>
                  <div className="col-3 border">{pr.productid}</div>
                  <div className="col-2 border">{pr.price}</div>
                  <div className="col-3 border">{pr.quantity}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Purchases;


