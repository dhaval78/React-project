import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Books from "./books";
import Navbar from "./Navbar";
import Search from "./search";
import Settings from "./settings";
import MyBooks from "./mybooks";

class MainC extends Component {
  state = {
    maxResults: 8,
    showSearch: true,
    myBooks: [],
    showLanguage: true,
    showFilter: true,
    showPrintType: true,
    showOrderBy: true,
  };
  handleMaxResultsChange = (newMaxResults) => {
    this.setState({ maxResults: newMaxResults });
  };
  handleCheckboxChange = (checkboxName, isChecked) => {
    this.setState({ [checkboxName]: isChecked });
  };

  handleNavbarLinkClick = () => {
    this.setState({ showSearch: false });
  };
  handleSearch = () => {
    this.setState({ showSearch: true });
  };

  handleMybooks = (b) => {
    this.setState({ myBooks: b });
  };
  handleRemoveFromMyBooks = (bookToRemove) => {
    this.setState((prevState) => ({
      myBooks: prevState.myBooks.filter((book) => book.id !== bookToRemove.id),
    }));
  };

  render() {
    const {
      maxResults,
      showSearch,
      myBooks,
      showLanguage,
      showFilter,
      showPrintType,
      showOrderBy,
    } = this.state;

    return (
      <>
        <Navbar
          maxResults={maxResults}
          onNavbarLinkClick={this.handleNavbarLinkClick}
          HandleSearch={this.handleSearch}
        />
        <Switch>
          <div>
            <Route
              path="/"
              render={(props) =>
                showSearch ? (
                  <Search {...props} maxResults={maxResults} />
                ) : null
              }
            />
            <Route
              path="/books"
              render={(props) => (
                <Books
                  {...props}
                  handleMybooks={this.handleMybooks}
                  myBooks={myBooks}
                  showLanguage={showLanguage}
                  showFilter={showFilter}
                  showPrintType={showPrintType}
                  showOrderBy={showOrderBy}
                />
              )}
            />
            <Route
              path="/mybooks"
              render={(props) => (
                <MyBooks
                  {...props}
                  gg={myBooks}
                  handleRemoveFromMyBooks={this.handleRemoveFromMyBooks}
                />
              )}
            />
            <Route
              path="/book/settings"
              render={(props) => (
                <Settings
                  {...props}
                  maxResults={maxResults}
                  handleMaxResultsChange={this.handleMaxResultsChange}
                  showLanguage={showLanguage}
                  showFilter={showFilter}
                  showPrintType={showPrintType}
                  showOrderBy={showOrderBy}
                  handleCheckboxChange={this.handleCheckboxChange}
                />
              )}
            />
          </div>
          <Redirect from="/" to="/books" />
        </Switch>
      </>
    );
  }
}
export default MainC;
