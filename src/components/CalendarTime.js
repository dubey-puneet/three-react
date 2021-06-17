import React, { Component } from "react"
import Calendar from "react-calendar"
import Select from "react-select"

import { hourArray, minArray } from "../data/variables"
import "../assets/styles/_calendar.scss"

export class CalendarTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectDate: new Date(),
      selectHour: {
        value: ("0" + new Date().getHours()).substr(-2),
        label: ("0" + new Date().getHours()).substr(-2)
      },
      selectMin: {
        value: ("0" + new Date().getMinutes()).substr(-2),
        label: ("0" + new Date().getMinutes()).substr(-2)
      }
    }
  }
  changeDate = (date) => {
    this.setState({ selectDate: date })
  }
  changeHour = (selectHour) => {
    this.setState({ selectHour })
  }
  changeMin = (selectMin) => {
    this.setState({ selectMin })
  }
  setSearch = () => {
    let selectSearch =
      ("0" + new Date(this.state.selectDate).getDate()).substr(-2) +
      "/" +
      ("0" + (new Date(this.state.selectDate).getMonth() + 1)).substr(-2) +
      "/" +
      new Date(this.state.selectDate).getFullYear() +
      " " +
      this.state.selectHour.value +
      ":" +
      this.state.selectMin.value

    this.props.handle({
      selectDateTime: selectSearch,
      showCalendarTime: false
    })
  }

  render() {
    return (
      <div className="calendar">
        <Calendar
          value={this.selectDate}
          onChange={(e) => this.changeDate(e)}
        />
        <div className="time">
          <Select
            className="select"
            value={this.state.selectHour}
            onChange={this.changeHour}
            options={hourArray}
          />
          <Select
            className="select"
            value={this.state.selectMin}
            onChange={this.changeMin}
            options={minArray}
          />
          <span className="picklab">:Pick an hour</span>
        </div>
        <div className="searchbtn" onClick={this.setSearch}>
          <span>{this.props.param}</span>
        </div>
      </div>
    )
  }
}

export default CalendarTime
