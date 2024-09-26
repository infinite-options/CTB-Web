const Table = ({orderList, topLevelAssy, desiredQty}) => {
    const tableDisplay = orderList.map(
        (entry) => {
            return (
                <tr>
                    <td>{entry["Child_pn"]}</td>
                    <td>{entry["RequiredQty"]}</td>
                    <td>{parseInt(entry["RequiredQty"]) * desiredQty}</td>
                </tr>
            )
        }
    )

    return (
        <div>
            <h3>Product {{topLevelAssy}.topLevelAssy}, Quantity {{desiredQty}.desiredQty}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Part</th>
                        <th>Quantity Per</th>
                        <th>Order Quantity</th>
                    </tr>
                </thead>
                <tbody>{tableDisplay}</tbody>
            </table>
        </div>
    )
}

export default Table