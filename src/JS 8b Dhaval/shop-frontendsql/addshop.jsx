
import React ,{Component} from "react";
import http from "./httpService"
class ShopAdd extends Component{
    state={
      shop:{shopname:"",rent:""},
      errors: {},
    }

    async componentDidMount(){
        this.fetchData();
    }
    async componentDidUpdate(prevProps,prevState){
        if(prevProps !==this.props) this.fetchData();
    }
    async fetchData(){
        
            let shop={};
            this.setState({shop:shop});
        
    }
handleChange=(e)=>{
    const {currentTarget:input}=e;
    let s1={...this.state};
    s1.shop[input.name]=input.value;
    this.setState(s1);
}
async postData(url,obj){
    let response=await http.post(url,obj)
    console.log(response);
    this.props.history.push("/shops/view")
}

handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    if (Object.keys(errors).length === 0) {
 
      let { shop } = this.state;
      this.postData("/shops", shop);
    } else {
   
      this.setState({ errors });
    }
  };
validateForm = () => {
    const { shopname, rent } = this.state.shop;
    const errors = {};

    if (!shopname) {
      errors.shopname = "Shop Name is required";
    }

    if (!rent) {
      errors.rent = "Rent is required";
    }

    return errors;
  };

render (){
    let {shopname,rent}=this.state.shop;
    let {errors}=this.state
    return (
        <div className="container">
        
            <div className="form-group">
                <label> Shop Name</label>
                <input 
                type="text"
                className={`form-control ${errors.shopname ? "is-invalid" : ""}`}
                id="shopname"
                name="shopname"
                value={shopname}
                onChange={this.handleChange}/>
            </div>
            {errors.shopname && (
            <span style={{color:"lightcoral"}}>{errors.shopname}</span>
          )}
          
            <div className="form-group">
                <label> Rent</label>
                <input 
                type="text"
                className={`form-control ${errors.rent ? "is-invalid" : ""}`}
                id="rent"
                name="rent"
                value={rent}
                onChange={this.handleChange}/>
            </div>
            {errors.rent && (
            <span style={{color:"lightcoral"}}>{errors.rent}</span>
            
          )}
           <br/>
<button className="btn btn-primary" onClick={this.handleSubmit}>Submit </button>           

        </div>
    )
}
}export default ShopAdd

