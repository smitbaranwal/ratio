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
import { useEffect, useState } from 'react'
import getTransactions from 'src/@core/utils/queries/getTransactions'
import moment from 'moment'
import { Account, Launch, ArrowDownThin, ArrowUpThin} from 'mdi-material-ui'
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'
import { Link, Tooltip, Typography } from '@mui/material'

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

const TableCustomized = () => {
  const [transactions, setTransactions] = useState([])
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    setOpen(true)
    getTransactions(setTransactions,setOpen)
  }, [])

  const userAccountIcon = <Account />

  // const handleClose = () => {
    
  // }

  function isFloat(x) { return !!(x % 1); }


  return (
    <>
      <BackdropLoader open={open} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date (UTC)</StyledTableCell>
                <StyledTableCell align='center'>Hash</StyledTableCell>
                <StyledTableCell align='center'>From</StyledTableCell>
                <StyledTableCell align='center'>To</StyledTableCell>
                <StyledTableCell align='center'>Amount</StyledTableCell>
                {/* <StyledTableCell align='center'>Fee</StyledTableCell>
                <StyledTableCell align='right'>Gain/Loss</StyledTableCell>
                <StyledTableCell align='right'>Status</StyledTableCell> */}
                <StyledTableCell align='center'>Tag</StyledTableCell>
                <StyledTableCell align='center'>Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                
                <StyledTableRow key={index}>
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
                    {/* {moment(row.Executedat, 'DD-MM-YYYY hh:mm:ss T').format('DD/MM/YYYY hh:mm a')} */}
                    {moment(row.Executedat, 'DD-MM-YYYY').format('ll')}
                  </StyledTableCell>
                  <StyledTableCell scope='row'>
                    <div style={{ display: 'inline-block', width: '150px', content: '', textAlign: "center" }}>
                    <span
                                    variant="button"
                                    color="white"
                                    lineheight="1"
                                  >
                                    <Tooltip title={row.TransactionHash}>
                                     <Link href={`https://etherscan.io/tx/${row.TransactionHash}`} target='_blank'>
                                    {row.TransactionHash.length > 5
                                        ? `${row.TransactionHash.substring(
                                            0,
                                            5
                                          )}...`
                                        : ( row.TransactionHash)}
                                      </Link>
                                      </Tooltip>
                                  </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell size='small' align='right'>
                    <div style={{ width: '180px' }}>
                      {row.FromAddress.length > 3 ? userAccountIcon : ''}
                      <span style={{ verticalAlign: 'super' }}>
                        {row.FromAddress.length > 3
                          ? row.FromAddress.substring(0, 8) + '...' + row.FromAddress.substring(36, 42)
                          : '--'}
                      </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <div style={{ width: '180px' }}>
                      {row.FromAddress.length > 3 ? userAccountIcon : ''}
                      <span style={{ verticalAlign: 'super' }}>
                        {row.ToAddress.length > 3
                          ? row.ToAddress.substring(0, 8) + '...' + row.ToAddress.substring(36, 42)
                          : '--'}
                      </span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {console.log("row", row)}
                    {/* <div>{row.TokenAmount !== '--' ? '$' + row.TokenAmount : '--'}</div> */}
                    <div style={{ width: '180px' }}>
                      <span style={{ verticalAlign: 'super' }}>
                      {row.TokenAmount == "--" ?(
                        ''
                      ) : isFloat(row.TokenAmount) == true ? (
                        row.USDAmount != "--" ? 
                       (
                        <Typography>

                        {parseFloat(row.TokenAmount).toFixed(3)} BANK (${row.USDAmount})
                        </Typography>) : (
                          <Typography>
                           {parseFloat(row.TokenAmount).toFixed(3)} BANK (${row.USDAmount})
                          </Typography>
                        )
                      ):
                      <Typography>{row.TokenAmount} BANK (${row.USDAmount})</Typography> 
                    
                      }
                                           
                      
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
                  <StyledTableCell align='center'>
                    {
                      row.Tag && row.Tag !== '--' ? <span style={tagStyle}>{row.Tag}</span> : ''
                    }
                  </StyledTableCell>

                  <StyledTableCell align='center'>{row.Description}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
