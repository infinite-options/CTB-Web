import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const AddPart = () => {
    return(

        <div class="box">
            <h1>Add Parts</h1>
            <br/>
            <br/>
            <br/>
            <div class="text">Part Number</div>
            <input  class="input-field" type="text" placeholder="Part Number" required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Description</div>
            <input  class="input-field" type="text" placeholder="Description" required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Unit Cost</div>
            <input  class="input-field" type="text" placeholder="Unit Cost" required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Cost Unit</div>
            <input  class="input-field" type="text" placeholder="Cost Unit" required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Vendor</div>
            <input  class="input-field" type="text" placeholder="Vendor" required/>
            <br/>
            <br/>
            <br/>
            <div class="text">Origin Locatons</div>
            <input  class="input-field" type="text" placeholder="Origin Locatons" required/>
            <br/>
            <br/>
            <br/>
            <button class="big-button" >Submit</button>
        </div>


    );
        


    

};

export default AddPart;
