// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { ArrowDownBoldCircleOutline, ArrowUpBoldCircleOutline } from 'mdi-material-ui'

const rows = [
  {
    name: 'Bankless Main Treasury',
    marketValue: '1,175,883.12',
    unrealizedReturn: '1,020,114.45',
    transactions: '1290',
    lastRefresh: 'about 12 days ago',
    currencies: '',
  },
  {
    name: 'Newsletter Tean',
    marketValue: '27,078.39',
    unrealizedReturn: '9,123.76',
    transactions: '1209',
    lastRefresh: 'about 9 days ago',
    currencies: '',
  },
  {
    name: 'Grants Commitee',
    marketValue: '74,480.59',
    unrealizedReturn: '7,185.74',
    transactions: '3809',
    lastRefresh: 'about 1 days ago',
    currencies: '',
  },
  {
    name: 'Ultrasound Merch',
    marketValue: '27,078.39',
    unrealizedReturn: '4,883.49',
    transactions: '1578',
    lastRefresh: 'about 4 hrs ago',
    currencies: '',
  },
  {
    name: 'Bankless Card',
    marketValue: '12,856.15',
    unrealizedReturn: '5,883,17',
    transactions: '903',
    lastRefresh: 'about 3 days ago',
    currencies: '',
  },
  {
    name: 'GM Bus',
    marketValue: '10,811.79',
    unrealizedReturn: '8,337.09',
    transactions: '1102',
    lastRefresh: 'about 18 hrs ago',
    currencies: '',
  },
  {
    name: 'Bankless Card',
    marketValue: '41,237.19',
    unrealizedReturn: '12,347.90',
    transactions: '2098',
    lastRefresh: 'about 12 hrs ago',
    currencies: '',
  },
  {
    name: 'Ultrasound Merch',
    marketValue: '74,480.59',
    unrealizedReturn: '12,385.28',
    transactions: '5874',
    lastRefresh: 'about 1 hrs ago',
    currencies: '',
  },
  {
    name: 'Grants Commitee',
    marketValue: '47,332.26',
    unrealizedReturn: '3,981.09',
    transactions: '3409',
    lastRefresh: 'about 2 days ago',
    currencies: '',
  },
  {
    name: 'Dev Guild',
    marketValue: '17,288.38',
    unrealizedReturn: '2,847.99',
    transactions: '983',
    lastRefresh: 'about 1 days ago',
    currencies: '',
  },
  {
    name: 'Ultrasound Merch',
    marketValue: '27,078.39',
    unrealizedReturn: '10,738.64',
    transactions: '1782',
    lastRefresh: 'about 4 days ago',
    currencies: '',
  },
  {
    name: 'Fight Club Polygon',
    marketValue: '28,396.46',
    unrealizedReturn: '8,993.09',
    transactions: '2655',
    lastRefresh: 'about 6 days ago',
    currencies: '',
  },
  {
    name: 'Bankless Card',
    marketValue: '27,078.39',
    unrealizedReturn: '12,883.27',
    transactions: '1983',
    lastRefresh: 'about 3 days ago',
    currencies: '',
  },
  {
    name: 'Marketing Dept',
    marketValue: '41,237.19',
    unrealizedReturn: '12,992.76',
    transactions: '3877',
    lastRefresh: 'about 6 days ago',
    currencies: '',
  },
  {
    name: 'Grants Commitee',
    marketValue: '41,448.44',
    unrealizedReturn: '12,883.40',
    transactions: '4583',
    lastRefresh: 'about 14 hrs ago',
    currencies: '',
  }
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Market Value</TableCell>
              <TableCell>Unrealized Return</TableCell>
              <TableCell>Transactions</TableCell>
              <TableCell>Last Refresh</TableCell>
              <TableCell>Currencies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={row.index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                    <Typography variant='caption'>0xe5a64fc0d3396d11eb63d728791577e254ac18ca</Typography>
                  </Box>
                </TableCell>
                <TableCell>${row.marketValue}</TableCell>
                <TableCell>${row.unrealizedReturn}
                { Math.floor(Math.random()*2) != 1  ?
                   <ArrowUpBoldCircleOutline style={{ color: '#4caf50' }} />
                    : 
                     <ArrowDownBoldCircleOutline style={{ color: '#f44336' }} /> //red
                }
                </TableCell>
                <TableCell>{row.transactions}</TableCell>
                <TableCell>{row.lastRefresh}</TableCell>
                <TableCell>
                  {/* <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
