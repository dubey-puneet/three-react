import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import {
  FiCalendar,
  FiX,
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronsRight,
  FiChevronRight
} from "react-icons/fi"
import { useTranslation } from 'react-i18next'

import "react-calendar/dist/Calendar.css"
import "assets/styles/_tickets.scss"

import Header from "layout/Header"
import SearchStr from "components/Search"
import CalendarDate from "components/CalendarDate1"
import TicketsModal from "components/TicketsModal"
import { filterBody } from "data/filterBody"
import { setTableData } from "utils/redux/table/table.action"
import _ from 'lodash'

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
]

//--------------------------------------------------------------
const Tickets = ()=>  {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentLang = useSelector((state) => state.user.currentLang);
  const tableData = useSelector((state) => state.table.tableData);

  const [showSearch, setShowSearch] =  useState(_.map(stringFieldArr, () => false));
  const [searchWord, setSearchWord] =  useState(_.map(stringFieldArr, () => null));
  const [showDateSearch, setShowDateSearch] =  useState(_.map(dateFieldArr, () => false));
  const [searchDateWord, setSearchDateWord] =  useState(_.map(dateFieldArr, () => null));
  const [showModal, setShowModal] =  useState(false);
  const [isNew, setIsNew] = useState(false);

  const [ticketRowNumber, setTicketRowNumber] =  useState('');
  const [ticketData, setTicketData] =  useState({});

  useEffect(()=> getData() ,[searchWord, searchDateWord])

  const setStrSearch = (obj) => {
    if(obj){
      if(obj.showSearch)
        setShowSearch(_.cloneDeep(obj.showSearch));
      if(obj.searchWord)
        setSearchWord(_.cloneDeep(obj.searchWord));
    }
  }

  const setStrSearch1 = (obj) => {
     if(obj){
      if(obj.showSearch)
        setShowSearch(_.cloneDeep(obj.showSearch));
      if(obj.searchWord)
        setSearchWord(_.cloneDeep(obj.searchWord));
      if(obj.searchDateWord){
        setSearchDateWord(_.cloneDeep(obj.searchDateWord));
        setShowDateSearch(_.cloneDeep(obj.showDateSearch))
      }
    }
  }

  const handleModal = (ticket, ticketRowNumber, param) => {
    setShowModal(param);
    setTicketData(ticket);
    setIsNew(false)
    setTicketRowNumber(ticketRowNumber)
  }

  const getData = () =>  {

    let headers = { "content-type": "application/json", Authorization: "Bearer " + currentUser.token }
    let data = filterBody(stringFieldArr, dateFieldArr, searchWord, searchDateWord);

    axios
      .post(
        "http://eshkolserver.azurewebsites.net/api/Dynamic/searchDocuments/requests",
        data,
        {
          headers: headers
        }
      )
      .then((res) => {
        dispatch(setTableData(res.data))
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

    return (
      <>
      <Header />
      <div className="tickets">
        {currentUser.isAdmin && <button className="add-new-button" onClick={() => {setShowModal(true); setIsNew(true)}}>Add New</button>}
        <table className={`table-responsive ${currentLang === "hebrew" ? "text-right" : "text-center"}`} >
          <thead>
            <tr>
              {stringFieldArr && stringFieldArr.length > 0 && stringFieldArr.map((value, i) => (
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
              {dateFieldArr && dateFieldArr.length > 0 && dateFieldArr.map((value, i) => (
                <td
                  key={i}
                  width="170"
                  className={`${showDateSearch[i] ? "active" : ""}`}>
                  {searchDateWord[i] === null && (
                    <div
                      className="showCalendar"
                      onClick={() => {
                        let showDateSearchTemp = showDateSearch;
                        showDateSearchTemp[i] = !showDateSearch[i];
                        setShowDateSearch(_.cloneDeep(showDateSearchTemp));
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
                          let searchDateWordTemp = searchDateWord;
                          let showDateSearchTemp = showDateSearch;
                          searchDateWordTemp[i] = null;
                          showDateSearchTemp[i] = false;
                          setSearchDateWord(_.cloneDeep(searchDateWordTemp));
                          setShowDateSearch(_.cloneDeep(showDateSearchTemp));
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
                      searchDateWord={_.cloneDeep(searchDateWord)}
                      showDateSearch={_.cloneDeep(showDateSearch)}
                    />
                  )}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.length > 0 &&
              tableData.map((value, index) => (
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
        {showModal && (
          <TicketsModal
            showModal={showModal}
            data={ticketData}
            handle={handleModal}
            rowId={ticketRowNumber}
            token={currentUser.token}
            isAdmin={currentUser.isAdmin}
            isNew={isNew}
          />
        )}
      </div>
      </>
    )
  }

  export default Tickets
