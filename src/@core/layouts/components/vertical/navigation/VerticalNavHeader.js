// ** Next Import */
import Link from 'next/link'

// ** MUI Imports */
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

//** react import */
import { useContext } from 'react'

//** wallet context import */
import WalletContext from 'src/@core/context/walletContext'

// ** Styled Components */
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 175,
  height: 48,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  //** wallet context
  const {account, selectedSafe} = useContext(WalletContext);
  console.log({account, selectedSafe},'imported from context in header')

  // const walletData = useContext(UserContext)
  // console.log("walletData from header", walletData)

  // ** Hooks
  const theme = useTheme()
  
  return (
    <>
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
          <ImgStyled src={'/images/fin_grow.jpg'} alt='Profile Pic' />
            <HeaderTitle variant='h6' sx={{ ml: 3 }}>
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
    </>
  )
}

export default VerticalNavHeader
