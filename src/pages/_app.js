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

import { Analytics } from '@vercel/analytics/react'

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
    <>
      <CacheProvider value={emotionCache}>
      <Head>
        <title>ratio.money</title>
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
    <Analytics />
    </>
  )
}

export default App
