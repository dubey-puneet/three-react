import React, { Component } from "react"
import Calendar from "react-calendar"

import "../assets/styles/_calendar.scss"

export class CalendarDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectDate: new Date()
    }
  }
  changeDate = (date) => {
    this.setState({ selectDate: date })
  }

  setSearch = () => {
    let selectSearch =
      ("0" + new Date(this.state.selectDate).getDate()).substr(-2) +
      "/" +
      ("0" + (new Date(this.state.selectDate).getMonth() + 1)).substr(-2) +
      "/" +
      new Date(this.state.selectDate).getFullYear()

    this.props.handle({
      selectDate: selectSearch,
      showCalendar: false
    })
  }

  render() {
    return (
      <div className="calendar">
        <Calendar
          value={this.selectDate}
          onChange={(e) => this.changeDate(e)}
        />
        <div className="searchbtn" onClick={this.setSearch}>
          <span>{this.props.param}</span>
        </div>
      </div>
    )
  }
}

export default CalendarDate
