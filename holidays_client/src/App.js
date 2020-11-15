import React, { Component } from 'react'
import NewForm from './components/NewForm.js'

const baseURL = 'http://localhost:3003'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holidays: []
    }
  
    this.getHolidays = this.getHolidays.bind(this)
    this.handleAddHoliday = this.handleAddHoliday.bind(this)
  }

  componentDidMount() {
    this.getHolidays()
  }

  handleAddHoliday(holiday) {
    this.setState({
      holidays: this.state.holidays.concat(holiday)
    })
  }

  getHolidays() {
    fetch(baseURL + '/holidays')
    .then(data => {
      return data.json()
    }).then(parsedData => {
      this.setState({
        holidays: parsedData
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Holidays!</h1>
        <NewForm handleAddHoliday={this.handleAddHoliday} />
        <table>
          <tbody>
            {
              this.state.holidays.map(holiday => {
                return (
                  <tr>
                    <td key={holiday._id}> {holiday.name} </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

