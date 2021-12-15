import logo from './logo.svg';
import './App.css';
import ProductComponent from "./components/ProductComponent";
import CreateBOMComponent from "./components/CreateBOMComponent";
import DisplayProductsComponent from "./components/DisplayProductsComponent";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { useHistory } from 'react-router';
import { createBrowserHistory } from "history";
import ProductDetailsComponent from "./components/ProductDetailsComponent";
import {DisplayBOMComponent} from "./components/DisplayBOMComponent";
import RunOrderListComponent from "./components/RunOrderListComponent";
import DisplayCTBComponent from "./components/DisplayCTBComponent";
import DisplayNewCTBComponent from "./components/DisplayNewCTBComponent";
import RunNewOrderListComponent from "./components/RunNewOrderListComponent";
export const history = createBrowserHistory();

const App = () =>{

    return <div>
        <Router history={history}>

            <Route exact path="/">
                <DisplayProductsComponent/>
            </Route>
            <Route exact path="/BOM">
                <CreateBOMComponent/>
            </Route>
            <Route exact path="/product">
                <ProductDetailsComponent/>
            </Route>
            <Route exact path="/ctb">
                <DisplayCTBComponent/>
            </Route>
            <Route exact path="/run_order_list">
                <RunOrderListComponent/>
            </Route>
            <Route exact path="/ctb_new">
                <DisplayNewCTBComponent/>
            </Route>
            <Route exact path="/run_order_list_new">
                <RunNewOrderListComponent/>
            </Route>
            {/*<Route exact path="/run_order_list_new">*/}
            {/*    <DisplayNewCTBComponent/>*/}
            {/*</Route>*/}
            {/*<AppliedRoute path='*' component={NotFound} />*/}

        </Router>
    </div>


}

export default App;
