import React,{Component} from "react";
class Settings extends Component{
state={
  maxResults:this.props.maxResults||"",
  showLanguage: this.props.showLanguage,
  showFilter: this.props.showFilter,
  showPrintType: this.props.showPrintType,
  showOrderBy: this.props.showOrderBy,

}
handleMaxResultsChange = (event) => {
  const value = event.target.value;
  this.setState({ maxResults: value }, () => {
 
    this.props.handleMaxResultsChange(value);
  });
};

 handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked }, () => {
      this.props.handleCheckboxChange(name, checked);
    });
  }

    render(){
      const {
        maxResults,
        
        showLanguage,
        showFilter,
        showPrintType,
        showOrderBy,
      } = this.state;
     return (
      <div >

      <h4 style={{color:"red"}}>Select options for filtering of left panel</h4>

      <div>
          <label>
            <input
              type="checkbox"
              name="showLanguage"
              checked={showLanguage}
              onChange={this.handleCheckboxChange}
            />
           Languages--(Restrict the  volumes returned to those that are tagged with the specified language.)
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showFilter"
              checked={showFilter}
              onChange={this.handleCheckboxChange}
            />
           Filter--(Filter search results by volume type and availability.)
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showPrintType"
              checked={showPrintType}
              onChange={this.handleCheckboxChange}
            />
            PrintType--(Restrict the books or magazines)
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showOrderBy"
              checked={showOrderBy}
              onChange={this.handleCheckboxChange}
            />
            Order-By--(Order of the volume search results)
          </label>
        </div>

      <h4 style={{color:"green"}}>No of entries on a page</h4>
      <input
        type="text"
        value={maxResults || ""}
        onChange={this.handleMaxResultsChange}
      />
    </div>) 
     
    }
}export default Settings;