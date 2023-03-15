const { createContext, useEffect, useState } = require('react')

// ** Create Context
const WalletContext = createContext({})

// ** Create Context Provider
export const WalletContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  // const [disconnect, setDisconnect] = useState(null)
  const [selectedSafe, setSelectedSafe] = useState(null)

  // useEffect(() => {
  //   console.log({ account }, 'from Context')
  // }, [account])

// ** imported in _app
  return (
    <WalletContext.Provider
      value={{
        account,
        setAccount,
        selectedSafe,
        setSelectedSafe
        // disconnect,
        // setDisconnect
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext
