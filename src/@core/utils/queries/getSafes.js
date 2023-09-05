import { mappingTokens } from "./getTransactions";


const getSafesAddress = (userAccountNumber, setSafeAddress) => {

  var myHeaders = new Headers()

  myHeaders.append("x-parcel-app-token", process.env.NEXT_PUBLIC_X_APP_TOKEN);
  myHeaders.append("x-parcel-network", "1");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "auth": {
      "walletAddress": process.env.NEXT_PUBLIC_X_WALLET_ADDRESS,
      "auth_msg": process.env.NEXT_PUBLIC_AUTH_MSG,
      "signature": process.env.NEXT_PUBLIC_GET_SAFE_SIGNATURE
    },
    "concernedWallet": userAccountNumber
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

fetch("https://integrations-api.parcel.money/api/v1/safes/connectedSafes", requestOptions)
  .then(response => response.text())
  .then(result => {
    result = JSON.parse(result)
    const mappingSafes = mappingTokens
    result.safes = result.safes.filter(safe => mappingSafes.findIndex(s => s.safeAddress == safe.safeAddress) > -1)
    setSafeAddress(result.safes)
  })
  .catch(error => {
    console.log('error', error)
    setSafeAddress([])
  })
}



export default getSafesAddress