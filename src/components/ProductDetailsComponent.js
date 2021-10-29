import React from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetailsComponent (props)  {


    const location = useLocation();
    console.log(location)


    return (
        <div>
            {location.state.product_uid}
    </div>)
}
