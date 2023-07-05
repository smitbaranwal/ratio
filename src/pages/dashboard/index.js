// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import AsofdateChart from 'src/views/dashboard/AsofdateChart'
import CategoryWiseProfitLoss from 'src/views/dashboard/CategoryWiseProfitLoss'
import ProjectWiseProfitLoss from 'src/views/dashboard/ProjectWiseProfitLoss'
import CategoryWiseLoss from 'src/views/dashboard/CategoryWiseLoss'
import { CardHeader } from '@mui/material'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>

      

        <Grid item xs={12} md={12} lg={12}>
          {/* <SalesByCountries /> */}
          {/* <CategoryWiseProfitLoss /> */}
{/* <CardHeader title={'Season Performance'} titleTypographyProps={{ variant: 'h6' }} /> */}

          <AsofdateChart />
        </Grid>

        <Grid item xs={6} md={6} lg={6}>
          <CategoryWiseProfitLoss />
        </Grid>

        <Grid item xs={6} md={6} lg={6}>
          <CategoryWiseLoss />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <ProjectWiseProfitLoss />
        </Grid>
       
        <Grid item xs={12}>
          <Table />
        </Grid>

        

        {/* <Grid item xs={12} md={12} lg={12}>
          <DepositWithdraw />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
