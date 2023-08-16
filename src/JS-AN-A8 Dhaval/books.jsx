import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import http from "./httpService.js";
import altb from "./altb.jpg";
import "./sp.css";
class Books extends Component {
  state = {
    data: {},
    Languagecode: ["en", "fr", "hi", "es", "zh"],
    filters:["partial", "full", "free-ebooks", "paid-ebooks"],
    printtype:["all","books","magazines"],
    searchText: "",
    myBooks: this.props.myBooks
  };
  async fetchData() {
 
    let queryParams = queryString.parse(this.props.location.search);
    let x = queryString.stringify(queryParams);

    var response = await http.get(
      `https://www.googleapis.com/books/v1/volumes?${x}`
    );

    let { data } = response;
    this.setState({ data: data });
    console.log(data);
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  handlePage = (incr) => {
    const queryParams = queryString.parse(this.props.location.search);
    let { startIndex = 0 } = queryParams;
    startIndex = parseInt(startIndex, 10) + incr;

    if (startIndex >= 0) {
      queryParams.startIndex = startIndex;
      this.callURL(queryParams);
    }
  };

  callURL = (options) => {
    this.props.history.push({
      search: queryString.stringify(options),
    });
  };

  handleSectionChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    queryParams.section = event.target.value;
    queryParams.startIndex = 0;
    this.callURL(queryParams);
  };

  handleOrderByChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    const selectedValue = event.target.value;
    if (selectedValue === "") {
      delete queryParams["orderBy"];
    } else {
      queryParams["orderBy"] = selectedValue;
    }
    this.callURL(queryParams);
  };

  getLanguageName = (langCode) => {
    switch (langCode) {
      case "en":
        return "English";
      case "fr":
        return "French";
      case "hi":
        return "Hindi";
      case "es":
        return "Spanish";
      case "zh":
        return "Chinese";
      default:
        return "";
    }
  };
  getFilterName = (langCode) => {
    switch (langCode) {
      case "partial":
        return "Partial Volume";
      case "full":
        return "Full Volume";
      case "free-ebooks":
        return "Free Google e-books";
      case "paid-ebooks":
        return "Paid Google e-books";
     
      default:
        return "";
    }
  };

  handleLanguageChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    const selectedValue = event.target.value;
    queryParams.langRestrict = selectedValue;
    queryParams.startIndex = 0;
    this.callURL(queryParams);
    this.setState({ selectedLanguage: selectedValue });
  };

  handleFilterChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    queryParams.filter = event.target.value;
    queryParams.startIndex = 0;
    this.callURL(queryParams);
  };
  handlePrintChange = (event) => {
    const queryParams = queryString.parse(this.props.location.search);
    queryParams.printType = event.target.value;
    queryParams.startIndex = 0;
    this.callURL(queryParams);
  };
  handleAddToMyBooks = (book) => {
    const myBooksCopy = [...this.state.myBooks];
    myBooksCopy.push(book);
    this.setState({ myBooks: myBooksCopy },() => {
 
      this.props.handleMybooks(myBooksCopy);
    });
  };

  handleRemoveFromMyBooks = (book) => {
    const myBooksCopy = [...this.state.myBooks];
    const index = myBooksCopy.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      myBooksCopy.splice(index, 1);
      this.setState({ myBooks: myBooksCopy },() => {
 
        this.props.handleMybooks(myBooksCopy);
      });
    }
  };
  render() {
    const { items = [] } = this.state.data;
    const { Languagecode,filters,printtype,myBooks } = this.state;

    let queryParams = queryString.parse(this.props.location.search);
    let q1 = queryString.stringify(queryParams);
    console.log(queryParams, "render");
    return (
      <div style={{ display: "flex" }}>
        <div className="col-2">
          <div style={{ marginLeft: "2px" }}>
           {this.props.showLanguage &&<div className="d-flex flex-column">
              <div className="border" style={{ padding: "5px 5px 5px 5px" }}>
                <b>Language</b>
              </div>
              {Languagecode.map((langCode, index) => (
                <label
                  style={{
                    textTransform: "capitalize",
                    padding: "5px 5px 5px 5px",
                  }}
                  className="border"
                  key={index}
                >
                  <input
                    type="radio"
                    value={langCode}
                    checked={queryParams.langRestrict === langCode}
                    onChange={this.handleLanguageChange}
                  />
                  {this.getLanguageName(langCode)}
                </label>
              ))}
            </div>}

            {this.props.showFilter && <div>
            <div className="border" style={{ padding: "5px 5px 5px 5px",marginTop:"30px" }}>
            
            <b>Filter</b>
          </div>
              <div className="d-flex flex-column">
                {filters.map(
                  (filterValue, index) => (
                    <label className="border" style={{ textTransform: "capitalize",padding: "5px 5px 5px 5px" }} key={index}>
                      <input
                        type="radio"
                        
                        value={filterValue}
                        checked={queryParams.filter === filterValue}
                        onChange={this.handleFilterChange}
                      />
                      {this.getFilterName(filterValue)}
                    </label>
                  )
                )}
              </div>
            </div>}
           { this.props.showPrintType &&  <div>
            <div className="border" style={{ padding: "5px 5px 5px 5px",marginTop:"30px" }}>
            
            <b>Print Type</b>
          </div>
              <div className="d-flex flex-column">
                {printtype.map(
                  (ptype, index) => (
                    <label className="border" style={{ textTransform: "capitalize",padding: "5px 5px 5px 5px" }} key={index}>
                      <input
                        type="radio"
                        
                        value={ptype}
                        checked={queryParams.printType === ptype}
                        onChange={this.handlePrintChange}
                      />
                      {ptype}
                    </label>
                  )
                )}
              </div>
            </div>}

           { this.props.showOrderBy&&<div className="border" style={{ marginTop: "30px" }}>
              <div className="border" style={{ padding: "5px 5px 5px 5px" }}>
            
                <b>Order By</b>
              </div>
              <select
                value={queryParams["orderBy"] || ""}
                style={{ width: "80%" }}
                onChange={this.handleOrderByChange}
              >
                <option value="">None</option>
                <option value="newest">Newest</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>}
          </div>
        </div>

        {!q1 ? (
          ""
        ) : (
          <>
            <div>
              <h3 style={{ color: "goldenrod", marginLeft: "400px" }}>
                {queryParams.q}&nbsp; Books
              </h3>
              <span style={{ color: "green" }}>
                {" "}
                <b>
                  {" "}
                  {Number(queryParams.startIndex) + 1} -{" "}
                  {Number(queryParams.startIndex) + items.length} entries{" "}
                </b>
              </span>

              <div
                className="d-flex flex-row flex-wrap"
                style={{ maxWidth: "100%" }}
              >
                {items.length === 0 ? (
                  <h3 style={{color:"green"}}>No data found</h3>
                ) : (
                  items.map((n, index) => (
                    <div
                   
                      style={{
                        backgroundColor: "green",
                        marginBottom: "5px",
                        marginRight: "5px",
                        textAlign: "center",
                        width: "350px",
                        padding: "2px 5px 0px 5px"
                      }}
                      key={index}
                    >
                      <p>
                        {n.volumeInfo.imageLinks &&
                        n.volumeInfo.imageLinks.thumbnail ? (
                          <img
                            style={{ marginTop: "2px" }}
                            src={n.volumeInfo.imageLinks.thumbnail}
                            alt={altb}
                          />
                        ) : (
                          <img
                            src={altb}
                            style={{ maxWidth: "200px" }}
                            alt="Alternative"
                          />
                        )}
                      </p>

                      <p>
                        <h4> {n.volumeInfo.title}</h4>
                        {n.volumeInfo.authors} <br />
                        {!n.volumeInfo.categories
                          ? "NA"
                          : n.volumeInfo.categories}
                        <br />
                        {myBooks.find((b) => b.id === n.id) ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => this.handleRemoveFromMyBooks(n)}
                >
                  Remove from Mybooks
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => this.handleAddToMyBooks(n)}
                >
                  Add to Mybooks
                </button>
              )}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="row">
                <div className="col-2">
                  {queryParams.startIndex > 0 ? (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => this.handlePage(-items.length)}
                    >
                      Prev
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-8"></div>
                <div className="col-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => this.handlePage(items.length)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default Books;
