const getFiatCurrency = (callback, data) => {
  const addressArray = []
  const addressFiats = {}
  const historicalFiats = []
  
  data.forEach(trx => {
    if (trx.Token && addressArray.findIndex(ad => ad == trx.Token) < 0 && trx.Token != '--') {
      addressArray.push(trx.Token)
    }

    if (trx.Token && trx.Token != '--' && (!trx.USDAmount || trx.USDAmount == '--')) {
      historicalFiats.push({
        token: trx.Token,
        tokenSymbol: trx.TokenSymbol == 'BANK' ? 'bankless-dao' : 'ethereum',
        date: trx.Executedat,
        trxHash: trx.TransactionHash
      })
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
  historicalFiats.forEach(data => {
    requests.push('https://api.coingecko.com/api/v3/coins/' + data.tokenSymbol + '/history?date=' + data.date  + '&localization=false')
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
  results.forEach((historicaldata, index) => {
    if (index > (addressArray.length - 1)) {
      historicalFiats[index - (addressArray.length)].usd = historicaldata.market_data.current_price.usd
      historicalFiats[index - (addressArray.length)].response = historicaldata
    }
  })
    console.log(results)
    data.forEach(trx => {
      if (addressFiats[trx.Token]) {
        trx['FiatValue'] = parseFloat(addressFiats[trx.Token]['fiatPrice'] * trx.TokenAmount).toFixed(2)
        // if (trx['FiatValue'] > 1) {
        //   trx['FiatValue'].toFixed(4)
        // } else {
        //   trx['FiatValue'].toFixed(2)
        // }
        trx['FiatPrice'] = addressFiats[trx.Token]['fiatPrice']
      }
      debugger
      if (historicalFiats.findIndex(incTrx => incTrx.trxHash == trx.TransactionHash) > -1) {
        trx.USDAmount = parseFloat(trx.TokenAmount * (historicalFiats.find(incTrx => incTrx.trxHash == trx.TransactionHash).usd)).toFixed(2)
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
