import React,{Component} from "react";
import image from "./book.jpg"
import queryString from "query-string";

import './sp.css'
class Search extends Component{
   state={
    searchText:'',
    showsearch:true,
    maxResults:this.props.maxResults
   }
   handleSearchTextChange = (event) => {
    this.setState({ searchText: event.target.value });
  };
  
  handleSearchSubmit = (event) => {
    const {showsearch}=this.state
    event.preventDefault();
    const queryParams = queryString.parse(this.props.location.search);
    queryParams.q = this.state.searchText;
    queryParams.startIndex=0;
    queryParams.maxResults=this.state.maxResults;
    this.setState({showsearch:!showsearch})
  this.callURL(queryParams)
  };

  callURL=(options)=>{

    this.props.history.push({
        pathname:"/books",
        search:queryString.stringify(options)
    })
}
    render(){
        const{showsearch}=this.state
     return (
      
        showsearch&&(
            <div style={{textAlign:"center"}}>
            
            <form className="form-inline" onSubmit={this.handleSearchSubmit}>
              <img src={image} style={{maxWidth:"500px",borderRadius:"800px"}} /><br/>
            
        <input
          type="text"
          placeholder="search"
          style={{width:"40%",marginTop:"5px"}}
          value={this.state.searchText}
          onChange={this.handleSearchTextChange}
        />
        <button className="btn btn-primary" style={{marginLeft:"5px"}} type="submit">Search</button>
        
      </form>
     </div>) 
     )
    }
}export default Search;