import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {CREATE_BOM_API_URL, GET_PRODUCT_API_URL} from "../common/constants";
import {DisplayBOMComponent} from "./DisplayBOMComponent";
import { useHistory } from 'react-router';

export default class CreateBOMComponent extends React.Component {

    state = {

        // Initially, no file is selected
        selectedFile: null,
        productDetails: null,
        bom: null
    };

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
                this.getProductDetails(response.data)
            }, (error) => {
                console.log(error);
            });
    };

    getProductDetails = (productId) => {
        axios.get(`${GET_PRODUCT_API_URL}/${productId}`)
            .then((response) =>{
                console.log('***')
                console.log(response);
                let bom_json = JSON.parse(response.data[0].product_BOM)
                bom_json.map(row => {
                    console.log(row)
                })
                this.setState({
                    productDetails: response.data[0],
                    bom: bom_json
                })
            }, (error) => {
                console.log(error);
            })
    }

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>


                    <p>File Type: {this.state.selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    {/*<h4>Choose before Pressing the Upload button</h4>*/}
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                {
                    !this.state.productDetails &&
                    <div>
                        <h1>
                            BOM Creator
                        </h1>

                        <div>
                            <input type="file" onChange={this.onFileChange} />
                            <button onClick={this.onFileUpload}>
                                Upload!
                            </button>
                        </div>
                        {this.fileData()}
                    </div>
                }

                {
                    this.state.productDetails &&
                    <DisplayBOMComponent productDetails = {this.state.productDetails}
                    bom = {this.state.bom}/>
                }

            </div>
        );
    }
}
