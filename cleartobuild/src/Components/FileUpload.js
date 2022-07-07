import axios from 'axios'

const FileUpload = ({setProductID}) => {

    // On file selection, request Import File endpoint and update Product ID state with request's response
    const handleFileChange = (event) => {
        const formData = new FormData()
        formData.append('filepath', event.target.files[0])

        const importFileEndpoint = 'https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/ImportFile'
        const headers = {
            'content-type': 'multipart/form-data'
        }

        axios.post(importFileEndpoint, formData, headers)
        .then((response) => {
            console.log('Import File Response', response)
            setProductID(response.data)     // Update Product ID State in Form Component
        }, (error) => {
            console.log(error)
        })
    }

    return <input type='file' onChange={handleFileChange}/>
    
}

export default FileUpload