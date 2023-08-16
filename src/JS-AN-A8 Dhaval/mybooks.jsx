import React, { Component } from 'react';
import altb from "./altb.jpg";

class MyBooks extends Component {


  render() {
        const{gg, handleRemoveFromMyBooks}=this.props
        console.log(this.props.gg,"inside mybooks component")
    return (
       
        <div
        className="d-flex flex-row flex-wrap"
        style={{ maxWidth: "100%" }}
      >
        {gg.length === 0 ? ( <h3 style={{backgroundColor:"lightblue",color:"goldenrod",textAlign:"center",width:"500vh"}}>
        No books are added to mybooks
        </h3>):(
            
                gg.map((n, index) => (
                    <div
                      style={{
                        backgroundColor: "green",
                        marginBottom: "5px",
                        marginRight: "5px",
                        textAlign: "center",
                        width: "300px",
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
                      
                <button
                  className="btn btn-secondary"
                  onClick={() => handleRemoveFromMyBooks(n)}
                >
                  Remove from Mybooks
                </button>
                </p>
                
                            </div>
                            
            
        )))
    }
        </div>
    )
}
}
export default MyBooks;
