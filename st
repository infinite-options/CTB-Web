  for(let i,j = 0; bom[i].GrandParent_BOM_pn == "A"; i++, j++){
    rows.push(new RowData(bom[i].Child_pn, bom[i].Qty_per, bom[i].Qty_per));
    //console.log(bom[i].Qty_per);
    sum += bom[i].Qty_per;
    // i++;
  }

  <table>
  <caption class="table-title">Product A Qty 10</caption>
  <tr>
      <th>Part</th>
      <th>Qty Per</th>
      <th>Order Qty</th>
  </tr>
  <tr>
      <td>J</td>
      <td>5.0</td>
      <td>50</td>
  </tr>
  <tr>
      <td>K</td>
      <td>9.0</td>
      <td>90</td>
  </tr>
  <tr>
      <td></td>
      <td>...</td>
      <td></td>
  </tr>
  <tr>
      <td></td>
      <td></td>
      <td></td>
  </tr>

  
</table>
