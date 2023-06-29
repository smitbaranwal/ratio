const getFiatCurrency = (callback, data) => {
  const addressArray = []
  const addressFiats = {}
  debugger
  data.forEach(trx => {
    if (trx.Token && addressArray.findIndex(ad => ad == trx.Token) < 0 && trx.Token != '--') {
      addressArray.push(trx.Token)
    }
  })

  // addressArray.push('0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198')
  // addressArray.push('0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198')

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  const requests = []
  addressArray.forEach(address => {
    requests.push('https://safe-transaction-mainnet.safe.global/api/v1/tokens/' + address + '/prices/usd')
  })
  Promise.all(
    requests.map(url =>
      fetch(url, requestOptions)
        .then(checkStatus) // check the response of our APIs
        .then(response => response.json()) // parse it to Json
        .catch(error => console.log('There was a problem!', error))
    )
  ).then(results => {
    addressArray.forEach((add, index) => {
      addressFiats[add] = results[index]
    })
    console.log(results)
    data.forEach(trx => {
      if (addressFiats[trx.Token]) {
        trx['FiatValue'] = parseFloat(addressFiats[trx.Token]['fiatPrice'] * trx.TokenAmount).toFixed(4)
        trx['FiatPrice'] = addressFiats[trx.Token]['fiatPrice']
      }
    })
    debugger
    callback(data)
  })
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export default getFiatCurrency
