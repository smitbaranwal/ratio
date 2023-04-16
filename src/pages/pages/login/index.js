import React, { useState, useEffect,useContext } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Next Imports
import Link from 'next/link'
import { Router, useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import WalletContext from 'src/@core/context/walletContext'

import SafeDemo from 'src/layouts/components/safeModal/SafeModal'

// import { useNavigate } from "react-router-dom";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Index = () => {
  

  const {connect, setSelectedSafe,account,connecting} = useContext(WalletContext);
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 175,
    height: 48,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
  }))

  const handleSafe = React.useRef(null)

  useEffect(() => {
    if(!!account && !connecting){
      handleSafe.current();
    }
  }, [account, connecting])
  

  const closeSafe = (selectedSafe) => {
    console.log('selected safe is ', selectedSafe)
    setSelectedSafe(selectedSafe)
    // setDisconnect(disconnect)
    let path = `/reports/transactions`
    router.push(path)
  }


  const getSafeAPI = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  // const UserContext = React.createContext(null)

  return (
    <>
      <Box className='content-center'>
        <SafeDemo handleSafe={handleSafe} closeSafeDialog={closeSafe} />

          <Card sx={{ zIndex: 1 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImgStyled src={'/images/fin_grow.svg'} alt='Profile Pic' />
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Welcome to {themeConfig.templateName}! 👋🏻
                </Typography>
                <Typography variant='body2'>Please link your wallet and start the adventure</Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{ marginBottom: 7 }}
                  onClick={async () => await connect()}
                >
                  Connect Wallet
                </Button>
              </form>
            </CardContent>
          </Card>
          <FooterIllustrationsV1 />
        </Box>
    </>
  )
}

Index.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Index

// import React, { useState, useEffect } from 'react'
// import { ethers } from 'ethers'

// // import VConsole from 'vconsole'
// import {
//   initWeb3Onboard,
//   ethMainnetGasBlockPrices,
//   infuraRPC
// } from './services'
// import {
//   useAccountCenter,
//   useConnectWallet,
//   useNotifications,
//   useSetChain,
//   useWallets,
//   useSetLocale
// } from '@web3-onboard/react'

// // import './App.css'
// // import Header from './views/Header/Header.js'
// // import Footer from './views/Footer/Footer.js'

// // if (window.innerWidth < 700) {
// //   new VConsole()
// // }

// let provider

// const LoginPage = () => {
//   const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
//     useConnectWallet()
//   const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
//   const [notifications, customNotification, updateNotify] = useNotifications()
//   const connectedWallets = useWallets()
//   const updateAccountCenter = useAccountCenter()
//   const updateLocale = useSetLocale()

//   const [web3Onboard, setWeb3Onboard] = useState(null)

//   const [bnGasPrices, setBNGasPrices] = useState('')
//   const [rpcInfuraGasPrices, setRPCInfuraGasPrices] = useState('')
//   const [toAddress, setToAddress] = useState('')

//   // default test transaction to Goerli
//   const [toChain, setToChain] = useState('0x5')
//   const [accountCenterPosition, setAccountCenterPosition] = useState('topRight')
//   const [notifyPosition, setNotifyPosition] = useState('topRight')
//   const [locale, setLocale] = useState('en')
//   const [accountCenterSize, setAccountCenterSize] = useState('normal')

//   useEffect(() => {
//     setWeb3Onboard(initWeb3Onboard)
//   }, [])

//   useEffect(() => {
//     console.log(notifications)
//   }, [notifications])

//   useEffect(() => {
//     if (!connectedWallets.length) return

//     const connectedWalletsLabelArray = connectedWallets.map(
//       ({ label }) => label
//     )

//     // Check for Magic Wallet user session
//     if (connectedWalletsLabelArray.includes('Magic Wallet')) {
//       const [magicWalletProvider] = connectedWallets.filter(
//         provider => provider.label === 'Magic Wallet'
//       )
//       async function setMagicUser() {
//         try {
//           const { email } =
//             await magicWalletProvider.instance.user.getMetadata()
//           const magicUserEmail = localStorage.getItem('magicUserEmail')
//           if (!magicUserEmail || magicUserEmail !== email)
//             localStorage.setItem('magicUserEmail', email)
//         } catch (err) {
//           throw err
//         }
//       }
//       setMagicUser()
//     }
//   }, [connectedWallets, wallet])

//   useEffect(() => {
//     if (!wallet?.provider) {
//       provider = null
//     } else {
//       provider = new ethers.providers.Web3Provider(wallet.provider, 'any')

//     }
//   }, [wallet])

//   useEffect(() => {
//     ethMainnetGasBlockPrices.subscribe(estimates => {
//       setBNGasPrices(estimates[0].blockPrices[0].estimatedPrices)
//     })
//   }, [])

//   useEffect(() => {
//     async function getEtherGasFromRPC() {
//       const customHttpProvider = new ethers.providers.JsonRpcProvider(infuraRPC)
//       const fee = await customHttpProvider.getFeeData()

//       const cleanFees = {
//         price: ethers.utils.formatUnits(fee.gasPrice, 'gwei'),
//         maxPriorityFeePerGas: ethers.utils.formatUnits(
//           fee.maxPriorityFeePerGas,
//           'gwei'
//         ),
//         maxFeePerGas: ethers.utils.formatUnits(fee.maxFeePerGas, 'gwei')
//       }
//       setRPCInfuraGasPrices(cleanFees)
//     }
//     getEtherGasFromRPC()
//   }, [bnGasPrices])

//   const gasView = gasObj => {
//     return Object.keys(gasObj)
//       .filter(prop => prop !== 'price')
//       .map(key => (
//         <section value={key} key={key}>
//           {key} : {gasObj[key]}
//         </section>
//       ))
//   }

//   const gasDiff = bnGas => {
//     const priFeeDiff =
//       rpcInfuraGasPrices.maxPriorityFeePerGas - bnGas.maxPriorityFeePerGas
//     const maxFeeDiff = rpcInfuraGasPrices.maxFeePerGas - bnGas.maxFeePerGas

//     return priFeeDiff + maxFeeDiff
//   }

//   if (!web3Onboard) return <div>Loading...</div>

//   return (
//     <main>
//       {/* <Header
//         connectedChain={wallet ? connectedChain : null}
//         address={wallet?.accounts[0]?.address}
//         balance={wallet?.accounts[0]?.balance}
//         ens={wallet?.accounts[0]?.ens}
//       /> */}
//       <section className="main">
//         <div className="main-content">
//           <div className="vertical-main-container">
//             <div className="container onboard">
//               <h2>Onboarding Users with Web3-Onboard</h2>
//               {wallet && (
//                 <div className="network-select">
//                   <label>Switch Chains</label>
//                   {settingChain ? (
//                     <span>Switching Chains...</span>
//                   ) : (
//                     <select
//                       className="chain-select"
//                       onChange={({ target: { value } }) =>
//                         setChain({ chainId: value })
//                       }
//                       value={connectedChain?.id}
//                     >
//                       {chains.map(({ id, label }) => {
//                         return (
//                           <option value={id} key={id}>
//                             {label}
//                           </option>
//                         )
//                       })}
//                     </select>
//                   )}
//                 </div>
//               )}
//               <div className="account-center-actions">
//                 <div>
//                   {!wallet && (
//                     <button
//                       className="bn-demo-button"
//                       onClick={async () => {
//                         const walletsConnected = await connect()
//                         console.log('connected wallets: ', walletsConnected)
//                       }}
//                     >
//                       Select a Wallet
//                     </button>
//                   )}

//                   {wallet && (
//                     <button
//                       className="bn-demo-button"
//                       onClick={async () => {
//                         const walletsConnected = await connect()
//                         console.log('connected wallets: ', walletsConnected)
//                       }}
//                     >
//                       Connect Another Wallet
//                     </button>
//                   )}

//                   {wallet && (
//                     <button
//                       className="bn-demo-button"
//                       onClick={async () => {
//                         const walletsConnected = await disconnect(wallet)
//                         console.log('connected wallets: ', walletsConnected)
//                         window.localStorage.removeItem('connectedWallets')
//                       }}
//                     >
//                       Reset Wallet State
//                     </button>
//                   )}
//                   {wallet && wallet?.dashboard && (
//                     <button
//                       className="bn-demo-button"
//                       onClick={wallet?.dashboard}
//                     >
//                       Open Wallet Dashboard
//                     </button>
//                   )}
//                   {wallet &&
//                     wallet?.type === 'hardware' &&
//                     wallet.accounts[0].address && (
//                       <button
//                         className="bn-demo-button"
//                         onClick={web3Onboard.accountSelect}
//                       >
//                         Switch Account
//                       </button>
//                     )}
//                 </div>
//                 <div>
//                   {wallet && (

//                     // If providing a DAppId w/ Notifications enabled within the
//                     // onboard initialization balances are updated automatically
//                     <button
//                       className="bn-demo-button"
//                       onClick={() => updateBalances}
//                     >
//                       Update Balances
//                     </button>
//                   )}
//                   {wallet && (
//                     <button
//                       className="bn-demo-button"
//                       onClick={e => {
//                         updateLocale(locale === 'es' ? 'en' : 'es')
//                         setLocale(locale === 'es' ? 'en' : 'es')
//                         updateAccountCenter({ expanded: true })
//                         e.stopPropagation()
//                       }}
//                     >
//                       Set Locale To {locale === 'es' ? 'English' : 'Spanish'}
//                     </button>
//                   )}
//                   {wallet && (
//                     <button
//                       className="bn-demo-button"
//                       onClick={e => {
//                         setAccountCenterSize(prevState => {
//                           return prevState === 'minimal'
//                             ? 'normal'
//                             : prevState === 'normal'
//                             ? 'expanded'
//                             : 'minimal'
//                         })
//                         updateAccountCenter(
//                           accountCenterSize === 'minimal'
//                             ? { minimal: false }
//                             : accountCenterSize === 'normal'
//                             ? { minimal: true, expanded: true }
//                             : { minimal: true, expanded: false }
//                         )
//                         e.stopPropagation()
//                       }}
//                     >
//                       Set Account Center To{' '}
//                       {accountCenterSize === 'minimal'
//                         ? 'Collapsed'
//                         : accountCenterSize === 'normal'
//                         ? 'Expanded'
//                         : 'Minimal'}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="container notify">
//               <h2>Transaction Notifications with Notify</h2>
//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'flex-start',
//                   marginBottom: '1rem'
//                 }}
//               >
//                 <div style={{ marginBottom: '1rem' }}>
//                   <label>
//                     Send 0.001{' '}
//                     <select
//                       onChange={({ target: { value } }) => setToChain(value)}
//                       value={toChain}
//                     >
//                       {chains.map(({ id, label }) => {
//                         if (label === 'Goerli' || label === 'Polygon - Mumbai') {
//                           return (
//                             <option value={id} key={id}>
//                               {label}
//                             </option>
//                           )
//                         }

//                         return null
//                       })}
//                     </select>{' '}
//                     Test Eth to:
//                   </label>
//                   <input
//                     type="text"
//                     style={{
//                       padding: '0.5rem',
//                       border: 'none',
//                       borderRadius: '10px',
//                       marginLeft: '0.5rem',
//                       width: '18rem'
//                     }}
//                     value={toAddress}
//                     placeholder="address"
//                     onChange={e => setToAddress(e.target.value)}
//                   />
//                 </div>
//                 <div className={'send-transaction-container'}>
//                   <button
//                     className="bn-demo-button"
//                     onClick={async () => {
//                       const ready = await readyToTransact()
//                       if (!ready) return
//                       sendHash()
//                     }}
//                   >
//                     Send
//                   </button>
//                   with in-flight notifications
//                 </div>
//                 <div className={'send-transaction-container'}>
//                   <button
//                     className="bn-demo-button"
//                     onClick={async () => {
//                       const ready = await readyToTransact()
//                       if (!ready) return
//                       sendTransaction()
//                     }}
//                   >
//                     Send
//                   </button>
//                   with pre-flight and in-flight notifications
//                 </div>
//               </div>
//               <div>
//                 <button
//                   className="bn-demo-button"
//                   onClick={() => {
//                     const { update, dismiss } = customNotification({
//                       eventCode: 'dbUpdate',
//                       type: 'hint',
//                       message: 'Custom hint notification created by the dapp',
//                       onClick: () => window.open(`https://www.blocknative.com`)
//                     })

//                     // Update your notification example below
//                     // setTimeout(
//                     //   () =>
//                     //     update({
//                     //       eventCode: 'dbUpdateSuccess',
//                     //       message: 'Hint notification reason resolved!',
//                     //       type: 'success',
//                     //       autoDismiss: 5000
//                     //     }),
//                     //   4000
//                     // )
//                     setTimeout(
//                       () =>

//                         // use the dismiss method returned or add an autoDismiss prop to the notification
//                         dismiss(),
//                       4000
//                     )
//                   }}
//                 >
//                   Custom Hint Notification
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="container ui-settings">{renderNotifySettings()}</div>
//           <div className="container ui-settings">
//             {renderAccountCenterSettings()}
//           </div>
//         </div>
//         {bnGasPrices && (
//           <div className="bn-gas-container">
//             Web3-Onboard Gas Package Mainnet Pricing
//             <div className="bn-gas">
//               {bnGasPrices.map(conf => {
//                 return (
//                   <div className="gas-container" key={conf.confidence}>
//                     {gasView(conf)}
//                     {rpcInfuraGasPrices && (
//                       <section>gwei saved : {gasDiff(conf).toFixed(3)}</section>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         )}
//         {rpcInfuraGasPrices && (
//           <div className="rpc-gas-container">
//             Ethers.js Mainnet Gas Pricing
//             <div className="gas-container rpc-gas">
//               {gasView(rpcInfuraGasPrices)}
//             </div>
//           </div>
//         )}
//       </section>
//       {/* <Footer /> */}
//     </main>
//   )
// }

// export default LoginPage

// // export default App
