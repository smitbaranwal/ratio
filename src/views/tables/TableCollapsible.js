// ** React Imports
import { useState, Fragment, useEffect, useContext } from 'react'

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
import TablePagination from '@mui/material/TablePagination'
import { CardHeader, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import { Link, Tooltip } from '@mui/material'
// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
// import { CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles'

import getTransactions from 'src/@core/utils/queries/getTransactions'
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'
import {
  Account,
  ArrowDownBoldCircleOutline,
  ArrowUpBoldCircleOutline,
  ArrowDownThin,
  ArrowUpThin,
  Launch
} from 'mdi-material-ui'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import moment from 'moment'
import XLSX from 'sheetjs-style'
import Cashflow from 'src/pages/reports/cashflow'
import CashflowSpreadsheet from '../reports/Cashflow'
import getFiatCurrency from 'src/@core/utils/queries/getFiatValue'
import LongText from 'src/layouts/components/subComponent/longContent'
import WalletContext from 'src/@core/context/walletContext'

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

const Row = props => {
  // ** Props
  const { row, open } = props

  // ** State
  const [collapse, setCollapse] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)

  const { safeContributors } = useContext(WalletContext)

  const outTransaction = <ArrowUpThin style={{ color: '#f44336' }} />

  const inTransaction = <ArrowDownThin style={{ color: '#4caf50' }} />

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const userAccountIcon = <Account />

  useEffect(() => {
    setCollapse(false)
  }, [open])

  function isFloat(x) {
    return !!(x % 1)
  }

  const getNamedAddress = address => {
    const ind = safeContributors.findIndex(c => c.address == address)
    // if (address == '0xcF8422021b408B32983B525778CE45420715f094') {
    //   return 'Nikhil'
    // }
    if (ind > -1) {
      return safeContributors[ind].name
    }

    return address.substring(0, 4) + '...' + address.substring(38, 42)
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setCollapse(!collapse)}>
            {collapse ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>
          {row.totalTokenAmt > 0 ? (
            <span style={{ color: 'green' }}>{row.TokenSummary}</span>
          ) : (
            <span style={{ color: 'red' }}>{row.TokenSummary}</span>
          )}{' '}
          {/* {row.totalTokenAmt > 0 ? (
            <span style={{ color: 'green' }}>{row.totalTokenAmt}</span>
          ) : (
            <span style={{ color: 'red' }}>{Math.abs(row.totalTokenAmt)}</span>
          )}{' '} */}
          | &nbsp;
          {row.totalUSDAmtPre < 0 ? (
            <span style={{ color: 'red' }}>{'$' + Math.abs(row.totalUSDAmtPre.toFixed(2))}</span>
          ) : (
            <span style={{ color: 'green' }}>
              {row.totalUSDAmtPre != '--' ? '$' + row.totalUSDAmtPre.toFixed(3) : '$0.00'}
            </span>
          )}
          {/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
          {/* <div style={{ color: row.totalTokenAmt < 0 ? 'red' : 'green' }}>{row.totalTokenAmt}</div> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={collapse} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              {!open ? (
                <>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 900 }} aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align='left'>Date (UTC)</StyledTableCell>
                          <StyledTableCell align='left'>Category</StyledTableCell>
                          <StyledTableCell align='center'>Hash</StyledTableCell>
                          <StyledTableCell align='left'>
                            <ArrowDownThin style={{ color: '#4caf50' }} />
                            From | <ArrowUpThin style={{ color: '#f44336' }} />
                            T0
                          </StyledTableCell>
                          {/* <StyledTableCell align='center'>To</StyledTableCell> */}
                          <StyledTableCell align='center'>Amount</StyledTableCell>
                          {/* <StyledTableCell align='center'>Fiat</StyledTableCell> */}
                          {/* <StyledTableCell align='right'>Gain/Loss</StyledTableCell> */}

                          <StyledTableCell align='center' sx={{ right: '0', width: '300' }}>
                            Description
                          </StyledTableCell>

                          {/* <StyledTableCell sx={{position: "sticky", left: "0", zIndex: "100"}} align='center'>Tag</StyledTableCell> */}
                          <StyledTableCell align='center' sx={{ position: 'sticky', right: '0', zIndex: '100' }}>
                            Tag
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.transactions
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((item, index) => (
                            // {.map((item, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell scope='row'>
                                <div style={{ display: 'inline-block', width: '100px', content: '' }}>
                                  {moment(item.Executedat, 'DD-MM-YYYY hh:mm:ss T').format('L')}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell scope='row'>
                                <div
                                  style={{ display: 'inline-block', width: '100px', content: '', textAlign: 'left' }}
                                >
                                  <span style={{ verticalAlign: 'super' }}> {item.Category} </span>
                                </div>
                              </StyledTableCell>

                              <StyledTableCell scope='row'>
                                <div
                                  style={{ display: 'inline-block', width: '160px', content: '', textAlign: 'center' }}
                                >
                                  <span variant='button' color='white' lineheight='1'>
                                    <Tooltip title={item.TransactionHash}>
                                      <>
                                        <Link href={`https://etherscan.io/tx/${item.TransactionHash}`} target='_blank'>
                                          <span style={{ fontSize: '0.8rem' }}>
                                            <Launch />
                                          </span>
                                        </Link>
                                        <span style={{ verticalAlign: 'super' }}>
                                          {item.TransactionHash.length > 3
                                            ? item.TransactionHash.substring(0, 4) +
                                              '...' +
                                              item.TransactionHash.substring(38, 42)
                                            : '--'}
                                        </span>
                                      </>
                                    </Tooltip>
                                  </span>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell size='small' align='left'>
                                <div style={{ width: '120px' }}>
                                  {item.Type === 'Outgoing'
                                    ? outTransaction
                                    : item.Type === 'Incoming'
                                    ? inTransaction
                                    : ''}
                                  {item.Type === 'Outgoing'
                                    ? getNamedAddress(item.ToAddress)
                                    : item.Type === 'Incoming'
                                    ? getNamedAddress(item.FromAddress)
                                    : ''}
                                </div>
                              </StyledTableCell>
                              {/* <StyledTableCell size='small' align='center'>
                                <div style={{ width: '160' }}>
                                  {item.FromAddress.length > 3 ? userAccountIcon : ''}
                                  <span style={{ verticalAlign: 'super' }}>
                                    {item.FromAddress?.length > 3
                                      ? item.FromAddress.substring(0, 4) + '...' + item.FromAddress.substring(38, 42)
                                      : '--'}
                                  </span>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                <div style={{ width: '160' }}>
                                  {item.FromAddress?.length > 3 ? userAccountIcon : ''}
                                  <span style={{ verticalAlign: 'super' }}>
                                    {item.ToAddress?.length > 3
                                      ? item?.ToAddress.substring(0, 4) + '...' + item.ToAddress.substring(38, 42)
                                      : '--'}
                                  </span>
                                </div>
                              </StyledTableCell> */}
                              <StyledTableCell align='center'>
                                {/* <span title={'Per token value is calculated with latest ' + item.FiatPrice + ' USD'}>({item.FiatValue !== '--' ? '$ ' + item.FiatValue : '--'})</span> <br/> */}
                                {/* ({item.TokenAmount !== '--' ? item.TokenAmount + ' ' + item.TokenSymbol : '--'}) */}
                                <div style={{ width: '160' }}>
                                  <span style={{ verticalAlign: 'super', textAlign: 'center' }}>
                                    {item.TokenAmount === '--' ? (
                                      ''
                                    ) : isFloat(item.TokenAmount) == true ? (
                                      item.USDAmount != '--' ? (
                                        <Typography>
                                          {parseFloat(item.TokenAmount).toFixed(3)} {item.TokenSymbol} ($
                                          {item.USDAmount})
                                        </Typography>
                                      ) : (
                                        <Typography>
                                          {parseFloat(item.TokenAmount).toFixed(3)} {item.TokenSymbol} ($
                                          {item.USDAmount})
                                        </Typography>
                                      )
                                    ) : (
                                      <Typography>
                                        {item.TokenAmount} {item.TokenSymbol} (${item.USDAmount})
                                      </Typography>
                                    )}
                                  </span>
                                </div>
                              </StyledTableCell>
                              {/* <StyledTableCell align='right'>
                            <div style={{ width: '100px' }}>${item.FiatValue}</div>
                          </StyledTableCell> */}
                              {/* <StyledTableCell align='right'>
                            <div>{item.USDAmount !== '--' ? '$' + item.USDAmount : '--'}</div>
                          </StyledTableCell> */}

                              <StyledTableCell align='center' sx={{ right: '0', width: '300' }}>
                                <div style={{ width: '180px' }}>
                                  <LongText content={item.Description} limit={200} />
                                </div>
                              </StyledTableCell>
                              <StyledTableCell
                                align='center'
                                sx={{ position: 'sticky', right: '0', zIndex: '100', backgroundColor: '#fff' }}
                              >
                                <div style={{ width: '80px' }}>
                                  {item.Tag && item.Tag !== '--' ? <span>{item.Tag}</span> : ''}
                                  {/* <LongText content={item.Description} limit={10} /> */}
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[15, 30, 100]}
                    component='div'
                    count={row.transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              ) : (
                ''
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const operationTransactionKey = 'Cash Flow From Operation'
const investmentTransactionKey = 'Cash Flow From Investment'
const financeTransactionKey = 'Cash Flow from Financial Activities'

const TableCollapsible = props => {
  const { setSpreadsheetData, setTransactionsData } = props
  const daoObject = {}

  const [transactionTypeList, setTransactionTypeList] = useState([])
  // const [spreadsheetData, setSpreadsheetData] = useState([])
  const [open, setOpen] = useState(false)

  const getFiatValues = function (data) {
    // data.
    getFiatCurrency(updateTrx, data)
    // updateTrx()
  }

  const updateTrx = function (data) {
    data.forEach(trx => {
      let insertInTransactionType = ''
      if (operationCategory.findIndex(c => c == trx.Category) > -1) {
        // is a operation type of transation
        insertInTransactionType = operationTransactionKey
      } else if (investmentCategory.findIndex(c => c == trx.Category) > -1) {
        // is a investment type of transation
        insertInTransactionType = investmentTransactionKey
      } else if (financialCategory.findIndex(c => c == trx.Category) > -1) {
        // is a financial type of transation
        insertInTransactionType = financeTransactionKey
      }
      if (insertInTransactionType !== '') {
        if (!daoObject[insertInTransactionType] || !daoObject[insertInTransactionType].categories) {
          daoObject[insertInTransactionType] = { trxTypeTotalTokenAmt: 0, trxTypeTotalUSDAmtPre: 0, categories: [] }
        }
        let availableCatIndex = daoObject[insertInTransactionType].categories.findIndex(c => c.name == trx.Category)
        if (availableCatIndex < 0) {
          // adding category for the first time
          let categoryData = {
            name: trx.Category,
            transactions: [trx]
          }

          if (trx.Type == 'Outgoing') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt = 0 - trx.TokenAmount
            daoObject[insertInTransactionType].trxTypeTotalUSDAmtPre = 0 - trx.USDAmount
            categoryData.totalTokenAmt = 0 - trx.TokenAmount
            categoryData.totalUSDAmtPre = 0 - trx.USDAmount
          } else if (trx.Type == 'Incoming') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt = trx.TokenAmount
            daoObject[insertInTransactionType].trxTypeTotalUSDAmtPre = trx.USDAmount
            categoryData.totalTokenAmt = trx.TokenAmount
            categoryData.totalUSDAmtPre = trx.USDAmount
          }
          daoObject[insertInTransactionType].categories.push(categoryData)
        } else {
          if (trx.Type == 'Outgoing') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt -= trx.TokenAmount
            daoObject[insertInTransactionType].trxTypeTotalUSDAmtPre -= trx.USDAmount
            daoObject[insertInTransactionType].categories[availableCatIndex].totalTokenAmt -= trx.TokenAmount
            daoObject[insertInTransactionType].categories[availableCatIndex].totalUSDAmtPre -= trx.USDAmount
          } else if (trx.Type == 'Incoming') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt += trx.TokenAmount
            daoObject[insertInTransactionType].trxTypeTotalUSDAmtPre -= trx.USDAmount
            daoObject[insertInTransactionType].categories[availableCatIndex].totalTokenAmt += trx.TokenAmount
            daoObject[insertInTransactionType].categories[availableCatIndex].totalUSDAmtPre += trx.USDAmount
          }
          daoObject[insertInTransactionType].categories[availableCatIndex].transactions.push(trx)
        }
      }
    })

    console.log('data from table collapsible', data)
    console.log('new list from table collapsible', daoObject)
    let daoList = []
    let excelData = []
    Object.keys(daoObject).forEach(key => {
      daoList.push({
        name: key,
        trxTypeTotalTokenAmt: daoObject[key].trxTypeTotalTokenAmt,
        trxTypeTotalUSDAmtPre: daoObject[key].trxTypeTotalUSDAmtPre,
        categories: daoObject[key].categories
      })
      console.log('categories data', daoObject[key].categories)
      excelData.push(...daoObject[key].categories)
    })
    console.log('new daoList from table collapsible', daoList)
    // console.log('new spreadsheetData from table collapsible', spreadsheetData)

    //calculate category token summary
    daoList.forEach(dao => {
      const totalTokenSummary = {}
      let totalText = ''
      dao.categories.forEach(category => {
        const tokenSummary = {}
        let text = ''
        category.transactions.forEach(trx => {
          if (trx.TokenSymbol) {
            if (tokenSummary[trx.TokenSymbol]) {
              tokenSummary[trx.TokenSymbol] += +(trx.TokenAmount.toFixed(2))
            } else {
              tokenSummary[trx.TokenSymbol] = +(trx.TokenAmount.toFixed(2))
            }
            if (totalTokenSummary[trx.TokenSymbol]) {
              totalTokenSummary[trx.TokenSymbol] += +(trx.TokenAmount.toFixed(2))
            } else {
              totalTokenSummary[trx.TokenSymbol] = +(trx.TokenAmount.toFixed(2))
            }
          }
        })
        Object.keys(tokenSummary).forEach(key => {
          text += ' ' + tokenSummary[key] + ' ' + key + ','
        })
        text = text.slice(0, text.length - 1)
        category.TokenSummary = text
        console.log('token summary for ' + category.name + ' ' + text)
      })
      Object.keys(totalTokenSummary).forEach(key => {
        totalText += ' ' + totalTokenSummary[key] + ' ' + key + ','
      })
      totalText = totalText.slice(0, totalText.length - 1)
      dao.TotalTokenSummary = totalText
    })

    setTransactionTypeList(daoList)
    setTransactionsData(daoList)
    setSpreadsheetData(excelData)
  }

  const financialCategory = ['Token Release', 'Compensation']

  const operationCategory = [
    'Salary',
    'Bounty',
    // 'Other',
    // 'Others',
    'Expenses',
    'Coordinape',
    'Services Rendered',
    'Product Purchase',
    'Assets Purchase',
    'Airdrop',
    'Revenue',
    'Retroactive Compensation',
    'Revenue / Services Exchanged',
    'Reimbursement',
    'Service Purchase',
    'Commission',
    // 'Miscellaneous',
    'Donation',
    'Product Sale',
    'Service Sale',
    'Asset Purchase'
  ]

  const investmentCategory = [
    // 'Product Purchase',
    // 'Donation',
    'Token Swaps',
    'Grants',
    'Grant',
    'Investment Income',
    'Capital Return',
    'Asset Sale'
  ]

  useEffect(() => {
    setOpen(true)
    getTransactions(getFiatValues, setOpen)
  }, [])

  const convertToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactionTypeList)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'test_gen1' + '.xlsx')
  }

  return (
    <Fragment>
      {/* <button onClick={convertToExcel}>Download Excel</button> */}

      {/* <CashflowSpreadsheet data={spreadsheetData} />  */}

      <BackdropLoader open={open} />

      {transactionTypeList.map(doa => (
        <>
          <Grid key={doa.name} item xs={12} style={{ marginTop: '10px' }}>
            <Card>
              <CardHeader title={doa.name} titleTypographyProps={{ variant: 'h6' }} />
              <TableContainer component={Paper}>
                <Table aria-label='collapsible table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width={'50px'} />
                      <TableCell align='left'>Categories</TableCell>
                      <TableCell align='right'>Total Flow</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doa.categories.map(row => (
                      <Row key={row.name} row={row} open={open} />
                    ))}
                    <TableRow>
                      <TableCell rowSpan={1} />
                      <TableCell colSpan={1}>
                        <b>Subtotal</b>
                      </TableCell>
                      <TableCell align='right'>
                        <b>
                          <div>
                            <span style={{ color: doa.trxTypeTotalTokenAmt > 0 ? 'green' : 'red' }}>
                              {/* {Math.abs(doa.trxTypeTotalTokenAmt)} */}
                              {doa.TotalTokenSummary}
                            </span>{' '}
                            | &nbsp;
                            <span style={{ color: doa.trxTypeTotalUSDAmtPre > 0 ? 'green' : 'red' }}>
                              {!isNaN(doa.trxTypeTotalUSDAmtPre)
                                ? '$' + Math.abs(Number(doa.trxTypeTotalUSDAmtPre).toFixed(2))
                                : doa.trxTypeTotalUSDAmtPre}
                            </span>
                          </div>
                        </b>
                      </TableCell>
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
