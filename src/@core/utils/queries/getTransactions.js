const getTransactions = (setTransactions, setOpen) => {
  var myHeaders = new Headers()
  // debugger
  const safeAddress = localStorage.getItem('safeAccount')
  const rows = []
  const mapping = mappingTokens.find(safeToken => safeToken.safeAddress === safeAddress)
  // myHeaders.append('x-parcel-export-token', '0xa4e8b26ae20b02a964a20eb10cc5dc26197d71ed7434a1abb280d608a3f8edff')
  // myHeaders.append('x-parcel-export-token', '0x217bc1d1d2a54c08de685c061b48ccd2df7bafebff15380011bdcd11d8f6851f')
  // myHeaders.append('x-parcel-export-token', '0x7fb865d12a814b69c3a9697c144324c2949bb05c5fee54268656f2b1fe72d2b8')
  myHeaders.append('x-parcel-export-token', mapping.token)
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
    'https://integrations-api.parcel.money/api/v1/transactionsForSafe/'+ safeAddress +'/export?downloadType=json',
    requestOptions
  )
    .then(response => response.text())
    .then(result => {
      console.log('data', { result })
      result = JSON.parse(result)
      result.rows.forEach(element => {
        rows.push(createDataRow(element, result.headers))
      })
      // rows = rows.filter(trx => trx.TokenAmount && trx.TokenAmount > 0)
      setTransactions(rows)

      // if(rows.map((value)=> value.TokenAmount == "--" || value.TokenAmount == 0 )){
      //   console.log("hi")
      // } else {
      //   console.log("rows",{rows})
      // }
      setOpen(false)
    })
    .catch(error => console.log('error', error))
}

const createDataRow = (row, header) => {
  const rowData = {}
  header.forEach((prop, index) => {
    rowData[prop.replace(' ', '')] = row[index]
  })
  if (rowData.TokenSymbol == 'BANK') {
    // case of BANK
    rowData.Token = '0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198'
  } else if (rowData.TokenSymbol == 'ETH') {
    // case of ETH
    rowData.Token = '0x0000000000000000000000000000000000000000'
    // rowData.Token = '0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198';
    // rowData.Token = '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5';
  }

  return rowData
}

export default getTransactions

export const mappingTokens = [
  {
    safeAddress: "0x8a3dAE25C39B114a0B86E4e7900cB3C29BD8F637",
    token: "0xc23c0474f83793230275a8051cfdd621446361ed1da1d2bcae29e892e7b8d76b",
  },
  {
    safeAddress: "0xb40f4ce59dA4A0B6D10aE605E10FD4E6ca9Ed4Ae",
    token: "0xead70ae6c2deb47d23b07226da8a1c2df1469cf1c0f8d96c88f97c38e9a3aae2",
  },
  {
    safeAddress: "0xb048405EFb54E8dCE9B9E49eef20aCdA2a9632D9",
    token: "0xe2e8a26bce1f863c8b9dec8a758442cc455209a1319cb93f5cfe31ae357062fb",
  },
  {
    safeAddress: "0xe27e087f44c71ef929C67eAb59a2F15BcaE66b82",
    token: "0xfddd81cd19a28640b9b9482f7f6ec8e7fee39f10832632ada9342991ef732c80",
  },
  {
    safeAddress: "0xe7636c7ef670a3Bcf772D9d57244c9e88aD90437",
    token: "0x2b3e811d6eda5d792143a23a7aac8cc2f37f1941b9a527f6c9f177da3ad5ed62",
  },
  {
    safeAddress: "0xd4879f876eE383067F80ACAdBE283B93141908e9",
    token: "0xedf89f3e37604b6d1871277af0707f0e272d10dc55dc3151b374829aab3d4533",
  },
  {
    safeAddress: "0x09cA8B48A2b4d468daC43806751e2e3a1Fc08A31",
    token: "0x9a22dcbad9b15e509e8ecb8f1f9ae0b817e1cf9ccd7ad08da9a13da014df9c1b",
  },
  {
    safeAddress: "0xcF8422021b408B32983B525778CE45420715f094",
    token: "0x217bc1d1d2a54c08de685c061b48ccd2df7bafebff15380011bdcd11d8f6851f",
  },
  {
    safeAddress: "0xbaa44b7707FaBD05D7676358a09a1ba420a62123",
    token: "0xc466e4fed63a42e5ecca4e348d85506483fb950eb3be642daa18ed582b8bd0fd",
  },
  {
    safeAddress: "0xA4C7Aca8D49226355c5543a28c3DE0573F66494a",
    token: "0x9de50ad17912123435a2deddd11c492f40284de691bdbfbbf28a01c93dd939d7",
  },
  {
    safeAddress: "0x3aEF6716a492D5bE3D8A785b4998B94D5171B732",
    token: "0x183a4f658023a3b6f2eb9cef7076aabaae0dddb09fa39f1b13e409bf5441c139",
  },
  {
    safeAddress: "0xF0b8eE46b30B5846dD1A8F0784Ecc3d660EDd179",
    token: "0xb43861ef9d5b59b405d0d12d2fbeab94a326b84aa8b766073b81c1717063b4bd",
  },
  {
    safeAddress: "0x438F3B7FE34A9D9687D32A81a0Cfcd05b8d2E8EF",
    token: "0xa300ad3621e9ecbd08a08f73723d1b74a250b7ace6cfbd34d05c0c759a2487a2",
  },
  {
    safeAddress: "0xa0d688576e84FB53D549d1Dc49e6305EeA520725",
    token: "0xb45e203203e318c2e0aae2451a814cd76cd14cd81ae1ef716525790cc694f69c",
  },
  {
    safeAddress: "0x12BD9048b419838e25046040Dcd297aB16850280",
    token: "0x4702379cc3300ddeece4dfd8a6c5d114b8a8e066d697136721cbac93e069fd8f",
  },
  {
    safeAddress: "0x01999E431752136372a3d485F527907a6B02A1D1",
    token: "0xb5699a0f30ecfbff1ea9c181203960c91cc2ad3fc6a5ef442a083493499f7682",
  },
  {
    safeAddress: "0xf26d1Bb347a59F6C283C53156519cC1B1ABacA51",
    token: "0xee74aa1aae6f6f74381a3a1080a568da4f97009f888d720ed06475b81c26af90",
  },
  {
    safeAddress: "0x35201Cb23590bF72457F2E4Ee36D1BfeA3E7aa41",
    token: "0xd617ad784b77446b731f5e4d45a66826b98308cf3016162e056ebd2ace293caa",
  },
  {
    safeAddress: "0x31016FFCEBFf16C20E74A8610f1650DCB5c01Df3",
    token: "0x79663b4f31ac6f2c71001ed171fa9680fa78272c38791a809ac8d85ccbf2e9f4",
  },
  {
    safeAddress: "0x616df43C2FA6882F91c9c95f2d55a51633E790d7",
    token: "0x16ad6895a33a0c414263f08ccaabd9ca18f46e72d7840a1eb40541557d233355",
  },
  {
    safeAddress: "0x47F238eF7F6B9e4f8452d77228B101f7c0419733",
    token: "0xe0ae3233fcb793481fadd9e5046e8ffd38777977a3e2a5a049b42131bb28ebc2",
  },
  {
    safeAddress: "0x8a771e2874B1e8a38cb08eBCB6e1058d27Fa64c0",
    token: "0xe3a66bc30d50b895c5efd8385c8869b98bdcb7ff81d53ca6ab79d5a7086dc04b",
  },
  {
    safeAddress: "0x6A7E3Ce0eBd1C79A0cD895C7F370AAB9c43482dE",
    token: "0x35c98ba4c2c4cc8ab7c016ef67f52f861d6218d9cbc7ab52539a245a7cc71ee6",
  },
  {
    safeAddress: "0x2b00Fdf9AadAFEe22Cf56eb59BA367f6aCD0ce10",
    token: "0x5f58a569521bf67aaa9ce0a980d965f6404aa8d37ec0b0c8a29191b43842c448",
  },
  {
    safeAddress: "0x4f285257849B840ADc1e293F735cb1F31e5cF026",
    token: "0x7fb865d12a814b69c3a9697c144324c2949bb05c5fee54268656f2b1fe72d2b8",
  },
  {
    safeAddress: "0x623a12CA60D378705fd170A47b6d32C74367501D",
    token: "0x36ed40b6f9d1b10b53ea5b2278c3110cc9d525740cee966510f2fdd381682f29",
  },
  {
    safeAddress: "0x53105aD20960A842e082c60ef243C8c3C49bf518",
    token: "0xd42e4c8ea79264307fe6e290fd5e0f18a506f5af336d81dee4c9466080708b40",
  },
  {
    safeAddress: "0xfe049c23216014d2Ef6768f80F365D3Df5f3D6B7",
    token: "0xef32ea2a79f7d8b9d3a533085a88561ff18b14c6b911c5d429e4c975544b5639",
  },
  {
    safeAddress: "0x045a805c83c1D4C9E5a0bdcC5a27EFa73D2a3c0b",
    token: "0x0ec264ed603ff1d24ced64252e45da0714809e905a83a1995bdb0bba89909593",
  },
  {
    safeAddress: "0x28861eeec6ab073A36Cc299ef8186978893e21FF",
    token: "0x31cb59d20a9adfedd32fabca9ad52c7355901a0717a31dd226a7969e28fc0224",
  },
  {
    safeAddress: "0xca22f929Aa5DBe2db2d0305d31604FE0dfD386b5",
    token: "0x0379c1334daf04d2bdf45f5260ba6ebb3caa927ffc83ae7fa176b13963866b3a",
  },
  {
    safeAddress: "0xCA27C5813c314586434512ab139Cad96F6b71750",
    token: "0x1eeaeca251935b3efabab30764d4ffc957ee018db34f440535c586e2b8da8405",
  },
  {
    safeAddress: "0x77aEb46470969A68566Db09383Bcdac2325aF0E5",
    token: "0xa0fc2e57a1233f73701abcb50d2226554d9a5aadd27988e5bfea1e56230fa4cc",
  },
  {
    safeAddress: "0xCb525F65b007B2db2Dd6bE66dAB0129a63704C1b",
    token: "0xa3a477c84aa9464a00f1611fdc2261b286279394eaf0e0add50d9c11cae99273",
  },
  {
    safeAddress: "0xDbd8072cD342a100992FA8C04e784f70E404C721",
    token: "0x93f8cb196e4cb97ef876dd198d2e50c8557b648e22c5e4075138d5912fddf14a",
  },
  {
    safeAddress: "0xc7C712e02b3d99564ae830ceC33E5c3Ef45d0C8e",
    token: "0xa31050e9588b69b269d325ff7f59782de719b2789224eadd8bb59171c8b09509",
  },
  {
    safeAddress: "0x984eC14dc726B75cA3eb6A94C64D165D37EA823e",
    token: "0x5a1d2de67cee6b4eec159191eac0e4c0710ddc3f0826b6240a93636cc81f9666",
  },
  {
    safeAddress: "0x94D879812bd3f831F4Ad1F82452c58352d3d0596",
    token: "0xf6fb001ba9e01881af827a78229d371b6266cab14049868f6d055beb01008ca3",
  },
  {
    safeAddress: "0xE2D721c126150BeEE3C56A1AD71A2E0E29A411F0",
    token: "0xe530b7ac5202a9f70a09f1cdbf6d940c441f132fdc8675e1a04e3f95b5274c92",
  },
  {
    safeAddress: "0x6CE58155605636286DA7CFB7161816f04a398cA8",
    token: "0x090ac2b9db2506946a3870f9c698e5438dac1350835a214e04d412b89d967d9f",
  },
  {
    safeAddress: "0x97d2bE3c94fb2F593a49a5655743c2088489EC1a",
    token: "0xaede5c8cf17729fdd2690cb47aee77ee562954e9962c42631563daab1c1400eb",
  },
  {
    safeAddress: "0xD26b6De62363Ce83d4fA6362Da283594d0DF4EcC",
    token: "0xa9d1be393c48988c4ec05e77101f006d425e20eef4a1ed7723e22564ba0e9b16",
  },
  {
    safeAddress: "0x2Ec31d709ECE9449EB57039BE05B023559bF3CB6",
    token: "0xd9deb7153111da222d5f7e2b520f98eaed86f75f9c7106cbe46f57bae6c57477",
  },
  {
    safeAddress: "0xE5a64FC0d3396D11EB63d728791577E254Ac18Ca",
    token: "0x6e3692b86413c896de78f292c66af7ec137f6257a8f4c81c6b694a076b6550a7",
  },
  {
    safeAddress: "0xEffb6ec68373663cff3bD5B7C8C1EC5967c0b14d",
    token: "0xbc2c5056f42079d5b7383be00f6ef30aedfd235b250287ad51ca4b1b4c0b1b19",
  },
  {
    safeAddress: "0xfedCBA83379eb70E94C28D3837fE2f70E8284D12",
    token: "0xe0153a323be688eae390aa046675258fd935010abaf00897a83dcfd2983ab259",
  },
  {
    safeAddress: "0x998b56602B91fE56A9d8970192075cEA4c89D29a",
    token: "0x1ef4bb0c4827be631fc8c747621496079910ec953bae08f1834cf74458bb493d",
  },
]
