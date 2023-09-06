import React ,{Component} from "react";
import http from "./httpService"
class PurAdd extends Component{
    state={
      pur:{productid:"",shopid:"",quantity:"",price:""},
      data:[],
      errors: {},
      
    }
    async componentDidMount() {
        await this.fetchData();
        this.fetchData();
      }
    
      async componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
      }
    
      async fetchData() {
       
          let pur = {};
          this.setState({ pur: pur, edit: false });
        
      }

handleChange=(e)=>{
    const {currentTarget:input}=e;
    let s1={...this.state};
    s1.pur[input.name]=input.value;
    this.setState(s1);
}
async postData(url,obj){
    let response=await http.post(url,obj)
    console.log(response);
    this.props.history.push("/purchases/view")
}

handleSubmit=(e)=>{
    e.preventDefault();
    let {pur}=this.state;
    const errors = this.validateForm();
    
    if (Object.keys(errors).length === 0) {
 
        this.postData("/purchases",pur) && alert("Purchase is inserted");
      } else {
     
        this.setState({ errors });
      }
  

}
validateForm = () => {
    const {productid,shopid,quantity,price } = this.state.pur;
    const errors = {};

    if (!productid) {
      errors.productid = "Product Id is required";
    }

    if (!shopid) {
      errors.shopid = "shopid is required";
    }
    if (!quantity) {
      errors.quantity = "Quantity is required";
    }
    if (!price) {
      errors.price = "Price is required";
    }

    return errors;
  };
render (){
    let {productid,shopid,quantity,price } =this.state.pur;
    let {errors}=this.state


    return (
        <div className="container">
            <h4 style={{textAlign:"center"}}> Purchase Details</h4>
            <div className="form-group">
                <label> Product ID</label>
                <input 
                type="text"
                className={`form-control ${errors.productid ? "is-invalid" : ""}`}
                id="productid"
                name="productid"
                value={productid}
                onChange={this.handleChange}/>
            </div>
            {errors.productid && (
            <span style={{color:"lightcoral"}}>{errors.productid}</span>
          )}
            <div className="form-group">
                <label> Shop ID</label>
                <input 
                type="text"
                className={`form-control ${errors.shopid ? "is-invalid" : ""}`}
                id="shopid"
                name="shopid"
                value={shopid}
                onChange={this.handleChange}/>
            </div>
            {errors.shopid && (
            <span style={{color:"lightcoral"}}>{errors.shopid}</span>
          )}
            <div className="form-group">
                <label> Quantity</label>
                <input 
                type="text"
                className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={this.handleChange}/>
            </div>
            {errors.quantity && (
            <span style={{color:"lightcoral"}}>{errors.quantity}</span>
          )}
            <div className="form-group">
                <label> Price</label>
                <input 
                type="text"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                id="price"
                name="price"
                value={price}
                onChange={this.handleChange}/>
            </div>
            {errors.price && (
            <span style={{color:"lightcoral"}}>{errors.price}</span>
          )}
          <br/>
           
           
          
<button className="btn btn-primary" onClick={this.handleSubmit}>Submit </button>           

        </div>
    )
}
}export default PurAdd