import React from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import {RUN_ORDER_LIST_NEW_API_URL} from "../common/constants";
import { useEffect, useState } from "react";

export default function RunNewOrderListComponent (props) {

    const location = useLocation();
    // console.log(location)

    useEffect(() => {
        runOrderList(location.state.product_uid)
    }, []);

    const [orderList, setOrderList] = useState(null);
    // const [bom, setBom] = useState(null);



    const runOrderList = (productId) => {
        // const config = {
        //     method: 'post',
        //     url: `${RUN_CTB}`,
        //     data: {
        //         product_uid: productId
        //     }
        // }
        // axios(config)

        axios.post(`${RUN_ORDER_LIST_NEW_API_URL}`, {
            product_uid: productId
        }).then((response) =>{
            // console.log('***')
            // console.log(response.data);
            setOrderList(response.data)
            // console.log(CTB);
        }, (error) => {
            console.log(error);
        })
    }

    return(
        <div>
            <h1>New Order List: {location.state.product_uid}</h1>
            {orderList && <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">GrandParent_BOM_pn</th>
                    <th scope="col">gp_lft</th>
                    <th scope="col">Child_pn</th>
                    <th scope="col">RequiredQty</th>
                </tr>
                </thead>
                <tbody>

                {
                    orderList.map((row, index) =>
                        <tr key={index}>
                            {/*<th scope="row">{row['Level']}</th>*/}
                            <td>{row['GrandParent_BOM_pn']}</td>
                            <td>{row['gp_lft']}</td>
                            <td>{row['Child_pn']}</td>
                            <td>{row['RequiredQty']}</td>
                        </tr>
                    )}

                </tbody>
            </table>}


        </div>
    )
}

