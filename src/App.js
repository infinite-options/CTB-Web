//import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import axios from "axios";
import ImageUploading from 'react-images-uploading';

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

        console.log("File",  images[index].file)
        formData.append('image_title',  images[index].file.name);
        formData.append('image_description', "upload from app");
        formData.append('image_cost', "");
        formData.append('image_file', images[index].file);

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
                 maxWidth: "375px",
                 height: "812px",
                 //backgroundImage: `url(${background})`,
             }}
        >
            
            <div>
                
                <div class="message">

                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                          }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </button>
                                &nbsp;
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => updateData(index)}>Upload</button>
                                            {/*<button onClick={() => onImageUpdate(index)}>Update</button>*/}
                                            <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>

                    {/*<button onClick={upload} children="upload to database" />*/}

                </div>
            </div>
            <div>
              <input type="text" onChange={(e) => {
                setProductID(e.target.value)
              }}/>
              <button onClick={() => getJSONobject()}>Submit</button>
              <h4>{data}</h4>
            </div>

        </div>
    )
}

export default App;
