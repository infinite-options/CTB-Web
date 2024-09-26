import axios from 'axios'

const SaveIDbutton = ({ productID, setOrderList, setGrandparentPN, setTopLevelAssy}) => {

    const runOrderListEndpoint = 'https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunOrderList'

    const onClick = (event) => {
        // Prevents page refresh
        event.preventDefault()

        axios.post(runOrderListEndpoint, { 'product_uid': {productID}.productID })
            .then((response) => {
                console.log('Run Order List Response', response)

                // Update OrderList State
                setOrderList(response.data)
                
                 // Update GrapndparentPN State
                const grandparents = new Set(
                    Object.values(response.data).map(entry => 
                        entry['GrandParent_BOM_pn']))
                setGrandparentPN(Array.from(grandparents))
                
                // Update Top Level Assembly with first grandparent as default
                setTopLevelAssy(Array.from(grandparents)[0])
            }, (error) => {
                console.log(error)
            })  
    }

    return (
        <button id="saveIDbtn"onClick={onClick}>Save</button>
    )
}

export default SaveIDbutton