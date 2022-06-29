
//import json from "./data.json" assert { type: "json" };

//var json = require('./data.json');

function updateTable(){
    //var json = [];
    fetch('./content.json')
        .then(response => json = response.json())
        .then(data => {
            console.log(data)
        }

        )
        

    
}