const originObj = {
  "Full name": "",
  "Id number": "",
  "partner name": "",
  "partner id": "",
  agent: "",
  "agent number": "",
  "insurance company": "",
  "program name": "",
  "start of insurance": "",
  "Suggestion premia": "",
  "Actual premia": "",
  "Number of polisa": "",
  "Pending notes": "",
  "Date of insurance": "",
  "Sent to insurance companies": "",
  "Date of status check": "",
  "First payment": "",
  "Payment after 3 months": "",
  "Payment after year": "",
  "Outer cancelation": "",
  Company: "",
  "Polisa num": "",
  "Polica type": "",
  "Sent date": "",
  "Active client in Kedem": "",
  "Twisting tag": "",
  "Free notes": "",
  "Product name to goals": "",
  "Phone meeting": "",
  "Fast start": "",
  Id: ""
}
export const filterBody = (
  stringField,
  dateField,
  searchWord,
  searchDateWord
) => {
  for (let i = 0; i < searchWord.length; i++) {
    let j = stringField[i]

    if (searchWord[i] !== null) {
      originObj[j] = searchWord[i]
    } else {
      delete originObj[j]
    }
  }
  for (let i = 0; i < searchDateWord.length; i++) {
    let j = dateField[i]

    if (searchDateWord[i] !== null) {
      originObj[j] = searchDateWord[i]
    } else {
      delete originObj[j]
    }
  }
  return originObj
}
