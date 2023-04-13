import { Fragment, useState } from 'react'
import TableCollapsible from 'src/views/tables/TableCollapsible'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CashflowSpreadsheet from 'src/views/reports/Cashflow'

const Cashflow = () => {
  const imageStyle = {
    width: '100%',
    position: 'absolute',
    top: '-145px'
  }

  // ** State
  const [value, setValue] = useState('1')
  const [spreadsheetData, setSpreadsheetData] = useState([])
  const [transactionsData, setTransactionsData] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Fragment>
      <Card>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='Cashflow Statement'>
            <Tab value='1' label='Grid View' />
            <Tab value='2' label='Report View' />
            {/* <Tab value='3' label='Download' /> */}
          </TabList>
          <CardContent>
            <TabPanel value='1' sx={{ p: 0 }}>
              <TableCollapsible setSpreadsheetData={setSpreadsheetData} setTransactionsData={setTransactionsData} />
            </TabPanel>
            <TabPanel value='2' sx={{ p: 0 }}>
              <CashflowSpreadsheet data={spreadsheetData} categorisedData={transactionsData} />
            </TabPanel>
            <TabPanel value='3' sx={{ p: 0 }}>
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                Cashflow Report
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 4 }}>
                Hold Patience! <br />
                Download may take time since some data from server is fetched in the background.
              </Typography>
              <Button variant='contained'>Download</Button>
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>
    </Fragment>
  )
}

export default Cashflow
