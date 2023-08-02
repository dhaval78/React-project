import React, { Component } from 'react';

class ProductList extends Component {

    state = {
      category: '',
      inStock: '',
      priceRange: '',
      sortedColumn: null,
      sortOrder: 'asc',
      billItems: [], 
    };
  

  
  handleAddToBill = (item) => {
    const { billItems } = this.state;


    const existingItem = billItems.find((billItem) => billItem.code === item.code);

    if (existingItem) {
  
      const updatedBillItems = billItems.map((billItem) =>
        billItem.code === item.code ? { ...billItem, quantity: billItem.quantity + 1 } : billItem
      );
      this.setState({ billItems: updatedBillItems });
    } else {
  
      const newItem = {
        code: item.code,
        prod: item.prod,
        price: item.price,
        quantity: 1,
      };
      this.setState({ billItems: [...billItems, newItem] });
    }
  };


  handleIncrementQuantity = (item) => {
    const { billItems } = this.state;
    const updatedBillItems = billItems.map((billItem) =>
      billItem.code === item.code ? { ...billItem, quantity: billItem.quantity + 1 } : billItem
    );
    this.setState({ billItems: updatedBillItems });
  };

  handleDecrementQuantity = (item) => {
    const { billItems } = this.state;
    const updatedBillItems = billItems.map((billItem) =>
      billItem.code === item.code ? { ...billItem, quantity: Math.max(billItem.quantity - 1, 1) } : billItem
    );
    this.setState({ billItems: updatedBillItems });
  };

  handleRemoveFromBill = (item) => {
    const { billItems } = this.state;
    const updatedBillItems = billItems.filter((billItem) => billItem.code !== item.code);
    this.setState({ billItems: updatedBillItems });
  };

  handleCloseBill = () => {
    this.setState({ billItems: [] });
    alert('Bill is closed. All items are removed.');
  };
  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value,
      
    });
    if(e.target.value==="")
    {this.setState({ sortedColumn: null})}
  };

  handleInStockChange = (e) => {
    this.setState({ inStock: e.target.value,
       });
       if(e.target.value==="")
    {this.setState({ sortedColumn: null})}
  };

  handlePriceRangeChange = (e) => {
    this.setState({ priceRange: e.target.value });
    if(e.target.value==="")
    {this.setState({ sortedColumn: null})}
  };

  handleSort = (column) => {
    this.setState({
        sortedColumn: column,
        sortOrder: 'asc',
      })
  };

  render() {
    const { billData } = this.props;
    const { category, inStock, priceRange, sortedColumn, sortOrder,billItems } = this.state;

 
    let filteredData = billData;
    if (category) {
      filteredData = filteredData.filter((item) => item.category === category);
    }
    if (inStock) {
      filteredData = filteredData.filter((item) => item.instock === inStock);
    }

    if (priceRange) {
      if (priceRange === '<10') {
        filteredData = filteredData.filter((item) => item.price < 10);
      } else if (priceRange === '10-20') {
        filteredData = filteredData.filter((item) => item.price >= 10 && item.price <= 20);
      } else if (priceRange === '>20') {
        filteredData = filteredData.filter((item) => item.price > 20);
      }
    }

    if (sortedColumn) {
        filteredData.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortedColumn] < b[sortedColumn] ? -1 : 1;
          } else {
            return b[sortedColumn] < a[sortedColumn] ? -1 : 1;
          }
        });
      }
    return (
      <div className="product-list">
 Items:{billItems.length} Quantity:{billItems.reduce((total, item) => total + item.quantity, 0)} Amount:{ billItems.reduce((total, item) => total + item.price * item.quantity,0)}
{billItems.map((item) => (
              <div className="row " key={item.code}>
                <div className="col-3 border">{item.code},{item.prod},Price:{item.price},Quantity:{item.quantity},Value:{item.price * item.quantity}</div>
                <div className="col-sm ">
                  <button style={{backgroundColor:"greenyellow"}} onClick={() => this.handleIncrementQuantity(item)}>+</button>
                  <button style={{backgroundColor:"yellow"}} onClick={() => this.handleDecrementQuantity(item)}>-</button>
                  <button style={{backgroundColor:"red"}} onClick={() => this.handleRemoveFromBill(item)}>X</button>
                </div>
              </div>
            ))}
           {billItems.length!==0 && ( <div className="col">
                <button className='btn btn-primary' onClick={this.handleCloseBill}>Close Bill</button>
              </div>)}
        <h2>Product List</h2>
        <div className="d-flex">
          <p>Filter Product By:</p>
         
           <div>
              Select Category:
              <select  value={category} onChange={this.handleCategoryChange}>
                <option value="">Select the Category</option>
                <option value="Beverages">Beverages</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Biscuits">Biscuits</option>
              </select>
              </div>
          
          <div>
            <label>
              Select In Stock:
              <select  value={inStock} onChange={this.handleInStockChange}>
                <option value="">Select the Stock</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Select Price Range:
              <select  value={priceRange} onChange={this.handlePriceRangeChange}>
                <option value="">Select the Price</option>
                <option value="<10">&lt;10</option>
                <option value="10-20">10-20</option>
                <option value=">20">&gt;20</option>
              </select>
            </label>
          </div>
        </div>

        <div>
         
            <div className='row bg-dark text-white'>
              <div className='col border' onClick={() => this.handleSort('code')}>
                {sortedColumn === 'code' ? `Code(X)` : 'Code'}
                </div>
              <div className='col border' onClick={() => this.handleSort('prod')}>
                {sortedColumn === 'prod' ? `Product(X)` : 'Product'}
              </div>
              <div className='col border' onClick={() => this.handleSort('price')}>
                {sortedColumn === 'price' ? `Price(X)` : 'Price'}
              </div>
              <div className='col border' onClick={() => this.handleSort('instock')}>
                {sortedColumn === 'instock' ? `In Stock(X)` : 'In Stock'}
              </div>
              <div className='col border' onClick={() => this.handleSort('category')}>
                {sortedColumn === 'category' ? `Category(X)` : 'Category'}
              </div>
              <div className='col border'></div>
            </div>
         
          <>
            {filteredData.map((item) => (
              <div className='row border' key={item.code}>
                <div className='col border' >{item.code}</div>
                <div className='col border'>{item.prod}</div>
                <div className='col border'>{item.price}</div>
                <div className='col border'>{item.instock}</div>
                <div className='col border'>{item.category}</div>
                <div className='col border'>
                  <button className='btn btn-dark' onClick={() => this.handleAddToBill(item)}>Add to Bill</button>
                </div>
              </div>
            ))}
          </>
        </div>

       
      </div>
    );
  }
}

export default ProductList;
