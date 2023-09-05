import { CardHeader } from '@mui/material'
import React, { PureComponent } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const data = [
  {
    name: '20 Sep, 2022',
    outgoing: 590,
    incoming: 800,
    amount: 1400
  },
  {
    name: '30 Sep, 2022',
    outgoing: 868,
    incoming: 967,
    amount: 1506
  },
  {
    name: '03 Oct, 2022',
    outgoing: 1397,
    incoming: 1098,
    amount: 989
  },
  {
    name: '12 Oct, 2022',
    outgoing: 1480,
    incoming: 1200,
    amount: 1228
  },
  {
    name: '19 Oct, 2022',
    outgoing: 1520,
    incoming: 1108,
    amount: 1100
  },
  {
    name: '27 Oct, 2022',
    outgoing: 1400,
    incoming: 680,
    amount: 1700
  },
  {
    name: '05 Nov, 2022',
    outgoing: 1206,
    incoming: 680,
    amount: 1700
  },
  {
    name: '12 Nov, 2022',
    outgoing: 1103,
    incoming: 740,
    amount: 1700
  },
  {
    name: '19 Nov, 2022',
    outgoing: 980,
    incoming: 580,
    amount: 1700
  },
  {
    name: '26 Nov, 2022',
    outgoing: 880,
    incoming: 780,
    amount: 1700
  },
  {
    name: '30 Nov, 2022',
    outgoing: 900,
    incoming: 880,
    amount: 1700
  },
  {
    name: '10 Dec, 2022',
    outgoing: 1190,
    incoming: 980,
    amount: 1700
  },
  {
    name: '18 Dec, 2022',
    outgoing: 1200,
    incoming: 1020,
    amount: 1700
  },
  {
    name: '24 Dec, 2022',
    outgoing: 1280,
    incoming: 1190,
    amount: 1700
  },
  {
    name: '09 Jan, 2023',
    outgoing: 1400,
    incoming: 1380,
    amount: 1700
  },
  {
    name: '24 Jan, 2023',
    outgoing: 1500,
    incoming: 1420,
    amount: 1700
  },
  {
    name: '13 Feb, 2023',
    outgoing: 1687,
    incoming: 1380,
    amount: 1700
  },
  {
    name: '24 Feb, 2023',
    outgoing: 1791,
    incoming: 1570,
    amount: 1700
  },
  {
    name: '06 Mar, 2023',
    outgoing: 1710,
    incoming: 1690,
    amount: 1700
  },
  {
    name: '11 Mar, 2023',
    outgoing: 1680,
    incoming: 1680,
    amount: 1700
  }
]

export default class AsofdateChart extends PureComponent {
  render() {
    return (

      <div style={{
        width: '100%',
        backgroundColor: '#FFF'
      }}>

<CardHeader title={'Over the month Treasury Balance'} titleTypographyProps={{ variant: 'h6' }} />
      
      <div
        style={{
          width: '100%',
          height: 500,
          backgroundColor: '#FFF',
          color: 'rgba(58, 53, 65, 0.87)',
          webkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          borderRadius: '6px'
        }}
      >

        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke='#f5f5f5' />
            <XAxis dataKey='name' scale='band' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type='monotone' dataKey='amount' fill='#8884d8' stroke='#8884d8' />
            <Bar dataKey='incoming' barSize={20} fill='#413ea0' />
            <Line type='monotone' dataKey='outgoing' stroke='#ff7300' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      </div>
    )
  }
}
