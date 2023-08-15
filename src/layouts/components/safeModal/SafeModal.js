import * as React from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { Grid, Icon } from '@mui/material'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import WalletContent from '../subComponent/noWallet'
// import CheckIcon from '@mui/icons-material/Check';
import { getUserID } from 'src/assets/localData'
import getSafesAddress from 'src/@core/utils/queries/getSafes'
import { useContext } from 'react'
import WalletContext from 'src/@core/context/walletContext'
import getSafesOwners from 'src/@core/utils/queries/getSafeOwners'
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'

// Dialog box style

const useStyles = styled(theme => ({
  root: {
    width: `500px`,
    textAlign: `center`,
    height: `330px`
  }
}))

// sleep to load search list
function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

// stepper design

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4'
  }),
  '& .QontoStepIcon-completedIcon': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#784af4',
    color: '#784af4'
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}))

function QontoStepIcon(props) {
  const { active, completed, className } = props

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <div className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
    </QontoStepIconRoot>
  )
}

// const safes = [
//   {label: '0x39cBD3814757Be997192rgiu98'},
//   {label: '0x39cBD3814757Be997192rgiu98'},
//   {label: '0x39cBD3814757Be997192rgiu98'},
//   {label: '0x39cBD3814757Be997192rgiu98'},
//   {label: '0x39cBD3814757Be997192rgiu98'},
//   {label: '0x39cBD3814757Be997192rgiu98'},
//   {label: '0x39cBD3814757Be997192rgiu98'}
// ];

const steps = [1, 2, 3]
function SafeDialog(props) {
  const { onClose, selectedValue, open } = props
  const [activeStep, setActiveStep] = React.useState(0)
  const [error, setError] = React.useState(false)
  const safes = props.safesAddress
  const loadingSafes = props.loading
  console.log('obj', props.safesAddress)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = value => {
    onClose(value)
  }

  // display autocomplete if length is more than 5

  const [list, setList] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = list && options.length === 0

  const classes = useStyles()

  React.useEffect(() => {
    let active = true

    if (!loading && !loadingSafes) {
      return undefined
    }

    (async () => {
      // await sleep(5e3) // For demo purposes.
      if (active) {
        setOptions([...safes])
      }
    })()

    return () => {
      active = false
    }
  }, [loading, loadingSafes])

  React.useEffect(() => {
    if (!list) {
      setOptions([])
    }
  }, [list])

  const noSafe = 'No Safe address associated to this account!'
  const noSafeImage = '/images/no_account.jpg'

  //  img style
  const ImgStyled = styled('img')(({ theme }) => ({
    width: 175,
    height: 48,
    marginRight: theme.spacing(5.25),
    borderRadius: theme.shape.borderRadius
  }))

  return (
    <Dialog onClose={handleClose} open={open} sx={{ maxWidth: '150rem' }} className='no-safe'>
      {!loadingSafes && safes?.length > 0 ? (
        <Grid container spacing={1}>
          <Grid item lg={5} md={5} xs={12} style={{ borderRight: '1px solid #ccc' }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(6, 4, 3)} !important` }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImgStyled src={'/images/fin_grow.svg'} alt='Profile Pic' />
              </Box>
              <Box sx={{ mb: 6, ml: 3 }}>
                <Typography variant='h6' fontWeight='medium' sx={{ marginBottom: 1.5 }}>
                  Select Safe Account
                </Typography>
              </Box>
              <Box sx={{ mb: 15, ml: 3 }}>
                <Typography variant='body'>Please select one safe account</Typography>
              </Box>
              <Box sx={{ position: 'absolute', bottom: '1rem', width: '16rem', left: '5rem' }}>
                <Stepper activeStep={3} sx={{ paddingBottom: 4 }}>
                  {steps.map((label, index) => {
                    const stepProps = {}
                    const labelProps = {}

                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>

                <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                  <Typography variant='body2' fontWeight='regular'>
                    Powered by{' '}
                  </Typography>
                  <Typography variant='body2' fontWeight='bold' color='black' sx={{ marginLeft: '4px' }}>
                    blocknative
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Grid>
          <Grid item lg={7} md={7} xs={12}>
            <Box>
              <DialogTitle sx={{ borderBottom: '1px solid #ccc' }}>Select Safe Account</DialogTitle>
              <Box style={{ height: '25rem', overflowY: 'scroll' }}>
                <List sx={{ pt: 0, width: 'fit-content' }}>
                  {safes.map(safe => (
                    <ListItem
                      disableGutters
                      key={safe.safeAddress}
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: '1rem',
                        padding: '0rem',
                        margin: '1.2rem 0.8rem',

                        '&.Mui-selected': {
                          border: '1px solid #2e8b57'
                        },
                        '&.Mui-focusVisible': {
                          border: '1px solid #2e8b57'
                        },
                        ':hover': {
                          border: '1px solid #2e8b57',
                          backgroundColor: '#effbf4'
                        }
                      }}
                    >
                      <ListItemButton onClick={() => handleListItemClick(safe.safeAddress)} key={safe.safeAddress}>
                        <ListItemAvatar>
                          <Avatar src='/images/safe_icon.png' sx={{ bgcolor: blue[100], color: blue[600] }}></Avatar>
                        </ListItemAvatar>
                        {/* <ListItemText primary={safe.safeAddress} /> */}
                        <div>
                        <ListItemText primary={safe.safeName + (safe.isDelegate ? ' (Delegate)' : ' (Owner)')} />
                          <ListItemText secondary={safe.safeAddress} />

                          {/* <br></br> */}
                        </div>
                        <div></div>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : loadingSafes ?
      (<CardContent sx={{ padding: theme => `${theme.spacing(60, 4, 3)} !important` }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <CircularProgress color='inherit' />
        &nbsp; Loading Safes!
        </Box>
      </CardContent>) :
      (
        <CardContent sx={{ padding: theme => `${theme.spacing(6, 4, 3)} !important` }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImgStyled src={'/images/fin_grow.svg'} alt='Profile Pic' />
          </Box>

          <WalletContent value={noSafe} image={noSafeImage} />
          {/* <Icon><AccountBox/></Icon> */}

          <Box sx={{ position: 'absolute', bottom: '1rem', width: '16rem', left: '36%' }}>
            <Stepper activeStep={3} sx={{ paddingBottom: 4 }}>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                  </Step>
                )
              })}
            </Stepper>

            <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
              <Typography variant='body2' fontWeight='regular'>
                Powered by{' '}
              </Typography>
              <Typography variant='body2' fontWeight='bold' color='black' sx={{ marginLeft: '4px' }}>
                blocknative
              </Typography>
            </Box>
          </Box>
        </CardContent>
      ) }
    </Dialog>
  )
}

SafeDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
}

export default function SafeDemo({ handleSafe, closeSafeDialog, userAccount }, props) {
  const { account, setSafeContributors } = useContext(WalletContext)
  // 0x4f285257849B840ADc1e293F735cb1F31e5cF026
  const userAccountNumber = getUserID()
  const [safesAddress, setSafeAddress] = React.useState([])
  const [gettingSafesAddress, setGettingSafesAddress] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState('')
  // const [loginAccount, setLoginAccount] = React.useState({account})

  React.useEffect(() => {
    handleSafe.current = handleClickOpen
  }, [handleSafe])

  console.log('account 11', { account })

  const handleClickOpen = () => {
    setOpen(true)
    console.log('account', { account })
    // getSafesAddress({account}, setSafeAddress)

    getSafesAddress(userAccountNumber, getAllSafes)
    // const result = await
  }

  const getAllSafes = data => {
    console.log('get all safes', data)
    setSafeAddress(data)
    setGettingSafesAddress(false)
  }

  const getSafeContributorList = data => {
    console.log('form get getSafeContributorList ', data.contributors)
    setSafeContributors(data.contributors)
  }

  const handleClose = async value => {
    localStorage.setItem('safeAccount', value)
    setOpen(false)
    setSelectedValue(value)
    closeSafeDialog(value)

    await getSafesOwners(value, getSafeContributorList)
  }

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography> */}
      <br />
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open safe Dialog
      </Button> */}
      <SafeDialog selectedValue={selectedValue} loading={gettingSafesAddress} open={open} onClose={handleClose} safesAddress={safesAddress} />
    </div>
  )
}
