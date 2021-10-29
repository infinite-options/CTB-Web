import React from "react";
import ReactDOM from 'react-dom';
import {findAllProducts} from "../services/ProductService";

export default class ProductComponent extends React.Component {
    state = {
        products: []
    }

    componentDidMount = async () => {
        const allProducts = await findAllProducts()
        this.setState({
            products: allProducts
        })
    }

    render() {
        console.log(this.state.products)
        return (
            <div>
                <h1>Products</h1>

                <ul>

                    {this.state.products.map((item, i) => {

                        return <li key={i}>{item.product_uid} - {item.product_BOM}</li>

                    })}

                </ul>
            </div>
        )
    }
}
