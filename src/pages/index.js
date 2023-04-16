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
  
  const {connect,setSelectedSafe,account,connecting} = useContext(WalletContext);

  console.log("account", account)
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
        <SafeDemo handleSafe={handleSafe} />

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
