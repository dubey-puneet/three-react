import React, { useEffect, useState } from "react"
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
import { setTableData } from "../utils/redux/table/table.action"

//--------------------------------------------------------------
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

//--------------------------------------------------------------
const Tickets = (props)=>  {
    const { t, currentUser, currentUser:{token, isAdmin}, storeData, currentLang} = props;
    const [showSearch, setShowSearch] =  useState([]);
    const [searchWord, setSearchWord] =  useState([]);
    const [showDateSearch, setShowDateSearch] =  useState([]);
    const [searchDateWord, setSearchDateWord] =  useState([]);
    const [showModal, setShowModal] =  useState(false);
    const [tabledata, setTabledata] =  useState([]);
    const [pagenum, setPagenum] =  useState(1);
    const [maxpage, setMaxpage] =  useState(100);
    const [startnum, setStartnum] =  useState(0);
    const [perpage, setPerpage] =  useState(20);
    const [ticketData, setTicketData] =  useState({});
    const [ticketRowNumber, setTicketRowNumber] =  useState('');


  const setStrSearch = (obj) => {
    //this.setState(obj)
  }

  const setStrSearch1 = (obj) => {
    //this.setState(obj, function () {
      //getData()
    //})
  }

  const handleModal = (ticket, ticketRowNumber, param) => {
    setShowModal(param);
    setTicketData(ticket);
    setTicketRowNumber(ticketRowNumber)
  }

  const setPageNum = (event) => {
    if (event.key === "Enter") {
      if (!isNaN(pagenum) && pagenum > 0 && pagenum !== "") {
        setStartnum( pagenum - 1)
      } else {
        setPagenum(1)
        setStartnum(0)
      }
    }
  }

  const getData = (firstTime = false) => {
    let start = startnum * perpage
    let tempTabledata = []

    let headers = {
      "content-type": "application/json",
      Authorization: "Bearer " + token
    }

    let data = filterBody(
      stringFieldArr,
      dateFieldArr,
      searchWord,
      searchDateWord
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
        // Update the tabledata in the store
        storeData(res.data)

        for (let i = start; i < start + perpage; i++) {
          if (response[i] !== undefined) {
            tempTabledata.push(response[i])
          }
        }

        let maxpage = Math.floor(tempTabledata.length / perpage) + 1
        setMaxpage(maxpage);
        //setTabledata(tempTabledata);
      })
      .catch((error) => {
        console.log('error----- ', error);
        //console.log(error.response.data)
      })
  }

  useEffect(()=>{
  let showSearch = [], searchWord = [], showDateSearch = [],searchDateWord = [];
    stringFieldArr.forEach(function (value, key) {
      showSearch.push(false)
      searchWord.push(null)
    })

    dateFieldArr.forEach(function (value, key) {
      showDateSearch.push(false)
      searchDateWord.push(null)
    })

    setShowSearch(showSearch);
    setSearchWord(searchWord);
    setShowDateSearch(showDateSearch);
    setSearchDateWord(searchDateWord);
    getData(true);

  },[])
  

  /*useEffect(()=>{
    //getData()
  },[startnum])*/

    return (
      <div>
        <Header />

        <div className="tickets">
          <table
            className={`table-responsive ${currentLang === "hebrew" ? "text-right" : "text-center"}`} >
            <thead>
              <tr>
                {stringFieldArr && stringFieldArr.length>0 && stringFieldArr.map((value, i) => (
                  <td
                    key={i}
                    className={`${showSearch[i] ? "active" : ""}`}
                  >
                    <SearchStr
                      currentUser={currentUser}
                      searchWord={searchWord}
                      showSearch={showSearch}
                      index={i}
                      handle={setStrSearch}
                      handle1={setStrSearch1}
                      text={t("tickets." + value)}
                      param={value}
                    />
                  </td>
                ))}
                {dateFieldArr && dateFieldArr.length>0 && dateFieldArr.map((value, i) => (
                  <td
                    key={i}
                    width="170"
                    className={`${showDateSearch[i] ? "active" : ""}`}>
                    {searchDateWord[i] === null && (
                      <div
                        className="showCalendar"
                        onClick={() => {
                          let showDateSearch = showDateSearch;
                          showDateSearch[i] = !showDateSearch[i];
                          setShowDateSearch(showDateSearch);
                        }}
                      >
                        <FiCalendar color="#bbb" size={17} />
                        {t("tickets." + value)}
                      </div>
                    )}

                    {searchDateWord[i] !== null && (
                      <div className="showSearch">
                        <FiX
                          color="#bbb"
                          size={17}
                          onClick={() => {
                            let searchDateWord = searchDateWord;
                              showDateSearch = showDateSearch;
                            searchDateWord[i] = null;
                            showDateSearch[i] = false;
                            setSearchDateWord(searchDateWord);
                            setShowDateSearch(showDateSearch);
                          }}
                        />
                        {searchDateWord[i]}
                      </div>
                    )}

                    {showDateSearch[i] && (
                      <CalendarDate
                        handle={setStrSearch1}
                        param="Search"
                        index={i}
                        searchDateWord={searchDateWord}
                        showDateSearch={showDateSearch}
                      />
                    )}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.tableData && props.tableData.length > 0 &&
                props.tableData.map((value, index) => (
                  <tr key={index} onClick={() => handleModal(value, index, true)}>
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
            showModal={showModal}
            data={ticketData}
            handle={handleModal}
            rowId={ticketRowNumber}
            token={token}
            isAdmin={isAdmin}
          />
          {tabledata && tabledata.length > 0 && (
            <div className="pagination">
              {pagenum > 1 && (
                <span>
                  <FiChevronsLeft
                    size={15}
                    onClick={() => setPagenum(1),setStartnum(0)}
                  />
                  <FiChevronLeft
                    size={15}
                    onClick={() =>setPagenum(1),setStartnum(0)}
                  />
                </span>
              )}

              <input
                type="text"
                className="pageNum form-control"
                value={pagenum}
                onChange={(e) => setPagenum(e.target.value)}
                onKeyDown={(e) => setPageNum(e)}
              />
              {pagenum < maxpage && (
                <span>
                  <FiChevronRight
                    size={15}
                    onClick={() =>
                      setPagenum(pagenum + 1),
                      setStartnum(pagenum)
                    }
                  />
                  <FiChevronsRight
                    size={15}
                    onClick={() =>
                      setPagenum(maxpage),
                      setStartnum(maxpage - 1)
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

const mapStateToProps = ({ user, table }) => ({
  currentUser: user.currentUser,
  currentLang: user.currentLang,
  tableData: table.tableData
})

const mapDispatchToProps = dispatch => ({
  storeData: (data) => dispatch(setTableData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Tickets))
