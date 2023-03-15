import fortmaticModule from '@web3-onboard/fortmatic'
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import { init } from '@web3-onboard/react'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'

const INFURA_ID = '55c3912211bc4077b9a774ff6c8e9983'

const dappId = 'a00cfc13-f7f5-492d-963c-80e2cffad266'

const injected = injectedModule()
const walletConnect = walletConnectModule()

const fortmatic = fortmaticModule({
  apiKey: 'pk_test_886ADCAB855632AA'
})

const ledger = ledgerModule()

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const trezor = trezorModule(trezorOptions)

export const initWeb3Onboard = init({
  wallets: [injected, ledger, trezor, walletConnect, fortmatic],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
    }
  ],

  apiKey: dappId,
  appMetadata: {
    name: 'FinGrow',
    icon: '/images/fin_grow.jpg', // svg string icon
    description: 'Payment OS for Contributor Economy',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
    ]
  }, 

  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: false,
      minimal: false
    },
    mobile: {
      position: 'topRight',
      enabled: false,
      minimal: false
    }
  },
  notify: {
    transactionHandler: transaction => {
      if (transaction.eventCode === 'txPool') {
        return {
          autoDismiss: 0, 

          onClick: () => window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`)
        }
      }
    }
  }
})
