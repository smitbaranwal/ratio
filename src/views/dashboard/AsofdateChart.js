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
    uv: 590,
    pv: 800,
    amt: 1400
  },
  {
    name: '30 Sep, 2022',
    uv: 868,
    pv: 967,
    amt: 1506
  },
  {
    name: '03 Oct, 2022',
    uv: 1397,
    pv: 1098,
    amt: 989
  },
  {
    name: '12 Oct, 2022',
    uv: 1480,
    pv: 1200,
    amt: 1228
  },
  {
    name: '19 Oct, 2022',
    uv: 1520,
    pv: 1108,
    amt: 1100
  },
  {
    name: '27 Oct, 2022',
    uv: 1400,
    pv: 680,
    amt: 1700
  },
  {
    name: '05 Nov, 2022',
    uv: 1206,
    pv: 680,
    amt: 1700
  },
  {
    name: '12 Nov, 2022',
    uv: 1103,
    pv: 740,
    amt: 1700
  },
  {
    name: '19 Nov, 2022',
    uv: 980,
    pv: 580,
    amt: 1700
  },
  {
    name: '26 Nov, 2022',
    uv: 880,
    pv: 780,
    amt: 1700
  },
  {
    name: '30 Nov, 2022',
    uv: 900,
    pv: 880,
    amt: 1700
  },
  {
    name: '10 Dec, 2022',
    uv: 1190,
    pv: 980,
    amt: 1700
  },
  {
    name: '18 Dec, 2022',
    uv: 1200,
    pv: 1020,
    amt: 1700
  },
  {
    name: '24 Dec, 2022',
    uv: 1280,
    pv: 1190,
    amt: 1700
  },
  {
    name: '09 Jan, 2023',
    uv: 1400,
    pv: 1380,
    amt: 1700
  },
  {
    name: '24 Jan, 2023',
    uv: 1500,
    pv: 1420,
    amt: 1700
  },
  {
    name: '13 Feb, 2023',
    uv: 1687,
    pv: 1380,
    amt: 1700
  },
  {
    name: '24 Feb, 2023',
    uv: 1791,
    pv: 1570,
    amt: 1700
  },
  {
    name: '06 Mar, 2023',
    uv: 1710,
    pv: 1690,
    amt: 1700
  },
  {
    name: '11 Mar, 2023',
    uv: 1680,
    pv: 1680,
    amt: 1700
  }
]

export default class AsofdateChart extends PureComponent {
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: 300,
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
            <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8' />
            <Bar dataKey='pv' barSize={20} fill='#413ea0' />
            <Line type='monotone' dataKey='uv' stroke='#ff7300' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
