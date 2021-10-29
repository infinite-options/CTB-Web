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
            {/*<AppliedRoute path='*' component={NotFound} />*/}
            //

        </Router>
    </div>


}

export default App;
