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

export default class CustomerChart extends Component {
  getComputedData = () => {
    const data = [
      { name: '00:00 AM', detectedCustomer: 0 },
      { name: '01:00 AM', detectedCustomer: 0 },
      { name: '02:00 AM', detectedCustomer: 0 },
      { name: '03:00 AM', detectedCustomer: 0 },
      { name: '04:00 AM', detectedCustomer: 0 },
      { name: '05:00 AM', detectedCustomer: 0 },
      { name: '06:00 AM', detectedCustomer: 0 },
      { name: '07:00 AM', detectedCustomer: 0 },
      { name: '08:00 AM', detectedCustomer: 0 },
      { name: '09:00 AM', detectedCustomer: 0 },
      { name: '10:00 AM', detectedCustomer: 0 },
      { name: '11:00 AM', detectedCustomer: 0 },
      { name: '12:00 AM', detectedCustomer: 0 },
      { name: '01:00 PM', detectedCustomer: 0 },
      { name: '02:00 PM', detectedCustomer: 0 },
      { name: '03:00 PM', detectedCustomer: 0 },
      { name: '04:00 PM', detectedCustomer: 0 },
      { name: '05:00 PM', detectedCustomer: 0 },
      { name: '06:00 PM', detectedCustomer: 0 },
      { name: '07:00 PM', detectedCustomer: 0 },
      { name: '08:00 PM', detectedCustomer: 0 },
      { name: '09:00 PM', detectedCustomer: 0 },
      { name: '10:00 PM', detectedCustomer: 0 },
      { name: '11:00 PM', detectedCustomer: 0 },
    ]

    if (!this.props.dataSource) {
      return data
    }

    this.props.dataSource.map((d, index) => {
      d.hours.map((hr, index) => {
        data[index].detectedCustomer = hr
        return null
      })
      return null
    })

    return data
  }

  render() {
    return (
      <div style={{ padding: '50px 0', width: '100%' }}>
        <ResponsiveContainer height={300}>
          <LineChart data={this.getComputedData()}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="detectedCustomer"
              name="Detected Customers"
              stroke="#582fff"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
