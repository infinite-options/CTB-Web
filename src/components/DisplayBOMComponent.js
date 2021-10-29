import React from 'react';
import ReactDOM from 'react-dom';

export const DisplayBOMComponent  = ({productDetails, bom}) =>
    <div>
        <h1>BOM: {productDetails.product_uid}</h1>
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


    </div>

