import React from "react"

import "react-calendar/dist/Calendar.css"
import {
  FiCalendar,
  FiX,
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronsRight,
  FiChevronRight
} from "react-icons/fi"

import { connect } from "react-redux"
import "../assets/styles/_tickets.scss"

import { withTranslation } from "react-i18next"
import axios from "axios"

import SearchStr from "../components/Search"
import CalendarDate from "../components/CalendarDate1"
import TicketsModal from "../components/TicketsModal"

import Header from "../layout/Header"
import { filterBody } from "../data/filterBody"

const dateFieldArr = [
  "start of insurance",
  "Date of insurance",
  "Sent to insurance companies",
  "Date of status check",
  "Sent date"
]
const stringFieldArr = [
  "Full name",
  "Id number",
  "insurance company",
  "program name",
  "Suggestion premia",
  "Actual premia",
  "Pending notes",
  // "Id",
  // "Number of polisa",
  // "partner name",
  // "partner id",
  // "agent",
  // "agent number",
  // "First payment",
  // "Payment after 3 months",
  // "Payment after year",
  // "Outer cancelation",
  // "Company",
  // "Polisa num",
  // "Polica type",
  // "Active client in Kedem",
  // "Twisting tag",
  // "Free notes",
  // "Product name to goals",
  // "Phone meeting",
  // "Fast start"
]
class Tickets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: [],
      searchWord: [],
      showDateSearch: [],
      searchDateWord: [],
      rowIndex: 0,
      showModal: false,

      tabledata: [],
      pagenum: 1,
      maxpage: 100,
      startnum: 0,
      perpage: 20
    }
  }

  setStrSearch = (obj) => {
    this.setState(obj)
  }

  setStrSearch1 = (obj) => {
    this.setState(obj, function () {
      this.getData()
    })
  }

  handleModal = (index, param) => {
    this.setState({ showModal: param, rowIndex: index })
  }

  setPageNum = (event) => {
    let val = this.state.pagenum
    if (event.key === "Enter") {
      if (!isNaN(val) && val > 0 && val !== "") {
        this.setState({ startnum: this.state.pagenum - 1 })
      } else {
        this.setState({ pagenum: 1, startnum: 0 })
      }
    }
  }

  getData = (firstTime = false) => {
    let start = this.state.startnum * this.state.perpage
    let tabledata = []

    let headers = {
      "content-type": "application/json",
      Authorization: "Bearer " + this.props.currentUser.token
    }

    let vm = this
    let data = filterBody(
      stringFieldArr,
      dateFieldArr,
      this.state.searchWord,
      this.state.searchDateWord
    )
    if (firstTime) {
      data = {};
    }
    axios
      .post(
        "http://eshkolserver.azurewebsites.net/api/Dynamic/searchDocuments/requests",
        data,
        {
          headers: headers
        }
      )
      .then((res) => {
        let response = res.data;
        console.log(res.data)
        for (let i = start; i < start + vm.state.perpage; i++) {
          if (response[i] !== undefined) {
            tabledata.push(response[i])
          }
        }
        let maxpage = Math.floor(tabledata.length / vm.state.perpage) + 1
        vm.setState({ tabledata: tabledata, maxpage: maxpage })
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  componentDidMount() {
    let showSearch = [],
      searchWord = [],
      showDateSearch = [],
      searchDateWord = []

    stringFieldArr.forEach(function (value, key) {
      showSearch.push(false)
      searchWord.push(null)
    })
    dateFieldArr.forEach(function (value, key) {
      showDateSearch.push(false)
      searchDateWord.push(null)
    })
    this.setState({
      showSearch: showSearch,
      searchWord: searchWord,
      showDateSearch: showDateSearch,
      searchDateWord: searchDateWord
    })
    this.getData(true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.startnum !== prevState.startnum) {
      this.getData()
    }
  }

  render() {
    const { t, user } = this.props
    return (
      <div>
        <Header />

        <div className="tickets">
          <table
            className={`table-responsive ${this.props.currentLang === "hebrew" ? "text-right" : "text-center"
              }`}
          >
            <thead>
              <tr>
                {stringFieldArr.map((value, i) => (
                  <td
                    key={i}
                    className={`${this.state.showSearch[i] ? "active" : ""}`}
                  >
                    <SearchStr
                      currentUser={this.props.currentUser}
                      searchWord={this.state.searchWord}
                      showSearch={this.state.showSearch}
                      index={i}
                      handle={this.setStrSearch}
                      handle1={this.setStrSearch1}
                      text={t("tickets." + value)}
                      param={value}
                    />
                  </td>
                ))}
                {dateFieldArr.map((value, i) => (
                  <td
                    key={i}
                    width="170"
                    className={`${this.state.showDateSearch[i] ? "active" : ""
                      }`}
                  >
                    {this.state.searchDateWord[i] === null && (
                      <div
                        className="showCalendar"
                        onClick={() => {
                          let showDateSearch = this.state.showDateSearch
                          showDateSearch[i] = !showDateSearch[i]
                          this.setState({
                            showDateSearch: showDateSearch
                          })
                        }}
                      >
                        <FiCalendar color="#bbb" size={17} />
                        {t("tickets." + value)}
                      </div>
                    )}

                    {this.state.searchDateWord[i] !== null && (
                      <div className="showSearch">
                        <FiX
                          color="#bbb"
                          size={17}
                          onClick={() => {
                            let searchDateWord = this.state.searchDateWord,
                              showDateSearch = this.state.showDateSearch
                            searchDateWord[i] = null
                            showDateSearch[i] = false
                            this.setState({
                              searchDateWord: searchDateWord,
                              showDateSearch: showDateSearch
                            })
                          }}
                        />
                        {this.state.searchDateWord[i]}
                      </div>
                    )}

                    {this.state.showDateSearch[i] && (
                      <CalendarDate
                        handle={this.setStrSearch1}
                        param="Search"
                        index={i}
                        searchDateWord={this.state.searchDateWord}
                        showDateSearch={this.state.showDateSearch}
                      />
                    )}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.tabledata.length > 0 &&
                this.state.tabledata.map((value, index) => (
                  <tr key={index} onClick={(e) => this.handleModal(index, true)}>
                    {stringFieldArr.map((val, i) => (
                      <td key={i}>{value[val]}</td>
                    ))}
                    {dateFieldArr.map((val, i) => (
                      <td key={i}>{value[val]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <TicketsModal
            showModal={this.state.showModal}
            handle={this.handleModal}
            tabledata={this.state.tabledata}
            rowIndex={this.state.rowIndex}
            userDetails={user}
          />
          {this.state.tabledata.length > 0 && (
            <div className="pagination">
              {this.state.pagenum > 1 && (
                <span>
                  <FiChevronsLeft
                    size={15}
                    onClick={() => this.setState({ pagenum: 1, startnum: 0 })}
                  />
                  <FiChevronLeft
                    size={15}
                    onClick={() =>
                      this.setState({
                        pagenum: this.state.pagenum - 1,
                        startnum: this.state.pagenum - 2
                      })
                    }
                  />
                </span>
              )}

              <input
                type="text"
                className="pageNum form-control"
                value={this.state.pagenum}
                onChange={(e) => this.setState({ pagenum: e.target.value })}
                onKeyDown={(e) => this.setPageNum(e)}
              />
              {this.state.pagenum < this.state.maxpage && (
                <span>
                  <FiChevronRight
                    size={15}
                    onClick={() =>
                      this.setState({
                        pagenum: this.state.pagenum + 1,
                        startnum: this.state.pagenum
                      })
                    }
                  />
                  <FiChevronsRight
                    size={15}
                    onClick={() =>
                      this.setState({
                        pagenum: this.state.maxpage,
                        startnum: this.state.maxpage - 1
                      })
                    }
                  />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
  currentLang: user.currentLang
})

export default connect(mapStateToProps)(withTranslation()(Tickets))
