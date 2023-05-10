// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { forwardRef, useEffect, useState } from 'react'
import getTransactions from 'src/@core/utils/queries/getTransactions'
import moment from 'moment'
import { Account, Launch, ArrowDownThin, ArrowUpThin } from 'mdi-material-ui'
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'
import { CardContent, Grid, Link, TextField, Tooltip, Typography } from '@mui/material'
import LongText from 'src/layouts/components/subComponent/longContent'
// import { DatePicker } from '@mui/lab'

import DatePicker from 'react-datepicker'

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

const StickyTableCell = styled(TableCell)(({ theme }) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2
  },
  body: {
    backgroundColor: '#ddd',
    minWidth: '50px',
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1
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

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Filter by Transaction Date' autoComplete='off' />
})

const TableCustomized = () => {
  const [transactions, setTransactions] = useState([])
  const [transactionsBU, setTransactionsBU] = useState([])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [date, setDate] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    setOpen(true)
    getTransactions(setTransactions, setOpen)
  }, [])

  const userAccountIcon = <Account />

  // const handleClose = () => {

  // }

  function isFloat(x) {
    return !!(x % 1)
  }

  function setDateFilter(date) {
    setDate(date)
    if (!transactionsBU.length) {
       setTransactionsBU(transactions)
    }
    console.log('date', date)

    var filteredTransactions = transactionsBU.filter(function (item) {
      return moment(item.Executedat, 'DD-MM-YYYY').format('L') === moment(date).format('L')
    }
    )
    console.log('filteredTransactions', filteredTransactions)
    setTransactions(filteredTransactions)
  }

  return (
    <>
      <BackdropLoader open={open} />
      <TableContainer component={Paper}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => setDateFilter(date)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Table sx={{ minWidth: 900 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date (UTC)</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell align='center'>Hash</StyledTableCell>
              <StyledTableCell align='center'>From</StyledTableCell>
              <StyledTableCell align='center'>To</StyledTableCell>
              <StyledTableCell align='center'>Amount</StyledTableCell>
              {/* <StyledTableCell align='center'>Fee</StyledTableCell>
                <StyledTableCell align='right'>Gain/Loss</StyledTableCell>
                <StyledTableCell align='right'>Status</StyledTableCell> */}

              <StyledTableCell sx={{ position: 'sticky', right: '0', zIndex: '100' }} align='center'>
                Description
              </StyledTableCell>
              <StyledTableCell sx={{ position: 'sticky', right: '0', zIndex: '100' }} align='center'>
                Tag
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log('transactions', transactions)}

            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>
              row.TokenAmount != '--' ? (
                <StyledTableRow key={index}>
                  <StyledTableCell scope='row'>
                    <div style={{ display: 'inline-block', width: '100px', content: '' }}>
                      {moment(row.Executedat, 'DD-MM-YYYY').format('L')}
                    </div>

                    {/* {moment(row.Executedat, 'DD-MM-YYYY hh:mm:ss T').format('DD/MM/YYYY hh:mm a')} */}
                  </StyledTableCell>

                  <StyledTableCell scope='row'>
                    <div style={{ display: 'inline-block', width: '150px', content: '' }}>
                      {row.Type === 'Outgoing' ? (
                        <ArrowUpThin style={{ color: '#f44336' }} />
                      ) : row.Type === 'Incoming' ? (
                        <ArrowDownThin style={{ color: '#4caf50' }} />
                      ) : (
                        ''
                      )}
                      <span style={{ verticalAlign: 'super' }}> {row.Category} </span>
                    </div>
                    <br />
                  </StyledTableCell>

                  <StyledTableCell scope='row'>
                    <div style={{ display: 'inline-block', width: '120px', content: '', textAlign: 'center' }}>
                      <span variant='button' color='white' lineheight='1'>
                        <Tooltip title={row.TransactionHash}>
                          <>
                            <Link href={`https://etherscan.io/tx/${row.TransactionHash}`} target='_blank'>
                              <span style={{ fontSize: '0.8rem' }}>
                                <Launch sx={{ color: '#607de6' }} />
                              </span>
                            </Link>
                            <span style={{ verticalAlign: 'super' }}>
                              {row.TransactionHash.length > 3
                                ? row.TransactionHash.substring(0, 4) + '...' + row.TransactionHash.substring(38, 42)
                                : '--'}
                            </span>
                          </>
                        </Tooltip>
                      </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell size='small' align='center'>
                    <div style={{ width: '120px' }}>
                      {row.FromAddress.length > 3 ? userAccountIcon : ''}
                      <span style={{ verticalAlign: 'super' }}>
                        {row.FromAddress.length > 3
                          ? row.FromAddress.substring(0, 4) + '...' + row.FromAddress.substring(38, 42)
                          : '--'}
                      </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <div style={{ width: '120px' }}>
                      {row.FromAddress.length > 3 ? userAccountIcon : ''}
                      <span style={{ verticalAlign: 'super' }}>
                        {row.ToAddress.length > 3
                          ? row.ToAddress.substring(0, 4) + '...' + row.ToAddress.substring(38, 42)
                          : '--'}
                      </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {/* <div>{row.TokenAmount !== '--' ? '$' + row.TokenAmount : '--'}</div> */}
                    <div style={{ width: '200px' }}>
                      <span style={{ verticalAlign: 'super' }}>
                        {row.TokenAmount == '--' ? (
                          ''
                        ) : isFloat(row.TokenAmount) == true ? (
                          row.USDAmount != '--' ? (
                            <Typography>
                              {parseFloat(row.TokenAmount).toFixed(3)} BANK (${row.USDAmount})
                            </Typography>
                          ) : (
                            <Typography>
                              {parseFloat(row.TokenAmount).toFixed(3)} BANK (${row.USDAmount})
                            </Typography>
                          )
                        ) : (
                          <Typography>
                            {row.TokenAmount} BANK (${row.USDAmount})
                          </Typography>
                        )}
                      </span>
                    </div>
                  </StyledTableCell>
                  {/* <StyledTableCell align='right'>
                    <div style={{ width: '150px' }}>{row.Transactionfees}</div>
                    </StyledTableCell> */}
                  {/* <StyledTableCell align='right'>
                  <div>{row.USDAmount !== '--' ? '$' + row.USDAmount : '--'}</div>
                  </StyledTableCell> */}
                  {/* <StyledTableCell align='right'>
                  <div style={{ color: row.TransactionStatus === 'Success' ? 'green' : 'red' }}>{row.TransactionStatus}</div>
                  </StyledTableCell> */}

                  <StyledTableCell
                    align='center'
                    sx={{ position: 'sticky', right: '0', zIndex: '100', backgroundColor: '#fff' }}
                  >
                    <div style={{ width: '180px' }}>
                      <LongText content={row.Description} limit={10} />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    sx={{ position: 'sticky', right: '0', zIndex: '100', backgroundColor: '#fff' }}
                  >
                    <div style={{ display: 'inline-block', width: '150px', content: '' }}>
                      {row.Tag && row.Tag !== '--' ? <span style={{ verticalAlign: 'super' }}>{row.Tag}</span> : ''}
                    </div>
                    {/* <div style={{ display: 'inline-block', width: '150px', content: '' }}>
                      {row.Type === 'Outgoing' ? (
                        <ArrowUpThin style={{ color: '#f44336' }} />
                      ) : row.Type === 'Incoming' ? (
                        <ArrowDownThin style={{ color: '#4caf50' }} />
                      ) : (
                        ''
                      )}
                      <span style={{ verticalAlign: 'super' }}> {row.Category} </span>
                    </div> */}
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                ''
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 30, 100]}
        component='div'
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableCustomized
