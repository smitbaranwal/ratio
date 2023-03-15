// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: '#b892fe'
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

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Withdral', '0x9F902...D0983be4eFa', '0x9F902...D0983be4eFa', 6.0, 24, 4.0, 0, 0, 0),
  createData('Withdral', '0x9F902...D0983be4eFa', '0x9F902...D0983be4eFa',  9.0, 37, 4.3, 0, 0, 0),
  createData('Withdral', '0x9F902...D0983be4eFa', '0x9F902...D0983be4eFa',  16.0, 24, 6.0, 0, 0, 0),
  createData('Deposit', '0x9F902...D0983be4eFa', '0x9F902...D0983be4eFa', 3.7, 67, 4.3, 0, 0, 0),
  createData('Withdral', '0x9F902...D0983be4eFa', '0x9F902...D0983be4eFa',  16.0, 49, 3.9, 0, 0, 0)
]

const TableCustomized = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date (UTC)</StyledTableCell>
            <StyledTableCell align='right'>From</StyledTableCell>
            <StyledTableCell align='right'>To</StyledTableCell>
            <StyledTableCell align='right'>Amount</StyledTableCell>
            <StyledTableCell align='right'>Fee</StyledTableCell>
            <StyledTableCell align='right'>Gain/Loss</StyledTableCell>
            <StyledTableCell align='right'>Description</StyledTableCell>
            <StyledTableCell align='right'>NFT Collection</StyledTableCell>
            <StyledTableCell align='right'>Token</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.calories}</StyledTableCell>
              <StyledTableCell align='right'>{row.fat}</StyledTableCell>
              <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
              <StyledTableCell align='right'>{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCustomized
