import { CardHeader } from '@mui/material';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Consulting',
    outgoing: 10000,
    incoming: 9500,
    amt: 2400,
  },
  {
    name: 'BountyBoard',
    incoming: 6000,
    outgoing: 7398,
    amt: 2210,
  },
  {
    name: 'Academy',
    outgoing: 11490,
    incoming: 10000,
    amt: 2100,
  },
  {
    name: 'PodHatchery',
    outgoing: 7653,
    incoming: 9800,
    amt: 2290,
  },
  {
    name: 'Daoversity',
    incoming: 4400,
    outgoing: 3908,
    amt: 2000,
  },
  
  {
    name: 'Content Gateway',
    outgoing: 11490,
    incoming: 10000,
    amt: 2100,
  },
  {
    name: 'Loans',
    outgoing: 6700,
    incoming: 9800,
    amt: 2500,
  },
  {
    name: 'CryptoSapiens',
    outgoing: 11490,
    incoming: 10000,
    amt: 2100,
  },
  {
    name: 'Fight Club',
    incoming: 8900,
    outgoing: 4800,
    amt: 2181,
  },
  {
    name: 'First Quest',
    outgoing: 11490,
    incoming: 10000,
    amt: 2100,
  },
  // {
  //   name: 'Academy',
  //   outgoing: 11490,
  //   incoming: 10000,
  //   amt: 2100,
  // },
  {
    name: 'Infosec',
    outgoing: 11490,
    incoming: 10000,
    amt: 2100,
  },
];

export default class ProjectWiseProfitLoss extends PureComponent {

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
        <CardHeader title={'Project Incoming & Outgoing'} titleTypographyProps={{ variant: 'h6' }} />
          <BarChart
            width={1400}
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
            <Bar dataKey="incoming" fill="#ffc658"  background={{ fill: '#eee' }}/>
            <Bar dataKey="outgoing" fill="#8884d8"  background={{ fill: '#eee' }}/>
            {/* <Bar dataKey="amt" fill="#82ca34" /> */}
          </BarChart>
          </div>
      );
    }
  }
  