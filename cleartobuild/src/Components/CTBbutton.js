const CTBbutton = ({ productID, topLevelAssy, orderList, desiredQty, setWarning, setOrderList, setTableAvailable}) => {

    // Filters order list
    const onClick = (event) => {
        if(topLevelAssy === '' || desiredQty === '' || productID === ''){
            setWarning('Please complete the form before submitting.')
            return
        }
        
        const filteredList = Object.values(orderList).filter((entry) => {
            if(entry['GrandParent_BOM_pn'] === {topLevelAssy}.topLevelAssy) {
                return entry
            }
        })
        console.log('Filtered List: ', filteredList)
        setOrderList(filteredList)
        setTableAvailable(true)      
    }

    return (
        <button id="CTBbtn" onClick={onClick}>Clear To Build</button>
    )
}

export default CTBbutton