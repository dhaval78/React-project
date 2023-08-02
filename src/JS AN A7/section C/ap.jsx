import React, { Component } from 'react';
import ProductList from './ProductList';

const billData =   [
    {
      code: "PEP221",
      prod: "Pepsi",
      price: 12,
      instock: "Yes",
      category: "Beverages",
    },
    {
      code: "COK113",
      prod: "Coca Cola",
      price: 18,
      instock: "Yes",
      category: "Beverages",
    },
    {
      code: "MIR646",
      prod: "Mirinda",
      price: 15,
      instock: "No",
      category: "Beverages",
    },
    {
      code: "SLI874",
      prod: "Slice",
      price: 22,
      instock: "Yes",
      category: "Beverages",
    },
    {
      code: "MIN654",
      prod: "Minute Maid",
      price: 25,
      instock: "Yes",
      category: "Beverages",
    },
    {
      code: "APP652",
      prod: "Appy",
      price: 10,
      instock: "No",
      category: "Beverages",
    },
    {
      code: "FRO085",
      prod: "Frooti",
      price: 30,
      instock: "Yes",
      category: "Beverages",
    },
    {
      code: "REA546",
      prod: "Real",
      price: 24,
      instock: "No",
      category: "Beverages",
    },
    {
      code: "DM5461",
      prod: "Dairy Milk",
      price: 40,
      instock: "Yes",
      category: "Chocolates",
    },
    {
      code: "KK6546",
      prod: "Kitkat",
      price: 15,
      instock: "Yes",
      category: "Chocolates",
    },
    {
      code: "PER5436",
      prod: "Perk",
      price: 8,
      instock: "No",
      category: "Chocolates",
    },
    {
      code: "FST241",
      prod: "5 Star",
      price: 25,
      instock: "Yes",
      category: "Chocolates",
    },
    {
      code: "NUT553",
      prod: "Nutties",
      price: 18,
      instock: "Yes",
      category: "Chocolates",
    },
    {
      code: "GEM006",
      prod: "Gems",
      price: 8,
      instock: "No",
      category: "Chocolates",
    },
    {
      code: "GD2991",
      prod: "Good Day",
      price: 25,
      instock: "Yes",
      category: "Biscuits",
    },
    {
      code: "PAG542",
      prod: "Parle G",
      price: 5,
      instock: "Yes",
      category: "Biscuits",
    },
    {
      code: "MON119",
      prod: "Monaco",
      price: 7,
      instock: "No",
      category: "Biscuits",
    },
    {
      code: "BOU291",
      prod: "Bourbon",
      price: 22,
      instock: "Yes",
      category: "Biscuits",
    },
    {
      code: "MAR951",
      prod: "MarieGold",
      price: 15,
      instock: "Yes",
      category: "Biscuits",
    },
    {
      code: "ORE188",
      prod: "Oreo",
      price: 30,
      instock: "No",
      category: "Biscuits",
    },
  ]

class App3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmployee: false,
    };
  }

  handleShowEmployee = () => {

    this.setState({ showEmployee: true });
  };

  render() {
    const { showEmployee } = this.state;

    return (
      <div className="">
        {showEmployee ? (
          <div className="billing-system">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">';
            <a class="navbar-brand" href='#'>Billing System</a>';
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">';
            <span class="navbar-toggler-icon"></span>';
             </button>
             <div class="collapse navbar-collapse" id="navbarNavDropdown">
             <ul class="navbar-nav">
             <li class="nav-item active">
             <a class="nav-link"  onClick={this.handleShowEmployee}>Show Employee</a>
             </li>
             </ul>
             </div>
             </nav>

            <h2>Details of Current Bill</h2>
         
            <ProductList billData={billData} />
          </div>
        ) : (<>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">';
            <a class="navbar-brand" href='#'>Billing System</a>';
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">';
            <span class="navbar-toggler-icon"></span>';
             </button>
             <div class="collapse navbar-collapse" id="navbarNavDropdown">
             <ul class="navbar-nav">
             <li class="nav-item active">
             <a class="nav-link"  onClick={this.handleShowEmployee}>Show Employee</a>
             </li>
             </ul>
             </div>
             </nav>
             <h2>Details of Current Bill</h2>
             Items:0 Quantity:0 Amount:0
             <h2>Product List</h2>
        <div className="d-flex">
          <p>Filter Product By:</p>
          <div>
            <label>
              Select Category:
              <select >
                <option value="">Select the category</option>
                <option value="Beverages">Beverages</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Biscuits">Biscuits</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Select In Stock:
              <select >
                <option value="">Select In Stock</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Select Price Range:
              <select >
                <option value="">Select Price</option>
                <option value="<10">&lt;10</option>
                <option value="10-20">10-20</option>
                <option value=">20">&gt;20</option>
              </select>
            </label>
          </div>
        </div>

             </>


        )}
      </div>
    );
  }
}

export default App3;
