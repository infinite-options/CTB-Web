import Select from 'react-select'

const SelectGrandparents = ({topLevelAssy, setTopLevelAssy, grandparents}) => {
    const options = []
    const gp = {grandparents}

    const handleSelectChange = (selectedOption) => {
        setTopLevelAssy(selectedOption)
    }
    

    console.log(options)

    return (
        <Select 
            value={topLevelAssy}
            onChange={handleSelectChange}
            options={options}
            />
    )
}

export default SelectGrandparents