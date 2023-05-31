// const getSafesAddress = (userAccountNumber, setSafeAddress) => {
//     console.log("userAccountNumber", userAccountNumber)
//     const safes = []


  
//     var requestOptions = {
//       method: 'GET'
//     }
    
  
//     fetch(
//         `https://safe-transaction-mainnet.safe.global/api/v1/owners/${userAccountNumber}/safes/`,
//         requestOptions
//     )
//       .then(response => response.text())
//       .then(result => {
//         console.log("result", { result })
//          result = JSON.parse(result)
//          console.log("result", result)
//         setSafeAddress(result.safes)
//       })
//       .catch(error => console.log('error', error))
//   }


const getSafesAddress = (userAccountNumber, setSafeAddress) => {

  var myHeaders = new Headers();
  myHeaders.append("x-parcel-app-token", "Ration.Production.4a2bd5d2-c68f-4953-9bb0-942b2a2368de");
  myHeaders.append("x-parcel-network", "1");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "auth": {
      "walletAddress": "0xb34e945bfb07924dfe29ff914f82bc72dc153903",
      "auth_msg": "Allow third party app to access your data on Parcel 1684309631238",
      "signature": "0x437184e3326e0f007d8b1b6f4e05ac6e3e13051475c0cae1a638ff7acaaa264371008707e11b532dc644569ce6efb098c4fc36bdf197e104a86c82e58e3036511c"
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
    console.log('data safes', result)
    setSafeAddress(result.safes)
  })
  .catch(error => {
    console.log('error', error)
  })
}



export default getSafesAddress