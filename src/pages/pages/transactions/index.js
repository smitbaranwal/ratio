// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ForReview from 'src/views/transactions/ForReview'
import CategorizedTransactions from 'src/views/transactions/CategorizedTransactions'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Transactions = () => {
  // ** State

  const [value, setValue] = useState('review_transactions');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='Transactions List Page'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='review_transactions'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>For Review(1029)</TabName>
              </Box>
            }
          />
          <Tab
            value='categorized_transactions'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Categorized(556)</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='review_transactions'>
          <ForReview />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='categorized_transactions'>
          <CategorizedTransactions />
        </TabPanel>
        
      </TabContext>
    </Card>
  )
}

export default Transactions

