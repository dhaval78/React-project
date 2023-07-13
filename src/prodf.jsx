import React, { Component } from 'react';
import './gg.css';
const products = [
  { id: 'PEP110', name: 'Pepsi', category: 'Food', stock: 'yes' },
  { id: 'CLO876', name: 'CloseUp', category: 'Toothpaste', stock: 'no' },
  { id: 'PEA531', name: 'Pears', category: 'Soap', stock: 'arriving' },
  { id: 'LU7264', name: 'Lux', category: 'Soap', stock: 'yes' },
  { id: 'COL112', name: 'Colgate', category: 'Toothpaste', stock: 'no' },
  { id: 'DM881', name: 'Dairy Milk', category: 'Food', stock: 'arriving' },
  { id: 'LI130', name: 'Liril', category: 'Soap', stock: 'yes' },
  { id: 'PPS613', name: 'Pepsodent', category: 'Toothpaste', stock: 'no' },
  { id: 'MAG441', name: 'Maggi', category: 'Food', stock: 'arriving' },
  { id: 'PNT560', name: 'Pantene', category: 'Shampoo', stock: 'no' },
  { id: 'KK219', name: 'KitKat', category: 'Food', stock: 'arriving' },
  { id: 'DOV044', name: 'Dove', category: 'Soap', stock: 'yes' }
];

class ProdF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      selectedStockStatus: ''
    };
  }

  handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      this.setState((prevState) => ({
        selectedCategories: [...prevState.selectedCategories, value]
      }));
    } else {
      this.setState((prevState) => ({
        selectedCategories: prevState.selectedCategories.filter((category) => category !== value)
      }));
    }
  };

  handleStockStatusChange = (event) => {
    const { value } = event.target;
    this.setState({ selectedStockStatus: value });
  };

  renderCategoryCheckboxes() {
    const { selectedCategories } = this.state;
    const categories = ['Food', 'Toothpaste', 'Soap', 'Shampoo'];

    return categories.map((category) => (
        <div className="form-check">
      <label key={category}>
        
        <input
          type="checkbox"
          className="form-check-input"
          value={category}
          checked={selectedCategories.includes(category)}
          onChange={this.handleCategoryChange}
        />
        {category}
      </label>
      </div>
    ));
  }

  renderStockStatusRadios() {
    const { selectedStockStatus } = this.state;
    const stockStatuses = ['', 'yes', 'no', 'arriving'];

    return stockStatuses.map((status) => (
      <label key={status}>
        <input
          type="radio"
          value={status}
          checked={selectedStockStatus === status}
          onChange={this.handleStockStatusChange}
        />
        {status === '' ? 'All' : status}
      </label>
    ));
  }

  render() {
    const { selectedCategories, selectedStockStatus } = this.state;

    const filteredProducts = products.filter(
      (product) =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedStockStatus === '' || selectedStockStatus === 'All' || selectedStockStatus === product.stock)
    );

    return (
        <>
      <div className="d-flex justify-content: space-around">
      <div className='d-flex flex-column sm'>
       <h2>Category:</h2>
       {this.renderCategoryCheckboxes()}
       <h2>Stock Status:</h2>
       {this.renderStockStatusRadios()}
     </div>
        <div className='d-flex'>
          
            {filteredProducts.length > 0 ? (
              <div><h2>Category Status: {selectedCategories.join(', ')} &nbsp; Stock Status: {selectedStockStatus || 'All'}</h2>
                {filteredProducts.map((product) => (
                  <div className='row' key={product.id}>
                    <div className='col-2'>{product.id}</div>
                    <div className='col-4'>{product.name}</div>
                    <div className='col-2'>{product.category}</div>
                    <div className='col-2'>{product.stock}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No products found.</div>
            )}
          </div>
        </div>
   
     </>
    );
  }
}

export default ProdF;