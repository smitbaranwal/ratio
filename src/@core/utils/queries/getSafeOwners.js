const getSafesOwners =  (safeAddress, callback) => {
    var wallet =   getUserID()
    var headers = new Headers()
    headers.append('accept', 'application/json')
    headers.append('x-parcel-app-token', 'Ration.Production.4a2bd5d2-c68f-4953-9bb0-942b2a2368de')
    headers.append('x-parcel-network', '1')
    headers.append('Content-Type', 'application/json')

    var body = JSON.stringify({
        auth: {
          // walletAddress: "0x0a08e7c1b23df18413e27aa9ddd2e4376f49caf3",
          walletAddress: wallet,
          auth_msg: "Allow third party app to access your data on Parcel 1684850529193",
          signature: "0x2ccfb90403167812ff51ef465cab360325f4980a559c77f230164b6d785daf8e1269c58d4e88f54882a7eb1715ef574c631c678fd3ab78a076dd6c6785d4a5fe1b"
        }
      });
      
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: body,
        redirect: 'follow'
      };
      
      fetch("https://integrations-api.parcel.money/api/v1/safes/contributors/" + safeAddress, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            result = JSON.parse(result)
            result.contributors.push({address: result.safeAddress, name: result.safeName})
            callback(result)

            // return result
        })
        .catch(error => console.log('error', error));
}

export default getSafesOwners