import React, { Component } from "react"

import axios from "axios"

import { FiSearch, FiX } from "react-icons/fi"
import "../assets/styles/_tickets.scss"

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: false,
      showList: false,
      listArr: []
    }
  }
  setShow = () => {
    this.setState({
      showSearch: true,
      showList: false
    })

    let shSearch = this.props.showSearch
    shSearch[this.props.index] = true

    this.props.handle({ showSearch: shSearch })
  }
  setSearch = (event) => {
    if (event.key === "Enter") {
      this.setState({ showSearch: false })

      let shSearch = this.props.showSearch,
        searchWord = this.props.searchWord

      shSearch[this.props.index] = false
      searchWord[this.props.index] = event.target.value
      this.props.handle1({ showSearch: shSearch, searchWord: searchWord })
    } else {
      if (event.target.value !== "") {
        let headers = {
          "content-type": "application/json",
          Authorization: "Bearer " + this.props.currentUser.token
        }
        axios
          .get(
            "http://eshkolserver.azurewebsites.net/api/Dynamic/getFilters/requests/" +
              this.props.param,
            { headers: headers }
          )
          .then((res) => {
            let listArr = []
            Object.keys(res.data.filters).forEach(function (key, index) {
              listArr.push(key)
            })
            this.setState({ showList: true, listArr: listArr })
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        this.setState({ showList: false })
      }
    }
  }
  setListSearch = (val) => {
    this.setState({ showSearch: false })

    let shSearch = this.props.showSearch,
      searchWord = this.props.searchWord

    shSearch[this.props.index] = false
    searchWord[this.props.index] = val
    this.props.handle1({ showSearch: shSearch, searchWord: searchWord })
  }
  removeSearch = () => {
    this.setState({
      showSearch: false,
      showList: false
    })
    let shSearch = this.props.showSearch,
      searchWord = this.props.searchWord

    shSearch[this.props.index] = false
    searchWord[this.props.index] = null
    this.props.handle({ showSearch: shSearch, searchWord: searchWord })
  }

  removeSearch1 = () => {
    this.setState({
      showSearch: false,
      showList: false
    })
    let shSearch = this.props.showSearch,
      searchWord = this.props.searchWord

    shSearch[this.props.index] = false
    searchWord[this.props.index] = null
    this.props.handle1({ showSearch: shSearch, searchWord: searchWord })
  }

  render() {
    return (
      <div>
        {this.props.searchWord[this.props.index] === null && (
          <div>
            {this.state.showSearch && (
              <div className="searchDiv">
                <div style={{ width: "80px", margin: "auto" }}>
                  {this.props.text}
                </div>
                <FiX color="#bbb" size={17} onClick={this.removeSearch} />
                <input type="text" onKeyUp={(e) => this.setSearch(e)} />
              </div>
            )}
            {this.state.showList && (
              <ul className="searchlist">
                {this.state.listArr.map((value, index) => (
                  <li key={index} onClick={() => this.setListSearch(value)}>
                    {value}
                  </li>
                ))}
              </ul>
            )}
            {!this.state.showSearch && (
              <div className="showCalendar" onClick={this.setShow}>
                <FiSearch color="#bbb" size={17} />
                {this.props.text}
              </div>
            )}
          </div>
        )}
        {this.props.searchWord[this.props.index] !== null && (
          <div className="showSearch">
            <FiX color="#bbb" size={17} onClick={this.removeSearch1} />
            {this.props.searchWord[this.props.index]}
          </div>
        )}
      </div>
    )
  }
}

export default Search
