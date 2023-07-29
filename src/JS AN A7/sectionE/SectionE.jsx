import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,withRouter } from 'react-router-dom';
import App1 from './r1';
import Navbar from './Navbar';
class App2 extends Component {
  
    render(){
        
  return (
    
    <Router>
        <>
    <Navbar 
    />
    <Switch>
      <Route path="/emps/All" component={App1} />
      <Route path="/emps/New Delhi" component={App1} />
      <Route path="/emps/Noida" component={App1} />
      </Switch>
    </>
    
  </Router>
  );}

};

export default withRouter(App2);
