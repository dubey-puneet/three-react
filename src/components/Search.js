import React, { Component } from "react"

import { FiSearch, FiX } from "react-icons/fi"
import "../assets/styles/_tickets.scss"

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: false,
      showList: false
    }
  }
  setShow = () => {
    this.setState({
      showSearch: true,
      showList: false
    })

    switch (this.props.param) {
      case "Status":
        this.props.handle({
          showStatusSearch: true
        })
        break
      case "ID Number":
        this.props.handle({
          showIDnumSearch: true
        })
        break
      case "First Name":
        this.props.handle({
          showFirstnameSearch: true
        })
        break
      case "Last Name":
        this.props.handle({
          showLastnameSearch: true
        })
        break
      case "Rejects":
        this.props.handle({
          showRejectsSearch: true
        })
        break
      case "Premia":
        this.props.handle({
          showPremiaSearch: true
        })
        break
      default:
        break
    }
  }
  setSearch = (event) => {
    if (event.key === "Enter") {
      this.setState({ showSearch: false })
      switch (this.props.param) {
        case "Status":
          this.props.handle({
            statusSearch: event.target.value,
            showStatusSearch: false
          })
          break
        case "ID Number":
          this.props.handle({
            idnumSearch: event.target.value,
            showIDnumSearch: false
          })
          break
        case "First Name":
          this.props.handle({
            firstnameSearch: event.target.value,
            showFirstnameSearch: false
          })
          break
        case "Last Name":
          this.props.handle({
            lastnameSearch: event.target.value,
            showLastnameSearch: false
          })
          break
        case "Rejects":
          this.props.handle({
            rejectsSearch: event.target.value,
            showRejectsSearch: false
          })
          break
        case "Premia":
          this.props.handle({
            premiaSearch: event.target.value,
            showPremiaSearch: false
          })
          break
        default:
          break
      }
    } else {
      if (event.target.value !== "") {
        this.setState({ showList: true })
      } else {
        this.setState({ showList: false })
      }
    }
  }
  removeSearch = () => {
    this.setState({
      showSearch: false,
      showList: false
    })
    switch (this.props.param) {
      case "Status":
        this.props.handle({ statusSearch: "", showStatusSearch: false })
        break
      case "ID Number":
        this.props.handle({ idnumSearch: "", showIDnumSearch: false })
        break
      case "First Name":
        this.props.handle({ firstnameSearch: "", showFirstnameSearch: false })
        break
      case "Last Name":
        this.props.handle({ lastnameSearch: "", showLastnameSearch: false })
        break
      case "Rejects":
        this.props.handle({
          rejectsSearch: "",
          showRejectsSearch: false
        })
        break
      case "Premia":
        this.props.handle({ premiaSearch: "", showPremiaSearch: false })
        break
      default:
        break
    }
  }
  render() {
    return (
      <div>
        {this.props.searchValue === "" && (
          <div>
            {this.state.showSearch && (
              <div className="searchDiv">
                <div style={{ width: "80px", margin: "auto" }}>
                  {this.props.param}
                </div>
                <FiX color="#bbb" size={17} onClick={this.removeSearch} />
                <input type="text" onKeyUp={(e) => this.setSearch(e)} />
              </div>
            )}
            {this.state.showList && (
              <ul className="searchlist">
                <li>Olive</li>
                <li>Olivander</li>
              </ul>
            )}
            {!this.state.showSearch && (
              <div className="showCalendar" onClick={this.setShow}>
                <FiSearch color="#bbb" size={17} />
                {this.props.param}
              </div>
            )}
          </div>
        )}
        {this.props.searchValue !== "" && (
          <div className="showSearch">
            <FiX color="#bbb" size={17} onClick={this.removeSearch} />
            {this.props.searchValue}
          </div>
        )}
      </div>
    )
  }
}

export default Search
