import { CardHeader, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableSpanning from 'src/views/tables/TableSpanning'

const Cashflow = () => {
    const imageStyle = {
        width: "100%",
        position:'absolute',
        top:'-145px'
       }

    return (
        // <Grid item xs={12}>
        // <Card>
          <TableCollapsible />
      //   </Card>
      // </Grid>
    )
}

export default Cashflow