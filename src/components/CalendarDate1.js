import React, { Component } from "react"
import Calendar from "react-calendar"

import "../assets/styles/_calendar.scss"

export class CalendarDate1 extends Component {
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

    let searchDateWord = this.props.searchDateWord,
      showDateSearch = this.props.showDateSearch

    searchDateWord[this.props.index] = selectSearch
    showDateSearch[this.props.index] = false

    this.props.handle({
      searchDateWord: searchDateWord,
      showDateSearch: showDateSearch
    })
  }

  render() {
    return (
      <div className="calendar" style={{ right: 0, left: "auto" }}>
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

export default CalendarDate1
