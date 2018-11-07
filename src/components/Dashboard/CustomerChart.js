import React, { Component } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: '00:00 AM', detectedCustomer: 400, customerSearch: 240 },
  { name: '01:00 AM', detectedCustomer: 300, customerSearch: 139 },
  { name: '02:00 AM', detectedCustomer: 200, customerSearch: 700 },
  { name: '03:00 AM', detectedCustomer: 278, customerSearch: 390 },
  { name: '04:00 AM', detectedCustomer: 189, customerSearch: 480 },
  { name: '05:00 AM', detectedCustomer: 239, customerSearch: 380 },
  { name: '06:00 AM', detectedCustomer: 349, customerSearch: 430 },
  { name: '07:00 AM', detectedCustomer: 400, customerSearch: 240 },
  { name: '08:00 AM', detectedCustomer: 300, customerSearch: 139 },
  { name: '09:00 AM', detectedCustomer: 200, customerSearch: 690 },
  { name: '10:00 AM', detectedCustomer: 278, customerSearch: 390 },
  { name: '11:00 AM', detectedCustomer: 189, customerSearch: 480 },
  { name: '12:00 AM', detectedCustomer: 239, customerSearch: 380 },
  { name: '01:00 PM', detectedCustomer: 300, customerSearch: 139 },
  { name: '02:00 PM', detectedCustomer: 200, customerSearch: 640 },
  { name: '03:00 PM', detectedCustomer: 278, customerSearch: 390 },
  { name: '04:00 PM', detectedCustomer: 189, customerSearch: 480 },
  { name: '05:00 PM', detectedCustomer: 239, customerSearch: 380 },
  { name: '06:00 PM', detectedCustomer: 349, customerSearch: 430 },
  { name: '07:00 PM', detectedCustomer: 400, customerSearch: 240 },
  { name: '08:00 PM', detectedCustomer: 300, customerSearch: 139 },
  { name: '09:00 PM', detectedCustomer: 200, customerSearch: 300 },
  { name: '10:00 PM', detectedCustomer: 278, customerSearch: 390 },
  { name: '11:00 PM', detectedCustomer: 189, customerSearch: 480 },
]

export default class CustomerChart extends Component {
  render() {
    return (
      <div style={{ padding: 50, width: '100%' }}>
        <ResponsiveContainer height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="customerSearch"
              name="Customer Search"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="detectedCustomer"
              name="Detected Customers"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
