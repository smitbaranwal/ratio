const getTransactions = setTransactions => {
  var myHeaders = new Headers()
  const rows = []
  myHeaders.append('x-parcel-export-token', '0xa4e8b26ae20b02a964a20eb10cc5dc26197d71ed7434a1abb280d608a3f8edff')
  myHeaders.append('x-parcel-network', '5')
  myHeaders.append('Content-Type', 'application/json')

  var raw = '{\n  "start_date": "01/01/2012",\n  "end_date": "01/01/2024",\n  "category": []\n}'

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch(
    'https://integrations-api-beta.parcel.money/api/v1/transaction/0xA1631E16BEFd10CEDc5eD01253d6668319134C12/export?downloadType=json',
    requestOptions
  )
    .then(response => response.text())
    .then(result => {
      console.log({ result })
      result = JSON.parse(result)
      result.rows.forEach(element => {
        rows.push(createDataRow(element, result.headers))
      })
      setTransactions(rows)
      console.log({ rows })
    })
    .catch(error => console.log('error', error))
}

const createDataRow = (row, header) => {
    const rowData = {}
    header.forEach((prop, index) => {
      rowData[prop.replace(' ', '')] = row[index]
    })
  
    return rowData
  }
  
export default getTransactions
