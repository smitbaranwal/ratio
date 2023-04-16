// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import "./app.css"

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { UserContext, UserContextConsumer, UserContextProvider } from 'src/utils/context/UserContext'
import { WalletContextProvider } from 'src/@core/context/walletContext'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  
  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return ( 
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Financial Growth</title>
        <meta
          name='description'
          content={`Transactions can be categorized using a small tagging methodology and can be considered as metadata of any transaction.`}
        />
        <meta name='keywords' content='' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={initialSettings}>
                <WalletContextProvider>{getLayout(<Component {...pageProps} />)}</WalletContextProvider>
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App

// const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/a00cfc13-f7f5-492d-963c-80e2cffad266'

// const injected = injectedModule()

// const onboard = Onboard({
//   wallets: [injected],
//   chains: [
//     {
//       id: '0x1',
//       token: 'ETH',
//       label: 'Ethereum Mainnet',
//       rpcUrl: MAINNET_RPC_URL
//     }
//   ]
// })

// const wallets = await onboard.connectWallet()

// console.log(wallets)

// if (wallets[0]) {
//   // create an ethers provider with the last connected wallet provider
//   // if using ethers v6 this is:
//   // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
//   const ethersProvider = new ethers.providers.Web3Provider(wallets[0].provider, 'any')

//   const signer = ethersProvider.getSigner()

//   // send a transaction with the ethers provider
//   const txn = await signer.sendTransaction({
//     to: '0x',
//     value: 100000000000000
//   })

//   const receipt = await txn.wait()
//   console.log(receipt)
// }
