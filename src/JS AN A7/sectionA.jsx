import React, { Component } from 'react';
import {  Products } from './data';
import AddProduct from './Addproduct';

class App1 extends Component {
  state = {
    products: Products,
    showAddForm: false,
    showTable:true,
    receivedProductCode: '', 
    stocksReceived: '', 
    selectedYear: '', 
    selectedMonth: '', 
    selectedDate: '',
    showStform:false,
    editProductData:null,
      stockformSubmitted:false
  };

  render() {
    const {products,showAddForm,showTable,receivedProductCode,selectedDate,selectedMonth,selectedYear,stocksReceived,showStform}=this.state
    return (
      <div>
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="navbar-brand">
          ProdStoreSys
          </li>
          <li className="nav-link" >
          Products: <span style={{color:"white",borderRadius:"10px",backgroundColor:"grey"}}>{products.length}</span>
          </li>
          <li className="nav-link" >
          Quantity:  <span style={{color:"white",borderRadius:"10px",backgroundColor:"grey"}}>{this.getTotalQuantity()}</span>
          </li>
          <li className="nav-link" >
          Value: <span style={{color:"white",borderRadius:"10px",backgroundColor:"grey"}}>{this.getTotalValue()}</span>
          </li>
          </ul>
          </div>
        </nav>

        {showTable&&(
        <>

        <div className="d-flex flex-row flex-wrap border">
            {products.map((ele) => (
              
              <div className='col-3 text-center border' style={{backgroundColor:" #f2f2f2"}} key={ele.code}>
                <div >Code: {ele.code}</div>
                <div >Brand:{ele.brand}</div>
                <div >Category:{ele.category}</div>
                <div>Price:{ele.price}</div>
                <div>Quantity:{ele.quantity}</div>
                <div>Special offers:{ele.specialOffer ? 'Yes' : 'No'}</div>
                <div>Limited Stocks:{ele.limitedStock ? 'Yes' : 'No'}</div>
                <div>
                  <button className='btn btn-warning' onClick={() => this.editProduct(ele)}>Edit Details</button>
                </div>
              </div>
            ))}
         </div>
        

      
        <div>
          <button className='btn btn-primary' onClick={this.handleAddNewProduct}>Add New Product</button>
          <button className='btn btn-primary' style={{marginLeft:"10px"}} onClick={this.handleReceiveStocks}>Receive Stocks</button>
        </div>
        </>)}
        {showAddForm && (
          <div>
           <AddProduct  onEditProduct={this.handleEditProduct}  editProductData={this.state.editProductData}  onAddProduct={this.handleAddProduct} onGoBack={this.handleGoBack} />
          </div>
        )}
{showStform && (
          <div>
            <h2>Select the Product whose stocks have been received</h2>
            <select
              className="form-select"
              value={receivedProductCode}
              onChange={this.handleReceivedProductChange}
            >
              <option value="">Select Product code</option>
              {products.map((product) => (
                <option key={product.code} value={product.code}>
                  {product.code}
                </option>
              ))}
            </select>
            {this.state.stockformSubmitted && receivedProductCode === "" ?<div style={{backgroundColor:"#f8c4c4"}} ><span style={{ color: "red"}}>Product Code is required</span></div>:""}
            {showStform && (
              <>
              <br/>
                <label>
                  Stocks received:
                  <input
                    type="text"
                    style={{width:"500vh"}}
                    className="form-control"
                    name="stocksReceived"
                    value={stocksReceived}
                    onChange={this.handleInputChange}
                  />
                </label>
                {this.state.stockformSubmitted && stocksReceived === "" ?<div style={{backgroundColor:"#f8c4c4"}} ><span style={{ color: "red"}}>Stocks is required</span></div>:""}
                <br />
                <br/>
                <label>
                  Year:
                  <select
                    className="form-select"
                    style={{marginRight:"5px"}}
                    value={selectedYear}
                    onChange={this.handleYearChange}
                  >
                    <option value="">Select Year</option>
                    {this.generateYears().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
             
                <label>
                  Month:
                  <select
                    className="form-select"
                    style={{marginLeft:"10px"}}
                    value={selectedMonth}
                    onChange={this.handleMonthChange}
                  >
                    <option value="">Select Month</option>
                    {this.generateMonths().map((month,index) => (
                      <option key={month} value={index+1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </label>
              
                <label>
                  Date:
                  <select
                    className="form-select"
                    style={{marginLeft:"20px"}}
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  >
                    <option value="">Select Date</option>
                    {this.generateDates().map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <button className='btn btn-primary' onClick={this.handleStocksReceivedSubmit}>Submit</button>
                <button className='btn btn-primary' style={{marginLeft:"10px"}} onClick={this.handleGoBack1}>Go Back to Homepage</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
  handleEditProduct = (editedProduct) => {
   
    const editedProductIndex = this.state.products.findIndex(
      (product) => product.code === editedProduct.code
    );

    if (editedProductIndex !== -1) {
      
      const updatedProducts = [...this.state.products];
      updatedProducts[editedProductIndex] = editedProduct;

     
      this.setState({
        products: updatedProducts,
        editProductData: null,
      });
    }
  };
  editProduct = (product) => {
   
    this.setState({
      editProductData: {
        ...product,
      },
      showAddForm: true,
      showTable: false,
    });
  };

  handleAddProduct = (newProduct) => {
    this.setState((prevState) => ({
      products: [...prevState.products, newProduct],
      showAddForm: false,
      showTable:true
    }));
  };
 handleReceiveStocks =()=>{
    this.setState({ showStform: true,showTable:false });
 }
  handleGoBack = () => {
    this.setState({
      showAddForm: false,
      showTable:true

    });
  };
  handleGoBack1 = () => {
    this.setState({
      showStform: false,
      showTable:true,
      stockformSubmitted: false

    });
  };
  getTotalQuantity = () => {
    return this.state.products.reduce((total, product) => total + product.quantity, 0);
  };

  getTotalValue = () => {
    return this.state.products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

 
  handleAddNewProduct = () => {
 
    this.setState({ showAddForm: true,showTable:false,editProductData: null });
  };

  handleReceivedProductChange = (event) => {
    this.setState({
      receivedProductCode: event.target.value,
    });
  };


  handleYearChange = (event) => {
    this.setState({
      selectedYear: event.target.value,
      selectedMonth: '', 
      selectedDate: '',
    });
  };


  handleMonthChange = (event) => {
    this.setState({
      selectedMonth: event.target.value,
      selectedDate: '', 
    });
  };

 
  handleDateChange = (event) => {
    this.setState({
      selectedDate: event.target.value,
    });
  };
  generateYears = () => {
    const years = [];
    for (let year = 1900; year <= 2025; year++) {
      years.push(year);
    }
    return years;
  };


 
  generateDates = () => {
    const { selectedYear, selectedMonth } = this.state;
    const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
    const dates = [];
    for (let date = 1; date <= lastDay; date++) {
      dates.push(date);
    }
    return dates;
  };
  generateMonths = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthNames;
  };

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  handleStocksReceivedSubmit = () => {
    const { receivedProductCode, stocksReceived } = this.state;
    const receivedProduct = this.state.products.find((product) => product.code === receivedProductCode);
    
    if (!receivedProductCode ) {
        alert("Enter the Product Code");
        this.setState({ stockformSubmitted: true });
        return;
      }
    
    
      if (!stocksReceived ||isNaN(stocksReceived)) {
    alert("Enter the quantity or enter number");
    this.setState({ stockformSubmitted: true });
        return;
      }
    
    if (receivedProduct) {
      receivedProduct.quantity += parseInt(stocksReceived, 10);
      this.setState({
        receivedProductCode: '',
        stocksReceived: '',
        selectedYear: '',
        selectedMonth: '',
        selectedDate: '',
      });
    }
    this.handleGoBack1();
  };

 
}

export default App1;
