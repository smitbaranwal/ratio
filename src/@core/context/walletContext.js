import { useConnectWallet } from '@web3-onboard/react'
import { initWeb3Onboard } from 'src/utils/initWeb3Onboard'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

const { createContext, useEffect, useState } = require('react')

// ** Create Context
const WalletContext = createContext({})

// ** Create Context Provider
export const WalletContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [selectedSafe, setSelectedSafe] = useState(null)
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [, setWeb3Onboard] = useState(null)
  const [provider, setProvider] = useState(null)
  const router = useRouter();
  
  console.log({wallet,account,selectedSafe,connecting},'from walletContext')


  useEffect(() => {
    if(!wallet?.accounts[0]?.address){
      router.push("/pages/login")
    }
    if (!wallet?.provider) {
      setProvider(null)
    } else {
      console.log({ wallet }, 'else case')
      const webProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      setProvider(webProvider)
      setAccount(wallet?.accounts[0]?.address)
      // handleSafe.current()
    }
  }, [wallet?.accounts[0]?.address])

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
  }, [])

  const handleDisconnect = async () => {
    setAccount(null);
    await disconnect(wallet);
    setSelectedSafe(null)
    router.push("/pages/login");
  }

  // ** imported in _app
  return (
    <WalletContext.Provider
      value={{
        account,
        selectedSafe,
        setSelectedSafe,
        wallet,
        connect,
        handleDisconnect,
        connecting
        // disconnect,
        // setDisconnect
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext
