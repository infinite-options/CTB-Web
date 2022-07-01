import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import {findAllProducts} from "../services/ProductService";
import {CREATE_BOM_API_URL, DELETE_PRODUCT_API_URL, PRODUCTS_API_URL} from "./backendAPIs.js";
//import { useHistory } from 'react-router';
//import {withRouter} from "react-router";

class DisplayProductsComponent extends React.Component {

    // const history = useHistory();

    state = {
        products: null,
        random: "Hi",
        // Initially, no file is selected
        selectedFile: null,
        productDetails: null,
        bom: null,
        tempUID: null,
        productId: null,
        data: null
    }

    // componentDidMount() {
    //     fetch(PRODUCTS_API_URL)
    //     .then(response => response.json()).then(response => {
    //         this.setState({
    //             products: response
    //         })
    //     })
    // }

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };
    getJSONobject = () => {
        console.log(this.state.productId);
        var stateTempUID = this.state.tempUID;
        console.log("tempuid" + this.state.tempUID);
        const postURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB"
        const payload = {
          "product_uid": this.state.tempUID
        }
        axios.post(postURL, payload).then((res) => {
          console.log("in get Json object");
          console.log(res);
          console.log(res.data[0]);
          if(res.data[0]!=null) {
            this.setState({ data: res.data,
                productID: stateTempUID
             });
            //setData(res.data);
            
          }
          else {
            console.log("bad");
            this.setState({ data: "Please enter a valid Product UID" });
            //setData("Please enter a valid Product UID")
          }
          
        })
      }

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "filepath",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post(CREATE_BOM_API_URL, formData)
            .then((response) => {
                // console.log('###')
                console.log(response);
                console.log(response.data)
                this.setState({
                    productId: response.data,
                    tempUID: response.data,
                    random: "bye"
                })
                console.log(this.state.tempUID);
                console.log(this.state.productId);
                const postURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB"
                const payload = {
                    "product_uid": response.data
                }
                axios.post(postURL, payload).then((res) => {
                    console.log("in get Json object");
                    console.log(res);
                    console.log(res.data[0]);
                    if(res.data[0]!=null) {
                        this.setState({ data: res.data });
                        //setData(res.data);
                        
                    }
                    else {
                        console.log("bad");
                        this.setState({ data: "Please enter a valid Product UID" });
                        //setData("Please enter a valid Product UID")
                    }
                
                })
                // console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
                fetch(PRODUCTS_API_URL)
        .then(response => response.json()).then(response => {
                    console.log(response);
                    console.log(response[response.length - 1]);
                    this.setState({
                        
                        products: response
                    })
                    console.log(this.products);
                })
                
            }, (error) => {
                console.log(error);
            });
            
    };

    deleteProduct = (productId) => {
        axios.post(`${DELETE_PRODUCT_API_URL}`, {
            product_uid: productId
        }).then((response) =>{
            // console.log('***')
            // console.log(response.data);
            fetch(PRODUCTS_API_URL)
        .then(response => response.json()).then(response => {
                this.setState({
                    products: response
                })
            })
        }, (error) => {
            console.log(error);
        })
    }

    render() {

        return(
            <div>
                <h1>Product List</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        
                    </tr>
                    </thead>
                    <tbody>
                        

                    </tbody>
                </table>

                <div>
                    <input type="text" onChange={(e) => {
                        this.setState({
                            tempUID: e.target.value
                        })
                        //setProductID(e.target.value)
                    }}/>
                    <button onClick={() => this.getJSONobject()}>Submit</button>
                    <input type="file" onChange={this.onFileChange} />
                    <button type="button" class="btn btn-primary" onClick={this.onFileUpload}>
                        Upload!
                    </button>
                    <h6>{this.state.productId}</h6>
                    <h6>{String(this.state.data)}</h6>
                    <h6>{this.state.tempUID}</h6>
                </div>

                <br/><br/>
            </div>
        )
    }
}

export default DisplayProductsComponent;