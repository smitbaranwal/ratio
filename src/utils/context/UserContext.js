// ** React Imports
import { createContext, useContext, useState } from 'react'



const walletData = {
  user: {name: 'smit'}
}

// ** Create Context
export const UserContext = createContext({
  saveWallet: () => null,
  data: walletData
})

export const UserContextProvider = ({ children }) => {
  // ** State
  const [wallet, setWallet] = useState({ ...walletData })

  const saveWallet = updatedWallet => {
    debugger
    setWallet(updatedWallet)
  }

  return <UserContext.Provider value={{ wallet, saveWallet }}>{children}</UserContext.Provider>
}

export const UserContextConsumer = UserContext.Consumer

export const useUserContext = () => useContext(UserContext)
