// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import { CardHeader, Grid } from '@mui/material'
import Card from '@mui/material/Card'
// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
// import { CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles'

import getTransactions from 'src/@core/utils/queries/getTransactions'
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'
import { Account, ArrowDownBoldCircleOutline, ArrowUpBoldCircleOutline } from 'mdi-material-ui'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import moment from 'moment'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: '#b892fe'
    // innerWidth: '50px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))


const tagStyle = {
  padding: '6px 10px',
  backgroundColor: 'bisque',
  borderRadius: '24px',
  boxShadow: '2px 2px #d3a166'
}



const createData = (categoryName, totalFlow) => {
  return {
    categoryName,
    totalFlow,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  }
}

const Row = props => {
  // ** Props
  const { row } = props

  const creatingDaoList = false;

  // ** State
  const [collapse, setCollapse] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [daos, setDaos] = useState([])
  const [open, setOpen] = useState(false)

  const userAccountIcon = <Account />

  useEffect(() => {
    setOpen(true)
    getTransactions(setTransactions,setOpen)
  }, [])

  useEffect(() => {
    if (!creatingDaoList) {
      creatingDaoList = true
      daoList.forEach(element => {
        element.rows.forEach(it => {
          it.history = transactions
        })
      })
    console.log("transaction from cashflow updated", {transactions})
    }
    setOpen(false)
  }, [transactions])

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setCollapse(!collapse)}>
            {collapse ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.categoryName}
        </TableCell>
        <TableCell align='right'>{row.totalFlow}</TableCell>
        {/* <TableCell align='right'>{row.fat}</TableCell>
        <TableCell align='right'>{row.carbs}</TableCell>
        <TableCell align='right'>{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={collapse} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date (UTC)</StyledTableCell>
                <StyledTableCell align='center'>From</StyledTableCell>
                <StyledTableCell align='center'>To</StyledTableCell>
                <StyledTableCell align='center'>Amount</StyledTableCell>
                <StyledTableCell align='center'>Fee</StyledTableCell>
                <StyledTableCell align='right'>Gain/Loss</StyledTableCell>
                <StyledTableCell align='right'>Status</StyledTableCell>
                {/* <StyledTableCell align='right'>Tag</StyledTableCell> */}
                {/* <StyledTableCell align='right'>Token</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {row.history.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope='row'>
                    <div style={{ display: 'inline-block', width: '150px', content: '' }}>
                      {/* {item.Type === 'Outgoing' ? (
                        <ArrowUpBoldCircleOutline style={{ color: '#f44336' }} />
                      ) : item.Type === 'Incoming' ? (
                        <ArrowDownBoldCircleOutline style={{ color: '#4caf50' }} />
                      ) : (
                        ''
                      )} */}
                      <span style={{ verticalAlign: 'super' }}> {item.Category} </span>
                    </div>
                    <br />
                    {moment(item.Executedat, 'DD-MM-YYYY hh:mm:ss T').format('DD/MM/YYYY hh:mm a')}
                  </StyledTableCell>
                  <StyledTableCell size='small' align='right'>
                    <div style={{ width: '180px' }}>
                      {/* {item.FromAddress.length > 3 ? userAccountIcon : ''} */}
                      <span style={{ verticalAlign: 'super' }}>
                        {item.FromAddress?.length > 3
                          ? item.FromAddress.substring(0, 8) + '...' + item.FromAddress.substring(36, 42)
                          : '--'}
                      </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <div style={{ width: '180px' }}>
                      {item.FromAddress?.length > 3 ? userAccountIcon : ''}
                      <span style={{ verticalAlign: 'super' }}>
                        {item.ToAddress?.length > 3
                          ? item?.ToAddress.substring(0, 8) + '...' + item.ToAddress.substring(36, 42)
                          : '--'}
                      </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <div>{item.TokenAmount !== '--' ? '$' + item.TokenAmount : '--'}</div>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <div style={{ width: '150px' }}>{item.Transactionfees}</div></StyledTableCell>
                  <StyledTableCell align='right'>
                  <div>{item.USDAmount !== '--' ? '$' + item.USDAmount : '--'}</div></StyledTableCell>
                  <StyledTableCell align='right'>
                  <div style={{ color: item.TransactionStatus === 'Success' ? 'green' : 'red' }}>{item.TransactionStatus}</div>
                  </StyledTableCell>
                  {/* <StyledTableCell align='right'>
                    {
                      item.Tag && item.Tag !== '--' ? <span style={tagStyle}>{item.Tag}</span> : ''
                    }
                  </StyledTableCell>
                  <StyledTableCell align='right'>{item.TokenSymbol}</StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
              {/* <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const daoList = [
  {
    name: "Cash Flow from Financing Activity",
    rows: [
      createData('Token Release', '$ 1,100,125')
    ]
  },
  {
    name: "Cash Flow From Operation",
    rows: [
      createData('Airdrops', '$ 318'),
      createData('Commission', '$ 14,519'),
      createData('Donation', '$ 86'),
      createData('Grant', '-$ 600,172'),
      createData('Revenue', '$ 51,847'),
      createData('Bounty', '$ 426'),
      createData('Compensation', '$ 637,435'),
      createData('Expenses', '$ 1,704'),
      createData('Subscription Fees', '$ 75')
    ]
  },
  {
    name: "Cash Flow From Investment",
    rows: [
      createData('Capital Return', '$ 5,198 '),
      createData('Investment', '$ 118,868'),
      createData('Token Swap', '$ 15,820')
    ]
  }
]

// const rows = [
//   createData('Token Release', '$ 1,100,125'),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
// ]

const TableCollapsible = () => {
  return (
    <Fragment>
      {/* <BackdropLoader open={open} /> */}
      {daoList.map(doa => (
      <>
      <Grid  key={doa.name} item xs={12} style={{marginTop: '10px'}}>
        <Card>
      <CardHeader title={doa.name} titleTypographyProps={{ variant: 'h6' }} />
      <TableContainer  component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align='left'>Departments</TableCell>
            <TableCell align='right'>Total Flow</TableCell>
            {/* <TableCell align='right'>Fat (g)</TableCell>
            <TableCell align='right'>Carbs (g)</TableCell>
            <TableCell align='right'>Protein (g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {doa.rows.map(row => (
            <Row key={row.categoryName} row={row} />
          ))}
           <TableRow>
            <TableCell rowSpan={1} />
            <TableCell colSpan={1}><b>Subtotal</b></TableCell>
            <TableCell align='right'><b>$8873.00</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
      </Grid>
      </>
    ))}
    </Fragment>
  )
}

export default TableCollapsible
