const getSafesAddress = (userAccountNumber, setSafeAddress) => {
    console.log("userAccountNumber", userAccountNumber)
    if (!userAccountNumber) {
      // for fake pesto login
      userAccountNumber = '0x0a08e7C1b23df18413e27aA9DdD2e4376f49caF3'
    }
    // var myHeaders = new Headers()
    const safes = []
    // no need of header in this API
    // myHeaders.append('x-parcel-export-token', '0xa4e8b26ae20b02a964a20eb10cc5dc26197d71ed7434a1abb280d608a3f8edff')
    // myHeaders.append('x-parcel-network', '5')
    // myHeaders.append('Content-Type', 'application/json')




    // const collectSafeAddress = async (account) => {
    //     console.log("collectSafeAddress", account)
    //     try {
    //       let response = await Axios.get(
    //         `https://safe-transaction-mainnet.safe.global/api/v1/owners/${account}/safes/`,
    //       );
    //       setSafeAddress(response.data.safes)
          
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

  
    // var raw = '{\n  "start_date": "01/01/2012",\n  "end_date": "01/01/2024",\n  "category": []\n}'
  
    var requestOptions = {
      method: 'GET',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    }
    
  
    fetch(
        `https://safe-transaction-mainnet.safe.global/api/v1/owners/${userAccountNumber}/safes/`,
        requestOptions
    )
      .then(response => response.text())
      .then(result => {
        console.log("result", { result })
         result = JSON.parse(result)
         console.log("result", result)
        // result.safes.forEach(element => {
        //   safes.push(createDataRow(element, result.headers))
        // })
        setSafeAddress(result.safes)
      })
      .catch(error => console.log('error', error))
  }
  
//   const createDataRow = (row, header) => {
//     const rowData = {}
//     header.forEach((prop, index) => {
//       rowData[prop.replace(' ', '')] = row[index]
//     })

//     return rowData
//   }
  
  export default getSafesAddress
  