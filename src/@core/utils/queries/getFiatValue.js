const getFiatCurrency = (callback, data) => {
  const addressArray = []
  const addressFiats = {}
  data.forEach(trx => {
    if (trx.Token && addressArray.findIndex(ad => ad == trx.Token) < 0) {
      addressArray.push(trx.Token)
    }
  })

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
    data.forEach(trx => {
      if (addressFiats[trx.Token]) {
        trx['FiatValue'] = addressFiats[trx.Token]['fiatPrice'] * trx.TokenAmount
      }
    })
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
