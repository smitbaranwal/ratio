const getTransactions = (setTransactions, setOpen) => {
  var myHeaders = new Headers()
  const rows = []
  // myHeaders.append('x-parcel-export-token', '0xa4e8b26ae20b02a964a20eb10cc5dc26197d71ed7434a1abb280d608a3f8edff')
  // myHeaders.append('x-parcel-export-token', '0x217bc1d1d2a54c08de685c061b48ccd2df7bafebff15380011bdcd11d8f6851f')
  myHeaders.append('x-parcel-export-token', '0x7fb865d12a814b69c3a9697c144324c2949bb05c5fee54268656f2b1fe72d2b8')
  myHeaders.append('x-parcel-network', '1')
  myHeaders.append('Content-Type', 'application/json')

  

  var raw = '{\n  "start_date": "01/01/2012",\n  "end_date": "01/01/2024",\n  "category": []\n}'

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }
  
  // 0xA1631E16BEFd10CEDc5eD01253d6668319134C12
  // 0xcF8422021b408B32983B525778CE45420715f094
  fetch(
    'https://integrations-api.parcel.money/api/v1/transaction/0x4f285257849B840ADc1e293F735cb1F31e5cF026/export?downloadType=json',
    requestOptions
  )
    .then(response => response.text())
    .then(result => {
      console.log('data', { result })
      result = JSON.parse(result)
      result.rows.forEach(element => {
        rows.push(createDataRow(element, result.headers))
      })
      setTransactions(rows)
      setOpen(false)
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
