
import React, { Component } from 'react';

class AddProduct extends Component {
  state = {
    code: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    specialOffer: false,
    limitedStock: false,
    formSubmitted: false
  };
  componentDidMount() {
    const { editProductData } = this.props;
    if (editProductData) {
      this.setState({
        code: editProductData.code,
        brand: editProductData.brand,
        category: editProductData.category,
        price: editProductData.price,
        quantity: editProductData.quantity,
        specialOffer: editProductData.specialOffer,
        limitedStock: editProductData.limitedStock,
      });
    }
  }
  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === 'brand') {
      this.setState({
        brand: value,
      });
    } else {
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formSubmitted: true });
   
  if (!this.state.category) {
    alert("Category is required");
    return;
  }


  if (!this.state.code) {

    return;
  }
if(!this.state.brand){
  alert("Brand cannot be empty")
  return
}

  if (!this.state.price||isNaN(this.state.price)) {
  
    return;
  }

    
    const newProduct = {
      code: this.state.code,
      brand: this.state.brand,
      category: this.state.category,
      price: parseFloat(this.state.price),
      quantity: this.state.quantity||0,
      specialOffer: this.state.specialOffer,
      limitedStock: this.state.limitedStock,
    };
    const isEditMode = !!this.props.editProductData;
    if(isEditMode) 
    {this.props.onEditProduct(newProduct);
      this.props.onGoBack();
    
    }
else{
  this.props.onAddProduct(newProduct);
  this.props.onGoBack();
}

    
  };

  render() {
    const {
        code,
        brand,
        category,
        price,
        quantity,
        specialOffer,
        limitedStock,
      } = this.state;
    const isEditMode = !!this.props.editProductData;
    let brandsOptions = [];
    if (category === 'Food') {
      brandsOptions = ["Nestle", "Haldiram", "Pepsi", "Coca Cola", "Britannia", "Cadburys"];
    } else if (category === 'Personal Care') {
      brandsOptions = ["P&G", "Colgate", "Parachute", "Gillete", "Dove"];
    } else if (category === 'Apparel') {
      brandsOptions = ["Levis", "Van Heusen", "Manyavaar", "Zara"];
    } else if (isEditMode && this.props.editProductData.category === 'Food') {
      brandsOptions = ["Nestle", "Haldiram", "Pepsi", "Coca Cola", "Britannia", "Cadburys"];
    } else if (isEditMode && this.props.editProductData.category === 'Personal Care') {
      brandsOptions = ["P&G", "Colgate", "Parachute", "Gillete", "Dove"];
    } else if (isEditMode && this.props.editProductData.category === 'Apparel') {
      brandsOptions = ["Levis", "Van Heusen", "Manyavaar", "Zara"];
    }

    return (
      <div  >
        <h2>Add Product</h2>
        <form  onSubmit={this.handleSubmit}>
          <label>
            Product Code:
            <input type="text" style={{width:"500vh"}}  readOnly={isEditMode} className="form-control " name="code" 
             value={code} onChange={this.handleInputChange} />
            
          </label>
          {console.log(code)}
          {this.state.formSubmitted && code === "" ?<div style={{backgroundColor:"#f8c4c4"}} ><span style={{ color: "red"}}>Product code is required</span></div>:""}
          <br />
          <label>
            Price:
            <input type="text" style={{width:"500vh"}}  className="form-control" name="price" value={price} onChange={this.handleInputChange} />
          </label>
          {this.state.formSubmitted && price === "" ?<div style={{backgroundColor:"#f8c4c4"}} ><span style={{ color: "red"}}>Price is required</span></div>:""}
          <br />
          <br/>
          <b>Category:</b>
        <br/>
        <label>
          <input
            type="radio"
            name="category"
            value="Food"
            checked={category === 'Food'}
            onChange={this.handleInputChange}
          />
          Food
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="Personal Care"
            checked={category === 'Personal Care'}
            onChange={this.handleInputChange}
          />
          Personal Care
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="Apparel"
            checked={category === 'Apparel'}
            onChange={this.handleInputChange}
          />
          Apparel
        </label>
        <br />
        <select
          className="form-select"
          name="brand"
          value={brand}
          onChange={this.handleInputChange}
        >
          <option value="">Select Brand</option>
          {brandsOptions.map((brandOption) => (
                <option key={brandOption} value={brandOption}>
                {brandOption}
              </option>
              ))
          }
        </select>
          
          <b>Choose other info about the product</b>
          <br/>
          <label>
            
            <input type="checkbox" className="form-check-input" name="specialOffer" checked={specialOffer} onChange={this.handleInputChange} />
            Special Offer
          </label>
          <label>
            <input type="checkbox" className="form-check-input" name="limitedStock" checked={limitedStock} onChange={this.handleInputChange} />
            Limited Stock
          </label>
          <br />
          <button className='btn btn-primary' type="submit">{isEditMode ? 'Edit Product' : 'Add Product'}</button>
          <button className='btn btn-primary' style={{marginLeft:"10px"}} onClick={this.props.onGoBack}>Go Back to Homepage</button>

        </form>
      </div>
    );
  }
}


export default AddProduct;
