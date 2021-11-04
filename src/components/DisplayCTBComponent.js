import React from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import {RUN_CTB_API_URL} from "../common/constants";
import { useEffect, useState } from "react";

export default function DisplayCTBComponent (props) {

    const location = useLocation();
    // console.log(location)

    useEffect(() => {
        getCTB(location.state.product_uid)
    }, []);

    const [CTB, setCTB] = useState(null);
    // const [bom, setBom] = useState(null);



    const getCTB = (productId) => {

        axios.post(`${RUN_CTB_API_URL}`, {
            product_uid: productId
        }).then((response) =>{
            // console.log('***')
            // console.log(response.data);
            setCTB(response.data)
            // console.log(CTB);
        }, (error) => {
            console.log(error);
        })
    }

    return(
        <div>
            <h1>CTB: {location.state.product_uid}</h1>
            {CTB && <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">BOM_Level</th>
                    <th scope="col">GrandParent_BOM_pn</th>
                    <th scope="col">gp_lft</th>
                    <th scope="col">Child_pn</th>
                    <th scope="col">BOM_lft</th>
                    <th scope="col">Qty_per</th>
                    <th scope="col">RequiredQty</th>
                </tr>
                </thead>
                <tbody>

                {
                    CTB.map((row, index) =>
                        <tr key={index}>
                            {/*<th scope="row">{row['Level']}</th>*/}
                            <td>{row['BOM_Level']}</td>
                            <td>{row['GrandParent_BOM_pn']}</td>
                            <td>{row['gp_lft']}</td>
                            <td>{row['Child_pn']}</td>
                            <td>{row['BOM_lft']}</td>
                            <td>{row['Qty_per']}</td>
                            <td>{row['RequiredQty']}</td>
                        </tr>
                    )}

                </tbody>
            </table>}


        </div>
    )
}

