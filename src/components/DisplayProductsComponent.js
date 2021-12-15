import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {findAllProducts} from "../services/ProductService";
import {CREATE_BOM_API_URL, DELETE_PRODUCT_API_URL} from "../common/constants";
import { useHistory } from 'react-router';
import {withRouter} from "react-router";

class DisplayProductsComponent extends React.Component {

    // const history = useHistory();

    state = {
        products: null,

        // Initially, no file is selected
        selectedFile: null,
        productDetails: null,
        bom: null
    }

    componentDidMount() {
        findAllProducts().then(response => {
            this.setState({
                products: response
            })
        })
    }

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

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
                // console.log(response);
                // console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
                findAllProducts().then(response => {
                    this.setState({
                        products: response
                    })
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
            findAllProducts().then(response => {
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
                        <th scope="col">Product UID</th>
                        <th scope="col">Created</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.products && this.state.products.map((row, index) =>
                            <tr key={index}>
                                <th onClick={() => {
                                    this.props.history.push({
                                        pathname: '/product',
                                        state: {
                                            product_uid: row['product_uid']
                                        },
                                    });

                                }} scope="row">{row['product_uid']}</th>
                                <td>{row['product_created']}</td>
                                <td>{row['product_desc']}</td>
                                {/*<th onClick={() => {*/}
                                {/*    this.props.history.push({*/}
                                {/*        pathname: '/ctb',*/}
                                {/*        state: {*/}
                                {/*            product_uid: row['product_uid']*/}
                                {/*        },*/}
                                {/*    });*/}

                                {/*}} scope="row">CTB</th>*/}
                                <td>
                                    <span>
                                        <button className="btn btn-info" type="button" id="ctbBtn"
                                                onClick={() => {
                                                    this.props.history.push({
                                                        pathname: '/ctb',
                                                        state: {
                                                            product_uid: row['product_uid']
                                                        },
                                                    });

                                                }}>
                                            CTB
                                        </button>
                                        <button className="btn btn-warning" type="button" id="runOrderListBtn"
                                                onClick={() => {
                                                    this.props.history.push({
                                                        pathname: '/run_order_list',
                                                        state: {
                                                            product_uid: row['product_uid']
                                                        },
                                                    });

                                                }}>
                                            Run Order List
                                        </button>
                                        <button className="btn btn-secondary" type="button" id="newCtbButton"
                                                onClick={() => {
                                                    this.props.history.push({
                                                        pathname: '/ctb_new',
                                                        state: {
                                                            product_uid: row['product_uid']
                                                        },
                                                    });

                                                }}>
                                            CTB New
                                        </button>
                                        <button className="btn btn-success" type="button" id="newOrderListBtn"
                                                onClick={() => {
                                                    this.props.history.push({
                                                        pathname: '/run_order_list_new',
                                                        state: {
                                                            product_uid: row['product_uid']
                                                        },
                                                    });

                                                }}>
                                            Run Order List New
                                        </button>
                                        <button className="btn btn-danger" type="button" id="deleteProductBtn"
                                                onClick={() => {
                                                    this.deleteProduct(row['product_uid'])
                                                }}>
                                            Delete
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>

                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button type="button" class="btn btn-primary" onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>

                <br/><br/>
            </div>
        )
    }
}

export default withRouter(DisplayProductsComponent)
