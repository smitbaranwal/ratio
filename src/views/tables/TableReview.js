// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { useEffect, useState } from 'react'
import getTransactions from 'src/@core/utils/queries/getTransactions'
import moment from 'moment'
import { Account, ArrowDownBoldCircleOutline, ArrowUpBoldCircleOutline } from 'mdi-material-ui'
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'

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

  useEffect(() => {
    setOpen(true)
    getTransactions(setTransactions,setOpen)
  }, [])

  const userAccountIcon = <Account />

  // const handleClose = () => {
    
  // }

  return (
    <>
      <BackdropLoader open={open} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date (UTC)</StyledTableCell>
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
              {transactions.map((row, index) => (
                
                <StyledTableRow key={index}>
                  <StyledTableCell scope='row'>
                    <div style={{ display: 'inline-block', width: '150px', content: '' }}>
                      {row.Type === 'Outgoing' ? (
                        <ArrowUpBoldCircleOutline style={{ color: '#f44336' }} />
                      ) : row.Type === 'Incoming' ? (
                        <ArrowDownBoldCircleOutline style={{ color: '#4caf50' }} />
                      ) : (
                        ''
                      )}
                      <span style={{ verticalAlign: 'super' }}> {row.Category} </span>
                    </div>
                    <br />
                    {/* {moment(row.Executedat, 'DD-MM-YYYY hh:mm:ss T').format('DD/MM/YYYY hh:mm a')} */}
                    {moment(row.Executedat, 'DD-MM-YYYY').format('DD/MM/YYYY')}
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
                    <div>{row.TokenAmount !== '--' ? '$' + row.TokenAmount : '--'}</div>
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

                  <StyledTableCell align='left'>{row.Description}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  )
}

export default TableCustomized
