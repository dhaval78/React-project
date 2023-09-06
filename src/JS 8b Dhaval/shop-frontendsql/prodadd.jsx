import React, { Component } from "react";
import http from "./httpService";

class AddProd extends Component {
  state = {
    prod: { productid: "", productname: "", category: "", description: "" },
    data: [],
    errors: {},
    edit: false,
  };

  async componentDidMount() {
    await this.fetchData();
    this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }

  async fetchData() {
    const { id } = this.props.match.params;
    if (id) {
      let response = await http.get(`/product/${id}`);
      let { data } = response;
      this.setState({ prod: data[0], edit: true });
    } else {
      let prod = {};
      this.setState({ prod: prod, edit: false });
    }
  }

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.prod[input.name] = input.value;
    this.setState(s1);
  };

  async postData(url, obj) {
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/products/view");
  }

  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/products/view");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { prod, edit } = this.state;
    const errors = this.validateForm();
  console.log(errors);
    if (Object.keys(errors).length === 0) {
      edit
        ? this.putData(`/products/${prod.productid}`, prod) &&
          alert("Product is Edited successfully")
        : this.postData("/products", prod) && alert("Product is inserted");
    } else {
      this.setState({ errors });
    }
  };

  validateForm = () => {
    const { productname, category, description } = this.state.prod;
    const errors = {};

    if (!productname) {
      errors.productname = "Product Name is required";
    }

    if (!category) {
      errors.category = "Category is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  render() {
    let { productid, productname, category, description } = this.state.prod;
    let { errors } = this.state;

    return (
      <div className="container">
        <h4 style={{ textAlign: "center" }}> Product Details</h4>
        <div className="form-group">
          <label> Product ID</label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            id="productid"
            name="productid"
            value={productid}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label> Product Name</label>
          <input
            type="text"
            className={`form-control ${errors.productname ? "is-invalid" : ""}`}
            id="productname"
            disabled={this.state.edit}
            name="productname"
            value={productname}
            onChange={this.handleChange}
          />
        </div>
        {errors.productname && (
          <span style={{ color: "lightcoral" }}>{errors.productname}</span>
        )}
        <div className="form-group">
          <label> Category</label>
          <input
            type="text"
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
            id="category"
            name="category"
            value={category}
            onChange={this.handleChange}
          />
        </div>
        {errors.category && (
          <span style={{ color: "lightcoral" }}>{errors.category}</span>
        )}
        <div className="form-group">
          <label> Description</label>
          <input
            type="text"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </div>
        {errors.description && (
          <span style={{ color: "lightcoral" }}>{errors.description}</span>
        )}
        <br/>

        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default AddProd;
