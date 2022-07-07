import { useState } from 'react'
import FileUpload from './FileUpload'
import Table from './Table'
import Button from './CTBbutton'
import SaveIDbutton from './SaveIDbutton'
import SelectGrandparents from './SelectGrandparents'

const Form = () => {
    const [productID, setProductID] = useState('')
    const [topLevelAssy, setTopLevelAssy] = useState('')
    const [desiredQty, setDesiredQty] = useState('')
    const [orderList, setOrderList] = useState([])
    const [grandparents, setGrandparents] = useState([])
    const [tableAvailable, setTableAvailable] = useState(false)
    const [warning, setWarning] = useState('')


    // Validates productID, topLevelAssy, desiredQty is entered when CTB button is pressed, then saves orderList and enables table
    const buttonCallback = (list) => {
        if(topLevelAssy !== '' && desiredQty !== '' && productID !== ''){
            setOrderList(list)
            setTableAvailable(true)
        } else
            setWarning('Please complete the form before submitting.')
    }
    
    return (
        <div className='container'>
             <form>
                <label>Upload your BOM</label>
                <FileUpload 
                    setProductID={(newID) => setProductID(newID)} 
                    productID={productID}/>

                <label>Enter Product ID</label>
                <input
                    onChange={(event) => setProductID(event.target.value)}
                    value={productID}
                    name='productID'/>
                <SaveIDbutton 
                    productID={productID} 
                    setOrderList={(list) => setOrderList(list)}
                    setGrandparentPN={(grandparents) => setGrandparents(grandparents)}
                    setTopLevelAssy={(grandparentPN) => setTopLevelAssy(grandparentPN)}/>

                <label>Top Level Assembly</label>
                <select
                    onChange={(event) => setTopLevelAssy(event.target.value)}
                    value={topLevelAssy}
                    name='topLevelAssy'>
                    {grandparents.map(grandparent => {
                        return(<option key={grandparent} value={grandparent}>{grandparent}</option>)
                    })}
                </select>
                
            
                <label>Desired Quantity</label>
                <input
                    onChange={(event) => setDesiredQty(event.target.value)}
                    value={desiredQty}
                    name='desiredQty'/>
            </form>

            <p>Product ID: {productID}<br/>
                Top Level Assy: {topLevelAssy}<br/>
                DesiredQty: {desiredQty}<br/>
                Grandparents: {grandparents}
            </p>

            <p id='warning'>{warning}</p>

            <Button 
                productID={productID}
                topLevelAssy={topLevelAssy}
                desiredQty={desiredQty}
                orderList={orderList}
                setWarning={setWarning}
                setOrderList={setOrderList}
                setTableAvailable={setTableAvailable}>
                Clear To Build
            </Button>

            {tableAvailable ?
                <Table 
                    orderList={orderList} 
                    desiredQty={desiredQty} 
                    topLevelAssy={topLevelAssy}/> 
                : ''}
        </div>
    )
}

export default Form