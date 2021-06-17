import React from "react"

import "react-calendar/dist/Calendar.css"
import { FiCalendar, FiX } from "react-icons/fi"

import { connect } from "react-redux"
import "../assets/styles/_tickets.scss"

import SearchStr from "../components/Search"
import CalendarTime from "../components/CalendarTime"
import CalendarDate from "../components/CalendarDate"
import TicketsModal from "../components/TicketsModal"

class Tickets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectDateTime: "",
      showCalendarTime: false,

      selectDate: "",
      showCalendar: false,

      showStatusSearch: false,
      statusSearch: "",

      showIDnumSearch: false,
      idnumSearch: "",

      showFirstnameSearch: false,
      firstnameSearch: "",

      showLastnameSearch: false,
      lastnameSearch: "",

      showRejectsSearch: false,
      rejectsSearch: "",

      showPremiaSearch: false,
      premiaSearch: "",

      showModal: false
    }
  }

  componentDidMount() {
    console.log(this.props.currentUser)
  }

  setStrSearch = (obj) => {
    this.setState(obj)
  }

  handleModal = (param) => {
    this.setState({ showModal: param })
  }

  render() {
    return (
      <div className="tickets">
        <table className="table-responsive">
          <thead>
            <tr>
              <td
                width="170"
                className={`${this.state.showCalendarTime ? "active" : ""}`}
              >
                {this.state.selectDateTime === "" && (
                  <div
                    className="showCalendar"
                    onClick={() =>
                      this.setState({
                        showCalendarTime: !this.state.showCalendarTime
                      })
                    }
                  >
                    <FiCalendar color="#bbb" size={17} />
                    Acceptance Date
                  </div>
                )}

                {this.state.selectDateTime !== "" && (
                  <div className="showSearch">
                    <FiX
                      color="#bbb"
                      size={17}
                      onClick={() =>
                        this.setState({
                          selectDateTime: "",
                          showCalendarTime: false
                        })
                      }
                    />
                    {this.state.selectDateTime}
                  </div>
                )}

                {this.state.showCalendarTime && (
                  <CalendarTime handle={this.setStrSearch} param="Search" />
                )}
              </td>
              <td className={`${this.state.showStatusSearch ? "active" : ""}`}>
                <SearchStr
                  searchValue={this.state.statusSearch}
                  handle={this.setStrSearch}
                  param="Status"
                />
              </td>
              <td className={`${this.state.showIDnumSearch ? "active" : ""}`}>
                <SearchStr
                  searchValue={this.state.idnumSearch}
                  handle={this.setStrSearch}
                  param="ID Number"
                />
              </td>
              <td
                className={`${this.state.showFirstnameSearch ? "active" : ""}`}
              >
                <SearchStr
                  searchValue={this.state.firstnameSearch}
                  handle={this.setStrSearch}
                  param="First Name"
                />
              </td>
              <td
                className={`${this.state.showLastnameSearch ? "active" : ""}`}
              >
                <SearchStr
                  searchValue={this.state.lastnameSearch}
                  handle={this.setStrSearch}
                  param="Last Name"
                />
              </td>
              <td
                width="397"
                className={`${this.state.showRejectsSearch ? "active" : ""}`}
              >
                <SearchStr
                  searchValue={this.state.rejectsSearch}
                  handle={this.setStrSearch}
                  param="Rejects"
                />
              </td>
              <td className={`${this.state.showCanlendar ? "active" : ""}`}>
                <div className="showCalendar">
                  {this.state.selectDate === "" && (
                    <div
                      className="showCalendar"
                      onClick={() =>
                        this.setState({
                          showCalendar: !this.state.showCalendar
                        })
                      }
                    >
                      <FiCalendar color="#bbb" size={17} />
                      Register Date
                    </div>
                  )}
                  {this.state.selectDate !== "" && (
                    <div className="showSearch">
                      <FiX
                        color="#bbb"
                        size={17}
                        onClick={() =>
                          this.setState({
                            selectDate: "",
                            showCalendar: false
                          })
                        }
                      />
                      {this.state.selectDate}
                    </div>
                  )}
                  {this.state.showCalendar && (
                    <CalendarDate
                      handle={this.setStrSearch}
                      param="Search"
                      style={{ left: "-150px" }}
                    />
                  )}
                </div>
              </td>
              <td className={`${this.state.showPremiaSearch ? "active" : ""}`}>
                <SearchStr
                  searchValue={this.state.premiaSearch}
                  handle={this.setStrSearch}
                  param="Premia"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => this.handleModal(true)}>
              <td>dd/mm/yyyy hh:mm</td>
              <td>Registered</td>
              <td>123456789</td>
              <td>First</td>
              <td>Last</td>
              <td>
                Molestie eu tempus at scelerisque lacinia aliquet vel mollis.
                Tellus sollicitudin eget libero turpis adipiscing vitae.
              </td>
              <td>dd/mm/yyyy</td>
              <td>xxxxxx</td>
            </tr>
            <tr>
              <td>dd/mm/yyyy hh:mm</td>
              <td>Registered</td>
              <td>123456789</td>
              <td>First</td>
              <td>Last</td>
              <td>
                Molestie eu tempus at scelerisque lacinia aliquet vel mollis.
                Tellus sollicitudin eget libero turpis adipiscing vitae.
              </td>
              <td>dd/mm/yyyy</td>
              <td>xxxxxx</td>
            </tr>
            <tr>
              <td>dd/mm/yyyy hh:mm</td>
              <td>Registered</td>
              <td>123456789</td>
              <td>First</td>
              <td>Last</td>
              <td>
                Molestie eu tempus at scelerisque lacinia aliquet vel mollis.
                Tellus sollicitudin eget libero turpis adipiscing vitae.
              </td>
              <td>dd/mm/yyyy</td>
              <td>xxxxxx</td>
            </tr>
            <tr>
              <td>dd/mm/yyyy hh:mm</td>
              <td>Registered</td>
              <td>123456789</td>
              <td>First</td>
              <td>Last</td>
              <td>
                Molestie eu tempus at scelerisque lacinia aliquet vel mollis.
                Tellus sollicitudin eget libero turpis adipiscing vitae.
              </td>
              <td>dd/mm/yyyy</td>
              <td>xxxxxx</td>
            </tr>
            <tr>
              <td>dd/mm/yyyy hh:mm</td>
              <td>Registered</td>
              <td>123456789</td>
              <td>First</td>
              <td>Last</td>
              <td>
                Molestie eu tempus at scelerisque lacinia aliquet vel mollis.
                Tellus sollicitudin eget libero turpis adipiscing vitae.
              </td>
              <td>dd/mm/yyyy</td>
              <td>xxxxxx</td>
            </tr>
            <tr>
              <td>dd/mm/yyyy hh:mm</td>
              <td>Registered</td>
              <td>123456789</td>
              <td>First</td>
              <td>Last</td>
              <td>
                Molestie eu tempus at scelerisque lacinia aliquet vel mollis.
                Tellus sollicitudin eget libero turpis adipiscing vitae.
              </td>
              <td>dd/mm/yyyy</td>
              <td>xxxxxx</td>
            </tr>
            <tr>
              <td>dd/mm/yyyy hh:mm</td>
              <td>Registered</td>
              <td>123456789</td>
              <td>First</td>
              <td>Last</td>
              <td>
                Molestie eu tempus at scelerisque lacinia aliquet vel mollis.
                Tellus sollicitudin eget libero turpis adipiscing vitae.
              </td>
              <td>dd/mm/yyyy</td>
              <td>xxxxxx</td>
            </tr>
          </tbody>
        </table>
        <TicketsModal
          showModal={this.state.showModal}
          handle={this.handleModal}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Tickets)
