import { CardHeader } from '@mui/material';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Salary',
    outgoing: 4000,
    incoming: 2400,
    amt: 2400,
  },
  {
    name: 'Grants',
    incoming: 3000,
    outgoing: 1398,
    amt: 2210,
  },
  {
    name: 'Bounty',
    outgoing: 2000,
    incoming: 9800,
    amt: 2290,
  },
  {
    name: 'Commission',
    incoming: 2780,
    outgoing: 3908,
    amt: 2000,
  },
  {
    name: 'Coordinape',
    incoming: 1890,
    outgoing: 4800,
    amt: 2181,
  },
  {
    name: 'Token Swaps',
    outgoing: 2390,
    incoming: 3800,
    amt: 2500,
  },
  {
    name: 'Token Release',
    outgoing: 3490,
    incoming: 4300,
    amt: 2100,
  },
];

export default class CategoryWiseProfitLoss extends PureComponent {

    static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';
  
    render() {
      return (
        <div
        style={{
          width: '100%',
          height: 470,
          backgroundColor: '#FFF',
          color: 'rgba(58, 53, 65, 0.87)',
          webkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          borderRadius: '6px'
        }}
      >
        <CardHeader title={'Category Incoming'} titleTypographyProps={{ variant: 'h6' }} />
        
          <BarChart
            width={700}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="incoming" fill="#8884d8" />
            {/* <Bar dataKey="outgoing" fill="#9e9e9e" /> */}
            {/* <Bar dataKey="amt" fill="#82ca34" /> */}
          </BarChart>
          </div>
      );
    }
  }
  