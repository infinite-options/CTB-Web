import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {GET_PRODUCT_API_URL, GET_BOM_API_URL} from "../common/constants";
import { useEffect, useState } from "react";

export default function ProductDetailsComponent (props)  {


    const location = useLocation();
    // console.log(location)

    useEffect(() => {
        getProductDetails(location.state.product_uid)
    }, []);

    const [productDetails, setProductDetails] = useState(null);
    const [bom, setBom] = useState(null);



    // const getProductDetails = (productId) => {
    //     axios.get(`${GET_BOM_API_URL}/${productId}`)
    //         .then((response) =>{
    //             // console.log('***')
    //             // console.log(response);
    //             let bom_json = JSON.parse(response.data[0].product_BOM)
    //             // bom_json.map(row => {
    //             //     console.log(row)
    //             // })
    //             setProductDetails(response.data[0])
    //             setBom(bom_json)
    //             // this.setState({
    //             //     productDetails: response.data[0],
    //             //     bom: bom_json
    //             // })
    //         }, (error) => {
    //             console.log(error);
    //         })
    // }

    const getProductDetails = (productId) => {
        axios.post(`${GET_BOM_API_URL}`, {
            product_uid: productId
        })
            .then((response) =>{
                // console.log('***')
                // console.log(response);
                let bom_json = JSON.parse(response.data[0].product_BOM)
                // bom_json.map(row => {
                //     console.log(row)
                // })
                setProductDetails(response.data[0])
                setBom(bom_json)
                // this.setState({
                //     productDetails: response.data[0],
                //     bom: bom_json
                // })
            }, (error) => {
                console.log(error);
            })
    }


    return (
        <div>

            { productDetails && bom && <div>
                <h1>BOM: { productDetails.product_uid}</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Level</th>
                        <th scope="col">Part Number</th>
                        <th scope="col">Part</th>
                        <th scope="col">Quantity</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        bom.map((row, index) =>
                            <tr key={index}>
                                <th scope="row">{row['Level']}</th>
                                <td>{row['PN']}</td>
                                <td>{row['PN']}</td>
                                <td>{row['Qty']}</td>
                            </tr>
                        )}

                    </tbody>
                </table>


            </div>}
    </div>)
}
