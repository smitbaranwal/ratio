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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: '#b892fe',
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



const TableCustomized = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions(setTransactions)
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell >Date (UTC)</StyledTableCell>
            <StyledTableCell >From</StyledTableCell>
            <StyledTableCell size='small' align='right'>To</StyledTableCell>
            <StyledTableCell align='right'>Amount</StyledTableCell>
            <StyledTableCell align='right'>Fee</StyledTableCell>
            <StyledTableCell align='right'>Gain/Loss</StyledTableCell>
            <StyledTableCell align='right'>Status</StyledTableCell>
            <StyledTableCell align='right'>Tag</StyledTableCell>
            <StyledTableCell align='right'>Token</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component='th' scope='row'>
                {row.Executedat}
                {row.Category}
                {row.Type}
              </StyledTableCell>
              <StyledTableCell size='small' align='right'>{row.FromAddress}</StyledTableCell>
              <StyledTableCell align='right'>{row.ToAddress}</StyledTableCell>
              <StyledTableCell align='right'>{row.TokenAmount}</StyledTableCell>
              <StyledTableCell align='right'>{row.Transactionfees}</StyledTableCell>
              <StyledTableCell align='right'>{row.USDAmount}</StyledTableCell>
              <StyledTableCell align='right'>{row.TransactionStatus}</StyledTableCell>
              <StyledTableCell align='right'>{row.Tag}</StyledTableCell>
              <StyledTableCell align='right'>{row.TokenSymbol}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCustomized
