import { useConnectWallet } from '@web3-onboard/react'
import { initWeb3Onboard } from 'src/utils/initWeb3Onboard'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { setUserID } from 'src/assets/localData'

const { createContext, useEffect, useState } = require('react')

// ** Create Context
const WalletContext = createContext({})

// ** Create Context Provider
export const WalletContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [selectedSafe, setSelectedSafe] = useState(null)
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [safeContributors, setSafeContributors] = useState([]) 
  //  use of setWeb3Onboard ?
  const [, setWeb3Onboard] = useState(null)    
  const [provider, setProvider] = useState(null)
  const router = useRouter();
  
  console.log({wallet,account,selectedSafe,connecting, safeContributors},'from walletContext')
  


  useEffect(() => {
    if(!wallet?.accounts[0]?.address){
  
      router.push("/pages/login")
    }
     if (!wallet?.provider) {
     
      setProvider(null)
    } else {
      setAccount(`0x0a08e7C1b23df18413e27aA9DdD2e4376f49caF3`)
      console.log({ wallet }, 'else case')
      const webProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      setProvider(webProvider)

      // this would be replace by dynamic address
      // setAccount(wallet?.accounts[0]?.address)
  

      // handleSafe.current()
       setUserID(`0x0a08e7C1b23df18413e27aA9DdD2e4376f49caF3`)
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
        safeContributors,
        setSafeContributors,
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
