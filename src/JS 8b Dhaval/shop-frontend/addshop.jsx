
import React ,{Component} from "react";
import http from "./httpService"
class ShopAdd extends Component{
    state={
      shop:{name:"",rent:""},
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
    const { name, rent } = this.state.shop;
    const errors = {};

    if (!name) {
      errors.name = "Shop Name is required";
    }

    if (!rent) {
      errors.rent = "Rent is required";
    }

    return errors;
  };

render (){
    let {name,rent}=this.state.shop;
    let {errors}=this.state
    return (
        <div className="container">
        
            <div className="form-group">
                <label> Shop Name</label>
                <input 
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                value={name}
                onChange={this.handleChange}/>
            </div>
            {errors.name && (
            <span style={{color:"lightcoral"}}>{errors.name}</span>
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

