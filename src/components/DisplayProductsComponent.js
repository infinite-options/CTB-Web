import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {findAllProducts} from "../services/ProductService";
import {CREATE_BOM_API_URL} from "../common/constants";

export default class DisplayProductsComponent extends React.Component {

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
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post(CREATE_BOM_API_URL, formData)
            .then((response) => {
                console.log('###')
                console.log(response);
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                findAllProducts().then(response => {
                    this.setState({
                        products: response
                    })
                })
            }, (error) => {
                console.log(error);
            });
    };

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
                                <th scope="row">{row['product_uid']}</th>
                                <td>{row['product_created']}</td>
                                <td>{row['product_desc']}</td>
                                <td>Todo</td>
                            </tr>
                        )}

                    </tbody>
                </table>

                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>

                <br/><br/>
            </div>
        )
    }
}
