import {CREATE_BOM_API_URL} from "../common/constants";

export const createBOM = () => {
    return fetch(CREATE_BOM_API_URL)
        .then(response => response.json())
};
