import {GET_PRODUCT_API_URL, PRODUCTS_API_URL} from "../common/constants";


export const findAllProducts = () => {
    return fetch(PRODUCTS_API_URL)
        .then(response => response.json())
};

export const findProductById = (productId) => {
    return fetch(`${GET_PRODUCT_API_URL}/${productId}`)
        .then(response => response.json())
};
