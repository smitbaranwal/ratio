import { Client } from "@covalenthq/client-sdk";

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
    } else {
      trx.FiatValue = 12.08
    }

  })
  // addressArray.push('0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198')
  // addressArray.push('0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198')

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  const client = new Client("cqt_rQJ7F4cYXR7HjR7mXpx6fB4DpqPv")

  const promises = []

  let onehistory = {
    id: "bankless-dao",
    symbol: "bank",
    name: "Bankless DAO",
    image: {
      thumb: "https://assets.coingecko.com/coins/images/15227/thumb/j4WEJrwU.png?1622615796",
      small: "https://assets.coingecko.com/coins/images/15227/small/j4WEJrwU.png?1622615796"
    },
    market_data: {
      current_price: {
        usd: 0.023620571469385076
      },
      market_cap: {
        usd: 38386.2007299591
      }
    },
    community_data: {
      facebook_likes: null,
      twitter_followers: null,
      reddit_average_posts_48h: 0,
      reddit_average_comments_48h: 0,
      reddit_subscribers: null,
      reddit_accounts_active_48h: null
    },
    developer_data: {
      forks: null,
      stars: null,
      subscribers: null,
      total_issues: null,
      closed_issues: null,
      pull_requests_merged: null,
      pull_request_contributors: null,
      code_additions_deletions_4_weeks: {
        additions: null,
        deletions: null
      },
      commit_count_4_weeks: null
    },
    public_interest_stats: {
      alexa_rank: null,
      bing_matches: null
    }
  }
  historicalFiats.forEach((data, i) => {
    const formattedDate = getFormattedDate(data.date)

    const promise = client.PricingService.getTokenPrices("eth-mainnet","USD", data.token, {"from": formattedDate,"to": formattedDate})
      .then(resp => {
        if (!resp.data[0].prices[0] || resp.data[0].prices[0] == undefined || resp.data[0].prices[0] == null) {
          // console.log('no responce price data', data)
          data.usd = 12.08 // pushed some hard coded values which is to be  removed in future when data is available
          data.response = onehistory
        } else {
          data.usd = resp.data[0].prices[0].price
          data.response = resp.data[0]
        }
      })
      .catch(error => {
        console.error(`Error token price for call ${i + 1}:`, error)
      })

      promises.push(promise)
  })

    Promise.all(promises).then(() => {
      console.log("All token price API calls completed.")
    })
    .catch(error => {
      console.error("Error in token price API calls:", error)
    })

  const requests = []
  addressArray.forEach(address => {
    requests.push('https://safe-transaction-mainnet.safe.global/api/v1/tokens/' + address + '/prices/usd')
  })

  /*
  * coingeko API calls removed, can be used after license
  */
  // historicalFiats.forEach(data => {
    // requests.push('https://api.coingecko.com/api/v3/coins/' + data.tokenSymbol + '/history?date=' + data.date  + '&localization=false')
  // })

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

 /*
  * coingeko API response removed, can be used after license
  
  results.forEach((historicaldata, index) => {
    if (historicaldata && index > (addressArray.length - 1)) {
      // historicalFiats[index - (addressArray.length)].usd = historicaldata.market_data.current_price.usd
      // historicalFiats[index - (addressArray.length)].response = historicaldata
      // onehistory = historicaldata
    } else {
      // historicalFiats[index - (addressArray.length)].usd = onehistory.market_data.current_price.usd
      // historicalFiats[index - (addressArray.length)].response = onehistory
    }
  })
  
  */
    console.log(results)
    data.forEach(trx => {
      if (addressFiats[trx.Token]) {
        trx['FiatValue'] = parseFloat(addressFiats[trx.Token]['fiatPrice'] * trx.TokenAmount).toFixed(2)
        trx['FiatPrice'] = addressFiats[trx.Token]['fiatPrice']
      }
      // debugger
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

function getFormattedDate(date) {
  const parts = date.split(" ");
    const datePart = parts[0];
    const [day, month, year] = datePart.split("-");
    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
}

export default getFiatCurrency