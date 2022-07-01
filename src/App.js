//import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import axios from "axios";
import ImageUploading from 'react-images-uploading';
import DisplayProductsComponent from './DisplayProductsComponent';

function App() {
  const [images,setImages] = useState();
  const [file, setFile] = useState("");
  const [productId, setProductID] = useState("");
  const maxNumber = 2;
  const [data, setData] = useState();
  
  const getJSONobject = () => {
    console.log(productId);
    const postURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB"
    const payload = {
      "product_uid": productId
    }
    axios.post(postURL, payload).then((res) => {
      console.log(res);
      console.log(res.data[0]);
      if(res.data[0]!=null) {
        setData(res.data[0]["Child_pn"]);
        
      }
      else {
        console.log("bad");
        setData("Please enter a valid Product UID")
      }
      
    })
  }
 
    


    const updateData = (index) => {

        let formData = new FormData();
        console.log("in update data 1");
        console.log("File",  images[index].file)
        formData.append('image_title',  images[index].file.name);
        formData.append('image_description', "upload from app");
        formData.append('image_cost', "");
        formData.append('image_file', images[index].file);
        console.log("in update data 2");
        console.log(formData);
        axios.post("https://bmarz6chil.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadImage", formData)
            .then((response) => {
                console.log("image",response.data)
                setFile(response.data)
                //  history.push("/blog")
            });
    }

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit

        console.log("below is the image list", imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        // Background image
        <div class="backgroundimg"
             style={{
                 maxWidth: "915px",
                 height: "812px",
                 //backgroundImage: `url(${background})`,
             }}
        >
            
            <div>
                
                <div class="message">

                    

                    {/*<button onClick={upload} children="upload to database" />*/}

                </div>
            </div>
            <div>
              
              <h4>{data}</h4>
            </div>
            <DisplayProductsComponent/>

        </div>
    )
}

export default App;
