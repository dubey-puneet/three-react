import React, { useState } from "react"
import axios from "axios"
import { FiSearch, FiX } from "react-icons/fi"
import "assets/styles/_tickets.scss"

const Search =(props)=> {
    const {index, handle, handle1, currentUser:{token}, param} = props;
    const [showSearch, setShowSearch] = useState(false);
    const [showList, setShowList] = useState(false);
    const [listArr, setListArr] = useState([]);

  const setShow = () => {
    setShowSearch(true);
    setShowList(false);
    let shSearch = props.showSearch
    shSearch[index] = true
    handle({ showSearch: shSearch })
  }
  const setSearch = (event) => {
    if (event.key === "Enter") {
      setShowSearch(false)

      let shSearch = props.showSearch,
        searchWord = props.searchWord

      shSearch[index] = false
      searchWord[index] = event.target.value
      handle1({ showSearch: shSearch, searchWord: searchWord })
    } else {
      if (event.target.value !== "") {
        let headers = {
          "content-type": "application/json",
          Authorization: "Bearer " + token
        }
        axios
          .get(
            "http://eshkolserver.azurewebsites.net/api/Dynamic/getFilters/requests/" + param,
            { headers: headers }
          )
          .then((res) => {
            let listArrTemp = []
            Object.keys(res.data.filters).forEach(function (key, index) {
              listArrTemp.push(key)
            })
            setShowList(true);
            setListArr(listArrTemp);
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
       setShowList(false);
      }
    }
  }

  const setListSearch = (val) => {
    setShowSearch(false);
    let shSearch = props.showSearch,
    searchWord = props.searchWord
    shSearch[index] = false
    searchWord[index] = val
    handle1({ showSearch: shSearch, searchWord: searchWord })
  }

  const removeSearch = () => {
    setShowSearch(false);
    setShowList(false);
    let shSearch = props.showSearch,
    searchWord = props.searchWord
    shSearch[index] = false
    searchWord[index] = null
    handle({ showSearch: shSearch, searchWord: searchWord })
  }

  const removeSearch1 = () => {
    setShowSearch(false);
    setShowList(false);
    let shSearch = props.showSearch,
    searchWord = props.searchWord
    shSearch[index] = false
    searchWord[index] = null
    handle1({ showSearch: shSearch, searchWord: searchWord })
  }

    return (
      <div>
        {props.searchWord[index] === null && (
          <div>
            {showSearch && (
              <div className="searchDiv">
                <div style={{ width: "80px", margin: "auto" }}>
                  {props.text}
                </div>
                <FiX color="#bbb" size={17} onClick={removeSearch} />
                <input type="text" onKeyUp={(e) => setSearch(e)} />
              </div>
            )}
            {showList && (
              <ul className="searchlist">
                {listArr.map((value, indexId) => 
                  <li key={indexId} onClick={() => setListSearch(value)}>{value}</li>
                )}
              </ul>
            )}
            {!showSearch && (
              <div className="showCalendar" onClick={setShow}>
                <FiSearch color="#bbb" size={17} />
                {props.text}
              </div>
            )}
          </div>
        )}
        {props.searchWord[index] !== null && (
          <div className="showSearch">
            <FiX color="#bbb" size={17} onClick={removeSearch1} />
            {props.searchWord[index]}
          </div>
        )}
      </div>
    )
}

export default Search
