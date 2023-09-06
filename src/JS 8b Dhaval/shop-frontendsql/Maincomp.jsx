import React,{Component} from "react";
import { Route,Switch,Redirect,withRouter } from "react-router-dom";
import Shops from "./shops";
import ShopsP from "./shopsP";
import ProdP from "./prodp";
import ProdTP from "./prodtp";
import ShopTP from "./shoptp";
import ShopAdd from "./addshop";
import AddProd from "./prodadd";
import PurAdd from "./puradd";
import Navbar from "./Navbar";
import Purchases from "./purchases";
import Products from "./products";

class MainC extends Component{
    render ()
    {
        return(
            <div className="container">
                <Navbar/>
                <Switch>
                    <Route path="/purchases/add" component={PurAdd}/>
                    <Route path="/purchases" component={Purchases}/>
                    <Route path="/shops/view" component={Shops}/>
                    <Route path="/shop/:id/purchases" component={ShopsP}/>
                    <Route path="/product/:id/purchases" component={ProdP}/>
                    <Route path="/shop/:id/totalpurchases" component={ShopTP}/>
                    <Route path="/product/:id/totalpurchases" component={ProdTP}/>
                    <Route path="/product/:id/edit" component={AddProd}/>
                    <Route path="/shops/add" component={ShopAdd}/>
                    <Route path="/products/view" component={Products}/>
                    <Route path="/products/add" component={AddProd}/>
                    
                    
                    <Redirect from="/" to="/purchases"/>
                </Switch>
            </div>
        );
    }
}export default withRouter(MainC) 