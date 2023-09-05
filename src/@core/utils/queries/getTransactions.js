const getTransactions = (setTransactions, setOpen) => {
  var myHeaders = new Headers()
  const safeAddress = localStorage.getItem('safeAccount')
  const rows = []
  const mapping = mappingTokens.find(safeToken => safeToken.safeAddress === safeAddress)
  myHeaders.append('x-parcel-export-token', mapping.token)
  myHeaders.append('x-parcel-network', '1')
  myHeaders.append('Content-Type', 'application/json')

  var raw = '{\n  "start_date": "01/01/2012",\n  "end_date": "01/01/2024",\n  "category": []\n}'

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch(
    'https://integrations-api.parcel.money/api/v1/transactionsForSafe/'+ safeAddress +'/export?downloadType=json',
    requestOptions
  )
    .then(response => response.text())
    .then(result => {
      console.log('data', { result })
      result = JSON.parse(result)
      result.rows.forEach(element => {
        rows.push(createDataRow(element, result.headers))
      })
      // rows = rows.filter(trx => trx.TokenAmount && trx.TokenAmount > 0)
      setTransactions(rows)

      // if(rows.map((value)=> value.TokenAmount == "--" || value.TokenAmount == 0 )){
      //   console.log("hi")
      // } else {
      //   console.log("rows",{rows})
      // }
      setOpen(false)
    })
    .catch(error => console.log('error', error))
}

const createDataRow = (row, header) => {
  const rowData = {}
  header.forEach((prop, index) => {
    rowData[prop.replace(' ', '')] = row[index]
  })
  if (rowData.TokenSymbol == 'BANK') {
    // case of BANK
    rowData.Token = '0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198'
  } else if (rowData.TokenSymbol == 'ETH' || rowData.TokenSymbol == 'ethereum') {
    // case of ETH
    // rowData.Token = '0x0000000000000000000000000000000000000000'
    rowData.Token = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    // rowData.Token = '0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198';
    // rowData.Token = '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5';
    // 0x6B175474E89094C44Da98b954EedeAC495271d0F DAI
  } else if (rowData.TokenSymbol == 'DAI') {
    rowData.Token = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  }

  return rowData
}

export default getTransactions

export const mappingTokens = JSON.parse(process.env.NEXT_PUBLIC_SAFES)
